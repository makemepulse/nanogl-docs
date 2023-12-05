import fs from 'fs';

import { getLibItemType } from '../lib/utils.ts';
import { SECTIONS, LIB_ITEM_FLAGS_TAGS } from '../lib/constants.ts';

const sortByName = (list) => {
    list.sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0);
}

const LIBS_URLS = [
    {
        name: 'nanogl',
        url: 'https://raw.githubusercontent.com/plepers/nanogl/develop/docs/data.json',
        description: 'WebGL micro framework'
    },
    {
        name: 'nanogl-camera',
        url: 'https://raw.githubusercontent.com/plepers/nanogl-camera/develop/docs/data.json',
        description: 'Cameras for nanogl'
    },
    {
        name: 'nanogl-gltf',
        url: 'https://raw.githubusercontent.com/plepers/nanogl-gltf/develop/docs/data.json',
        description: 'Handle .gltf files'
    },
    {
        name: 'nanogl-node',
        url: 'https://raw.githubusercontent.com/plepers/nanogl-node/develop/docs/data.json',
        description: 'Handle nested objects transform in 3D space'
    },
    {
        name: 'nanogl-primitives-2d',
        url: 'https://raw.githubusercontent.com/plepers/nanogl-primitives-2d/master/docs/data.json',
        description: 'Basic 2D primitives for nanogl'
    },
    {
        name: 'nanogl-pbr',
        url: 'https://raw.githubusercontent.com/plepers/nanogl-pbr/next/3.0/docs/data.json',
        description: 'Physically based rendering materials for nanogl'
    },
    {
        name: 'nanogl-pf',
        url: 'https://raw.githubusercontent.com/plepers/nanogl-pf/develop/docs/data.json',
        description: 'Provide pixel format related capabilities'
    },
    {
        name: 'nanogl-post',
        url: 'https://raw.githubusercontent.com/plepers/nanogl-post/develop/docs/data.json',
        description: 'Post-processing for nanogl'
    },
    {
        name: 'nanogl-state',
        url: 'https://raw.githubusercontent.com/plepers/nanogl-state/develop/docs/data.json',
        description: 'Efficient webgl state management'
    },
    {
        name: 'nanogl-sync',
        url: 'https://raw.githubusercontent.com/plepers/nanogl-sync/master/docs/data.json',
        description: 'WebGLSync for nanogl'
    },
    {
        name: 'nanogl-vao',
        url: 'https://raw.githubusercontent.com/plepers/nanogl-vao/develop/docs/data.json',
        description: 'OES_vertex_array_object extension support for nanogl'
    },
]

const OUTPUT_PATH = './src/assets/data.json';

// List of all exported objects and their direct children from all libs, used to retrieve the name of an object only referenced by its id
const exportedList = {};

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

// Add exported item to exportedList
function addToExportedList(exported, currentLib) {
    if (!exported) return;

    const item = {
        id: exported.id,
        lib: currentLib,
        name: exported.name,
        kind: exported.kindString,
        type: exported.type,
        source: exported.sources[0].url,
        extends: exported.extendedTypes?.[0],
    }

    exportedList[currentLib].push(item);

    if (!exported.children) return;

    exported.children.forEach(child => {
        if (!child) return;
        exportedList[currentLib].push({
            id: child.id,
            lib: currentLib,
            name: child.name,
            kind: child.kindString,
            type: exported.type,
            source: child.sources?.[0].url,
            extends: child.extendedTypes?.[0],
            parent: {
                kind: exported.kindString,
                name: exported.name
            }
        })
    });
}

// Setup the exported list for each lib (to use for type & extends resolution)
function setupExportedList(libs) {
    libs.forEach(lib => {
        exportedList[lib.name] = [];
        libChildrenAction(lib, (exported) => {
            addToExportedList(exported, lib.name);
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
            interfaces: [],
            enumerations: [],
            types: [],
        };

        const resolveExported = (exported) => {
            if (exported.kindString === 'Class') {
                const exportedObj = {
                    id: exported.id,
                    name: exported.name,
                    originalName: exported.originalName,
                    source: exported.sources[0].url,
                    comment: resolveComment(exported.comment?.summary, lib.name),
                    example: resolveExample(exported, lib.name),
                    tags: resolveTags(exported.flags),
                    constructors: [],
                    properties: [],
                    accessors: [],
                    methods: [],
                    extends: exported.extendedTypes ? resolveExtends(exported.extendedTypes[0], lib.name) : null,
                    implements: exported.implementedTypes ? resolveImplementation(exported.implementedTypes[0], lib.name) : null,
                }

                // exported.children contains all objects coming from the class (constructor, properties, methods, ...)
                resolveChildren(exported, exportedObj, lib);

                libObj.classes.push(exportedObj);
            } else if (exported.kindString === 'Function') {
                const functionObj = {};
                resolveFunction(functionObj, exported.signatures[0], exported.flags, lib.name);

                const exportedObj = {
                    id: exported.id,
                    name: exported.name,
                    source: exported.sources[0].url,
                    ...functionObj,
                }
                libObj.functions.push(exportedObj);
            } else if (exported.kindString === 'Interface') {
                const exportedObj = {
                    id: exported.id,
                    name: exported.name,
                    originalName: exported.originalName,
                    source: exported.sources[0].url,
                    comment: resolveComment(exported.comment?.summary, lib.name),
                    example: resolveExample(exported, lib.name),
                    tags: resolveTags(exported.flags),
                    properties: [],
                    accessors: [],
                    methods: [],
                    extends: exported.extendedTypes ? resolveExtends(exported.extendedTypes[0], lib.name) : null,
                    implemented: exported.implementedBy
                        ? exported.implementedBy.map(implementation => resolveImplementation(implementation, lib.name))
                        : null,
                }

                // exported.children contains all objects coming from the interface (properties, methods, ...)
                resolveChildren(exported, exportedObj, lib);

                libObj.interfaces.push(exportedObj);
            } else if (exported.kindString === 'Type alias' && exported.type.declaration?.children) {
                const item = exported.type.declaration;

                const exportedObj = {
                    useInterface: true,
                    id: exported.id,
                    name: exported.name,
                    originalName: exported.originalName,
                    source: exported.sources[0].url,
                    comment: resolveComment(exported.comment?.summary, lib.name),
                    example: resolveExample(exported, lib.name),
                    tags: resolveTags(exported.flags),
                    properties: [],
                    accessors: [],
                    methods: [],
                    extends: null,
                    implemented: null,
                }

                // exported.children contains all objects coming from the type (properties, methods, ...)
                resolveChildren(item, exportedObj, lib);

                libObj.types.push(exportedObj);
            } else if (exported.kindString === 'Type alias') {
                const shouldResolveTypeof = exported.comment?.modifierTags?.includes('@resolveTypeof');
                const commentData = exported.comment?.summary
                    || exported.type.declaration?.signatures?.[0]?.comment?.summary;
                const exportedObj = {
                    id: exported.id,
                    name: exported.name,
                    source: exported.sources[0].url,
                    tags: resolveTags(exported.flags),
                    type: resolveTypes(exported.type, lib.name, false, shouldResolveTypeof),
                    comment: resolveComment(commentData, lib.name),
                    example: resolveExample(exported, lib.name),
                    params: resolveTypeParams(exported.typeParameters, lib.name, shouldResolveTypeof)
                }
                libObj.types.push(exportedObj)
            } else if (exported.kindString === 'Enumeration') {
                const exportedObj = {
                    id: exported.id,
                    name: exported.name,
                    source: exported.sources[0].url,
                    tags: resolveTags(exported.flags),
                    comment: resolveComment(exported.comment?.summary, lib.name),
                    example: resolveExample(exported, lib.name),
                    members: []
                }

                exported.children.forEach(member => {
                    if (member.kindString === 'Enumeration Member') {
                        const memberObj = {
                            id: member.id,
                            name: member.name,
                            comment: resolveComment(member.comment?.summary, lib.name),
                            tags: resolveTags(member.flags),
                            type: resolveTypes(member.type, lib.name)
                        }
                        exportedObj.members.push(memberObj)
                    }
                })
                exportedObj.members.sort((a, b) => a.id - b.id)

                libObj.enumerations.push(exportedObj)
            }
        }

        // If a lib contains only 1 file, it's categorized as a 'Project' and its direct children are the exported objects
        // If a lib contains more than 1 file, its direct children are the files containing the exported objects
        if (lib.kindString === 'Project') {
            // lib.children contains all .ts files present in the lib's /src folder
            lib.children.forEach(resolveExported);
        } else {
            lib.children.forEach(file => {
                if (!file.children?.length) return;
                // file.children contains all exported objects from the file
                file.children.forEach(resolveExported);
            })
        }

        sortByName(libObj.classes);
        sortByName(libObj.functions);
        sortByName(libObj.types);
        sortByName(libObj.enumerations);
        sortByName(libObj.interfaces);

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
            if (!file.children?.length) return;
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

// Resolve the children of an item
function resolveChildren(item, itemObj, lib) {
    item.children?.forEach(child => {
        if (child.inheritedFrom) {
            return;
        }

        const childObj = {
            id: child.id,
            name: child.kindString === 'Constructor' ? item.name : child.name,
            source: child.sources ? child.sources[0].url : itemObj.source, // Some classes don't have a constructor, so we use the class source instead of the constructor one
        }

        if (child.kindString === 'Constructor' && itemObj.constructors) {
            resolveFunction(childObj, child.signatures[0], child.flags, lib.name);
            itemObj.constructors.push(childObj);
        } else if (
            child.kindString === 'Property' && child.type?.type === 'reflection'
            && child.type?.declaration?.signatures?.[0]?.kindString === 'Call signature'
        ) {
            resolveFunction(childObj, child.type?.declaration?.signatures?.[0], child.flags, lib.name);
            itemObj.methods.push(childObj);
        } else if (child.kindString === 'Property') {
            childObj.comment = resolveComment(child.comment?.summary, lib.name);
            childObj.defaultValue = resolveDefaultValue(child);
            childObj.type = resolveTypes(child.type, lib.name);
            childObj.tags = resolveTags(child.flags);
            itemObj.properties.push(childObj);
        } else if (child.kindString === 'Accessor') {
            if (child.setSignature) {
                childObj.setter = {
                    name: `set ${child.name}`,
                };
                resolveFunction(childObj.setter, child.setSignature, child.flags, lib.name);
            }
            if (child.getSignature) {
                childObj.getter = {
                    name: `get ${child.name}`,
                };
                resolveFunction(childObj.getter, child.getSignature, child.flags, lib.name);
            }
            itemObj.accessors.push(childObj);
        } else if (child.kindString === 'Method') {
            resolveFunction(childObj, child.signatures[0], child.flags, lib.name);
            itemObj.methods.push(childObj);
        }
    })
}

// Resolve the default value of an item
function resolveDefaultValue(item) {
    if (item.comment?.blockTags) {
        const defaultValueTag = item.comment.blockTags.find(blockTag => blockTag.tag === '@defaultValue');

        if (defaultValueTag?.content[0]?.text) {
            return defaultValueTag.content[0].text;
        }
    }

    if (item.defaultValue && item.defaultValue !== '...') {
        return item.defaultValue;
    }

    return undefined;
}

// Resolve the tags of an item
function resolveTags(flags) {
    if (!flags) return [];

    const tags = [];
    const flagKeys = Object.keys(flags);

    for (let i = 0; i < flagKeys.length; i++) {
        const tag = LIB_ITEM_FLAGS_TAGS[flagKeys[i]];
        if (tag) tags.push(tag);
    }

    return tags;
}

function resolveLink(text, target, currentLib) {
    const libExported = exportedList[currentLib] || [];

    const exportedTarget = libExported.find(
        exported => exported.id === target
    );

    if (exportedTarget) {
        const targetLib = exportedTarget.lib;
        const targetParent = exportedTarget.parent;
        const pathItem = targetParent || exportedTarget;

        const targetType = getLibItemType(pathItem.kind);
        const targetName = pathItem.name;
        const hash = targetParent ? `#item-${target}` : '';

        if (targetLib && targetType && targetName) {
            return `[${text}](/${SECTIONS.API}/${targetLib}/${targetType}/${targetName}${hash})`;
        }
    }

    return text || '';
}

// Resolve the comment of an item to markdown
function resolveComment(comment, currentLib) {
    if (!comment) return;

    const commentData = comment.map(content => {
        if (content.kind === 'inline-tag' && content.tag === '@link') {
            return resolveLink(content.text, content.target, currentLib)
        }

        return content.text || ''
    })

    return commentData.join('');
}

// Resolve the example of an item to markdown
function resolveExample(item, currentLib) {
    if (!item.comment?.blockTags) return;

    const exampleTag = item.comment.blockTags.find(blockTag => blockTag.tag === '@example');

    return resolveComment(exampleTag?.content, currentLib);
}

// Resolve the type, comment and params of a function
function resolveFunction(obj, func, flags = [], currentLib, isType = false) {
    if (!isType) {
        obj.comment = resolveComment(func.comment?.summary, currentLib);
        obj.example = resolveExample(func, currentLib);
        obj.tags = resolveTags(func.flags ? { ...flags, ...func.flags } : flags);
    }

    obj.type = resolveTypes(func.type, currentLib);
    obj.params = func.parameters?.map(param => {
        return {
            id: param.id,
            name: param.name,
            type: resolveTypes(param.type, currentLib),
            tags: resolveTags(param.flags),
            comment: resolveComment(param.comment?.summary, currentLib),
            optional: param.flags?.isOptional,
            defaultValue: resolveDefaultValue(param),
        }
    })
    if (!isType) {
        obj.typeParams = resolveTypeParams(func.typeParameter, currentLib)
    }
}

// Get exported data from a reference
function getExportedFromReference(reference, currentLib) {
    if (!reference.id && !reference.package) return;

    const lib = reference.package || currentLib;
    const libExported = exportedList[lib] || [];

    // Find the referenced object in the correct lib
    const exported = reference.id
        ? libExported.find(exported => exported.id === reference.id)
        : libExported.find(exported => exported.name === reference.qualifiedName);

    return exported;
}

// Resolve the type parameters of something (function, type, ...)
function resolveTypeParams(typeParams, currentLib, shouldResolveTypeof = false) {
    if (!typeParams) return [];

    return typeParams?.map(typeParam => ({
        id: typeParam.id,
        name: typeParam.name,
        type: resolveTypes(typeParam.type, currentLib, true, shouldResolveTypeof),
        tags: resolveTags(typeParam.flags),
        comment: resolveComment(typeParam.comment?.summary, currentLib),
        default: resolveTypes(typeParam.default, currentLib, false, shouldResolveTypeof),
    }))
}

// Resolve the type of something (property, method, param, ...)
function resolveTypes(type, currentLib, isArgument = false, shouldResolveTypeof = false) {
    if (!type) return;
    if (type.type === 'union' || type.type === 'tuple' || type.type === 'intersection') {
        const typeList = type.types || type.elements;
        return {
            listType: type.type,
            list: typeList?.map(type => resolveTypes(type, currentLib, isArgument, shouldResolveTypeof))
        };
    }
    if (type.type === 'intrinsic') {
        return { name: type.name };
    }
    if (type.type === 'literal') {
        const literalType = type.value === null ? 'null' : typeof type.value;
        return {
            name: literalType === 'string' ? `'${type.value}'` : `${type.value}`,
            data: {
                literalType: literalType,
            }
        };
    }

    if (type.type === 'inferred') {
        return {
            name: type.name,
            isInferred: true
        };
    }
    if (type.type === 'array') {
        return {
            ...resolveTypes(type.elementType, currentLib, isArgument, shouldResolveTypeof),
            isArray: true
        };
    }
    if (type.type === 'query') {
        if (shouldResolveTypeof) {
            const libList = exportedList[currentLib] || [];
            const exported = libList.find(exported => exported.id === type.queryType.id);

            if (exported && exported.type) {
                return resolveTypes(exported.type, currentLib, isArgument, shouldResolveTypeof)
            }

        }

        return {
            ...resolveTypes(type.queryType, currentLib, isArgument, shouldResolveTypeof),
            isQuery: true
        };
    }
    if (type.type === 'indexedAccess') {
        const objectType = resolveTypes(type.objectType, currentLib, isArgument, shouldResolveTypeof)
        return {
            ...objectType,
            isIndexed: true,
            data: {
                ...(objectType.data || {}),
                indexType: resolveTypes(type.indexType, currentLib, isArgument, shouldResolveTypeof),
            }
        };
    }

    if (type.type === 'typeOperator') {
        const currentType = resolveTypes(type.target, currentLib, isArgument, shouldResolveTypeof);
        return {
            ...currentType,
            data: {
                ...(currentType.data || {}),
                operator: type.operator,
            }
        };
    }
    if (type.type === 'predicate') {
        return {
            name: type.name,
            data: {
                useAsserts: type.asserts,
                targetType: resolveTypes(type.targetType, currentLib, isArgument, shouldResolveTypeof),
            }
        }
    }
    if (type.type === 'conditional') {
        const checkType = resolveTypes(type.checkType, currentLib, isArgument, shouldResolveTypeof);
        return {
            ...checkType,
            data: {
                ...(checkType.data || {}),
                extendsType: resolveTypes(type.extendsType, currentLib, isArgument, shouldResolveTypeof),
                conditionalTypes: [type.trueType, type.falseType]
                    .map(condType => resolveTypes(condType, currentLib, isArgument, shouldResolveTypeof)),
            }
        }
    }
    if (type.type === 'reference') {
        const data = isArgument || !type.typeArguments?.length
            ? {}
            : { data: {
                arguments: type.typeArguments?.map(arg => resolveTypes(arg, currentLib, true, shouldResolveTypeof))
            }}
        const exported = getExportedFromReference(type, currentLib);

        if (exported) {
            return {
                name: exported.name,
                lib: exported.lib,
                kind: exported.kind,
                source: exported.source,
                parent: exported.parent,
                ...data,
            };
        }

        return {
            name: type.name,
            ...data,
        };
    }
    if (type.type === 'reflection' && type.declaration?.signatures) {
        const signature = type.declaration?.signatures?.[0];

        if (!signature || signature.kindString !== 'Call signature') return;

        const funcData = {};
        resolveFunction(funcData, signature, [], currentLib, true);

        return {
            name: 'function',
            data: {
                function: funcData,
            }
        }
    }
    if (type.type === 'reflection' && type.declaration?.children) {
        const props = [];
        type.declaration?.children?.forEach(child => {
            if (child.kindString === 'Property') {
                props.push({
                    name: child.name,
                    type: resolveTypes(child.type, currentLib, isArgument, shouldResolveTypeof),
                })
            }
        })

        return {
            name: 'object',
            data: {
                properties: props,
            }
        }
    }

    console.log(currentLib, ': Unknown type', type.type);
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

// Resolve the implementation type (implements or implemented by)
function resolveImplementation(implementationData, currentLib) {
    if (implementationData.type !== 'reference') return;

    const exported = getExportedFromReference(implementationData, currentLib);

    if (exported) {
        return {
            name: exported.name,
            lib: exported.lib,
            kind: exported.kind,
            source: exported.source,
        }
    }

    return null;
}

fetchLibs();