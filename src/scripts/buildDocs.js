import fs from 'fs';

const LIBS_URLS = {
    'nanogl-node': 'https://raw.githubusercontent.com/evanmartiin/nanogl-node/develop/docs/data.json',
    'nanogl-primitives-2d': 'https://raw.githubusercontent.com/evanmartiin/nanogl-primitives-2d/master/docs/data.json',
}

const OUTPUT_PATH = './src/assets/data.json';

// List of all exported objects from all libs, used to retrieve the name of an object only referenced by its id
const exportedList = [];

// Fetch all 'data.json' files from libs
async function fetchLibs() {
    const libs = [];
    for (const [lib, url] of Object.entries(LIBS_URLS)) {
        await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
        })
        .then(response => response.json())
        .then(response => {
            libs.push(response)
        });
    }
    sortLibs(libs);
}

// Parse all 'data.json' files and create a new global one, ready to be used by the app
function sortLibs(libs) {
    const data = {
        libs: []
    };

    libs.forEach(lib => {
        const libObj = {
            name: lib.name,
            classes: [],
            functions: []
        };

        // lib.children contains all .ts files present in the lib's /src folder
        lib.children.forEach(file => {
            // file.children contains all exported objects from the file
            file.children.forEach(exported => {
                exportedList.push({
                    id: exported.id,
                    name: exported.name,
                    lib: lib.name,
                })

                if (exported.kindString === 'Class') {
                    const exportedObj = {
                        id: exported.id,
                        name: exported.name,
                        originalName: exported.originalName,
                        source: exported.sources[0].url,
                        comment: exported.comment?.summary[0].text,
                        constructors: [],
                        properties: [],
                        accessors: [],
                        methods: [],
                        extends: exported.extendedTypes ? resolveTypes(exported.extendedTypes[0], lib.name) : null,
                    }
    
                    // exported.children contains all objects coming from the class (constructor, properties, methods, ...)
                    exported.children?.forEach(child => {
                        if (child.inheritedFrom) {
                            return;
                        }
    
                        const childObj = {
                            name: child.kindString === 'Constructor' ? exported.name : child.name,
                            source: child.sources[0].url,
                        }
    
                        if (child.kindString === 'Constructor') {
                            resolveMethod(childObj, child.signatures[0], lib.name);
                            exportedObj.constructors.push(childObj);
                        } else if (child.kindString === 'Property') {
                            childObj.comment = child.comment?.summary[0]?.text;
                            childObj.defaultValue = child.comment?.blockTags[0]?.content[0]?.text;
                            childObj.type = resolveTypes(child.type, lib.name);
                            exportedObj.properties.push(childObj);
                        } else if (child.kindString === 'Accessor') {
                            if (child.setSignature) {
                                childObj.setter = {
                                    name: `set ${child.name}`,
                                };
                                resolveMethod(childObj.setter, child.setSignature, lib.name);
                            }
                            if (child.getSignature) {
                                childObj.getter = {
                                    name: `get ${child.name}`,
                                };
                                resolveMethod(childObj.getter, child.getSignature, lib.name);
                            }
                            exportedObj.accessors.push(childObj);
                        } else if (child.kindString === 'Method') {
                            resolveMethod(childObj, child.signatures[0], lib.name);
                            exportedObj.methods.push(childObj);
                        }
                    })

                    libObj.classes.push(exportedObj);
                } else if (exported.kindString === 'Function') {
                    const functionObj = {};
                    resolveMethod(functionObj, exported.signatures[0], lib.name);

                    const exportedObj = {
                        id: exported.id,
                        name: exported.name,
                        source: exported.sources[0].url,
                        ...functionObj,
                    }
                    libObj.functions.push(exportedObj);
                }
            })
        })

        data.libs.push(libObj);
    });

    createJson(data);
}

// Create the global 'data.json' file
function createJson(data) {
    fs.writeFile(OUTPUT_PATH, JSON.stringify(data, null, 2), 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }
     
        console.log("JSON file has been saved.");
    });
}

// Resolve the type, comment and params of a method
function resolveMethod(obj, method, lib) {
    obj.comment = method.comment?.summary[0]?.text;
    obj.type = resolveTypes(method.type, lib);
    obj.params = method.parameters?.map(param => {
        return {
            name: param.name,
            type: resolveTypes(param.type, lib),
            comment: param.comment?.summary[0]?.text,
            optional: param.flags?.isOptional,
        }
    })
}

// Resolve the type of something (property, method, param, ...)
function resolveTypes(type, lib) {
    if (type.type === 'union') {
        return type.types.map(type => resolveTypes(type, lib)).join(' | ');
    } else if (type.type === 'intrinsic') {
        return type.name;
    } else if (type.type === 'reference') {
        if (type.id) {
            const exported = exportedList.find(exported => exported.id === type.id && exported.lib === lib); // Find the referenced object in the same lib
            if (exported) {
                return exported.name;
            }
        } else {
            return type.name;
        }
    } else if (type.type === 'array') {
        return `${resolveTypes(type.elementType, lib)}[]`;
    } else if (type.type === 'literal') {
        return `${type.value}`;
    }
}

fetchLibs();