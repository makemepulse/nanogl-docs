import fs from 'fs';

const LIBS_URLS = {
    'nanogl-node': 'https://raw.githubusercontent.com/evanmartiin/nanogl-node/develop/docs/data.json',
    'nanogl-primitives-2d': 'https://raw.githubusercontent.com/evanmartiin/nanogl-primitives-2d/master/docs/data.json',
}

const OUTPUT_PATH = './src/assets/data.json';

const exportedList = [];

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

        lib.children.forEach(file => {
            file.children.forEach(exported => {
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
                }

                exportedList.push({
                    id: exported.id,
                    name: exported.name
                })

                exported.children?.forEach(child => {
                    const childObj = {
                        name: child.name,
                        source: child.sources[0].url,
                    }

                    if (child.kindString === 'Constructor') {
                        exportedObj.constructors.push(childObj);
                    } else if (child.kindString === 'Property') {
                        childObj.comment = child.comment?.summary[0]?.text;
                        childObj.defaultValue = child.comment?.blockTags[0]?.content[0]?.text;
                        childObj.type = resolveTypes(child.type);
                        exportedObj.properties.push(childObj);
                    } else if (child.kindString === 'Accessor') {
                        exportedObj.accessors.push(childObj);
                    } else if (child.kindString === 'Method') {
                        childObj.comment = child.signatures[0]?.comment?.summary[0]?.text;
                        childObj.type = resolveTypes(child.signatures[0]?.type);
                        childObj.params = child.signatures[0]?.parameters?.map(param => {
                            return {
                                name: param.name,
                                type: resolveTypes(param.type),
                                comment: param.comment?.summary[0]?.text,
                                optional: param.flags?.isOptional,
                            }
                        })
                        exportedObj.methods.push(childObj);
                    }
                })

                if (exported.kindString === 'Class') {
                    libObj.classes.push(exportedObj);
                } else if (exported.kindString === 'Function') {
                    libObj.functions.push(exportedObj);
                }
            })
        })

        data.libs.push(libObj);
    });

    createJson(data);
}

function createJson(data) {
    fs.writeFile(OUTPUT_PATH, JSON.stringify(data, null, 2), 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }
     
        console.log("JSON file has been saved.");
    });
}

function resolveTypes(type) {
    if (type.type === 'union') {
        return type.types.map(type => resolveTypes(type)).join(' | ');
    } else if (type.type === 'intrinsic') {
        return type.name;
    } else if (type.type === 'reference') {
        if (type.id) {
            const exported = exportedList.find(exported => exported.id === type.id);
            if (exported) {
                return exported.name;
            }
        } else {
            return type.name;
        }
    } else if (type.type === 'array') {
        return `${resolveTypes(type.elementType)}[]`;
    } else if (type.type === 'literal') {
        return `${type.value}`;
    }
}

fetchLibs();