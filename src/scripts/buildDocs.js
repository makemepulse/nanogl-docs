import fs from 'fs';

const LIBS_URLS = [
    {
        name: 'nanogl',
        url: 'https://raw.githubusercontent.com/evanmartiin/nanogl/develop/docs/data.json',
        description: 'WebGL micro framework'
    },
    {
        name: 'nanogl-camera',
        url: 'https://raw.githubusercontent.com/evanmartiin/nanogl-camera/develop/docs/data.json',
        description: 'Cameras for nanogl'
    },
    {
        name: 'nanogl-node',
        url: 'https://raw.githubusercontent.com/evanmartiin/nanogl-node/develop/docs/data.json',
        description: 'Handle nested objects transform in 3D space'
    },
    {
        name: 'nanogl-primitives-2d',
        url: 'https://raw.githubusercontent.com/evanmartiin/nanogl-primitives-2d/master/docs/data.json',
        description: 'Basic 2D primitives for nanogl'
    },
    {
        name: 'nanogl-pbr',
        url: 'https://raw.githubusercontent.com/evanmartiin/nanogl-pbr/next/3.0/docs/data.json',
        description: 'Physically based rendering materials for nanogl'
    },
    {
        name: 'nanogl-pf',
        url: 'https://raw.githubusercontent.com/evanmartiin/nanogl-pf/develop/docs/data.json',
        description: 'Provide pixel format related capabilities'
    },
    {
        name: 'nanogl-post',
        url: 'https://raw.githubusercontent.com/evanmartiin/nanogl-post/develop/docs/data.json',
        description: 'Post-processing for nanogl'
    },
    {
        name: 'nanogl-state',
        url: 'https://raw.githubusercontent.com/evanmartiin/nanogl-state/develop/docs/data.json',
        description: 'Efficient webgl state management'
    },
    {
        name: 'nanogl-sync',
        url: 'https://raw.githubusercontent.com/evanmartiin/nanogl-sync/master/docs/data.json',
        description: 'WebGLSync for nanogl'
    },
    {
        name: 'nanogl-vao',
        url: 'https://raw.githubusercontent.com/evanmartiin/nanogl-vao/develop/docs/data.json',
        description: 'OES_vertex_array_object extension support for nanogl'
    },
]

const OUTPUT_PATH = './src/assets/data.json';

// List of all exported objects from all libs, used to retrieve the name of an object only referenced by its id
const exportedList = [];

// Fetch all 'data.json' files from libs
async function fetchLibs() {
    const libs = [];
    for (const { name, url, description } of LIBS_URLS) {
        await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
        })
        .then(response => response.json())
        .then(response => {
            libs.push({ ...response, description })
        });
    }
    setupExportedList(libs);
    parseLibsData(libs);
}

// Setup the exported list for each lib (to use for type & extends resolution)
function setupExportedList(libs) {
    libs.forEach(lib => {
        libChildrenAction(lib, (exported) => {
            exportedList.push({
                id: exported.id,
                name: exported.name,
                lib: lib.name,
                kind: exported.kindString,
                source: exported.sources[0].url,
                extends: exported.extendedTypes?.[0]
            })
        })
    })
}

// Parse all libs and create a new global file, ready to be used by the app
function parseLibsData(libs) {
    const data = {
        libs: []
    };

    libs.forEach(lib => {
        const libObj = {
            name: lib.name,
            description: lib.description,
            classes: [],
            functions: [],
        };

        const resolveExported = (exported) => {
            if (exported.kindString === 'Class') {
                const exportedObj = {
                    id: exported.id,
                    name: exported.name,
                    originalName: exported.originalName,
                    source: exported.sources[0].url,
                    comment: exported.comment?.summary?.[0]?.text,
                    constructors: [],
                    properties: [],
                    accessors: [],
                    methods: [],
                    extends: exported.extendedTypes ? resolveExtends(exported.extendedTypes[0], lib.name) : null,
                }

                // exported.children contains all objects coming from the class (constructor, properties, methods, ...)
                exported.children?.forEach(child => {
                    if (child.inheritedFrom) {
                        return;
                    }

                    const childObj = {
                        name: child.kindString === 'Constructor' ? exported.name : child.name,
                        source: child.sources ? child.sources[0].url : exportedObj.source, // Some classes don't have a constructor, so we use the class source instead of the constructor one
                    }

                    if (child.kindString === 'Constructor') {
                        resolveMethod(childObj, child.signatures[0], lib.name);
                        exportedObj.constructors.push(childObj);
                    } else if (child.kindString === 'Property') {
                        childObj.comment = child.comment?.summary[0]?.text;
                        childObj.defaultValue = resolveDefaultValue(child);
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
        }

        // If a lib contains only 1 file, it's categorized as a 'Project' and its direct children are the exported objects
        // If a lib contains more than 1 file, its direct children are the files containing the exported objects
        if (lib.kindString === 'Project') {
            // lib.children contains all .ts files present in the lib's /src folder
            lib.children.forEach(resolveExported);
        } else {
            lib.children.forEach(file => {
                // file.children contains all exported objects from the file
                file.children.forEach(resolveExported);
            })
        }

        data.libs.push(libObj);
    });

    createJson(data);
}

// Call a function for each lib children from 'data.json' file
function libChildrenAction(lib, action) {
    // If a lib contains only 1 file, it's categorized as a 'Project' and its direct children are the exported objects
    // If a lib contains more than 1 file, its direct children are the files containing the exported objects
    if (lib.kindString === 'Project') {
        // lib.children contains all .ts files present in the lib's /src folder
        lib.children.forEach(action);
    } else {
        lib.children.forEach(file => {
            // file.children contains all exported objects from the file
            file.children.forEach(action);
        })
    }
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

function resolveDefaultValue(elem) {
    if (elem.comment?.blockTags) {
        const defaultValueTag = elem.comment.blockTags.find(blockTag => blockTag.tag === '@defaultValue');

        if (defaultValueTag?.content[0]?.text) {
            return defaultValueTag.content[0].text;
        }
    }

    if (elem.defaultValue && elem.defaultValue !== '...') {
        return elem.defaultValue;
    }

    return undefined;
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

// Get exported data from a reference
function getExportedFromReference(reference, currentLib) {
    if (!reference.id && !reference.package) return;

    const lib = reference.package || currentLib;

    // Find the referenced object in the correct lib
    const exported = reference.id
    ? exportedList.find(exported => exported.id === reference.id && exported.lib === lib)
    : exportedList.find(exported => exported.name === reference.qualifiedName && exported.lib === lib);

    return exported;
}

// Resolve the type of something (property, method, param, ...)
function resolveTypes(type, currentLib) {
    if (type.type === 'union') {
        return type.types.map(type => resolveTypes(type, currentLib));
    } else if (type.type === 'intrinsic') {
        return { name: type.name };
    } else if (type.type === 'reference') {
        const exported = getExportedFromReference(type, currentLib);

        if (exported) {
            return {
                name: exported.name,
                lib: exported.lib,
                kind: exported.kind,
                source: exported.source,
            };
        }

        return { name: type.name };
    } else if (type.type === 'array') {
        return {
            ...resolveTypes(type.elementType, currentLib),
            isArray: true
        };
    } else if (type.type === 'literal') {
        return { name: `${type.value}` };
    }
}

// Resolve the full extends chain
function resolveExtends(extendsData, currentLib, extendsChain = []) {
    if (extendsData.type !== 'reference') return;

    const exported = getExportedFromReference(extendsData, currentLib);

    if (exported) {
        extendsChain.push({
            name: exported.name,
            lib: exported.lib,
            kind: exported.kind,
            source: exported.source,
        })

        if (exported.extends) {
            resolveExtends(exported.extends, exported.lib, extendsChain);
        }
    }


    return extendsChain
}

fetchLibs();