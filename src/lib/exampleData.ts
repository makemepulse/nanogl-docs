export enum ExampleCategory {
  GEOMETRY = "Geometry",
  MATERIAL = "Materials",
  POST = "Post-processing",
  GLTF = "glTF",
  MISC = "Misc",
}

export type ExampleEntry = {
  id: string;
  name: string;
  description?: string;
}

export const examplesData: Record<ExampleCategory, ExampleEntry[]> = {
  [ExampleCategory.GEOMETRY]: [
    { id: "triangle", name: "Triangle" },
    { id: "rectangle", name: "Rectangle", description: "The color here represents UVs, directly included in the 4 [nanogl-primitives-2d](/api/nanogl-primitives-2d) geometries, with the *aTexCoord* vec2 attribute." },
    { id: "circle", name: "Circle" },
    { id: "rectangle-outline", name: "Rectangle outline" },
    { id: "circle-outline", name: "Circle outline", description: "The color here represents the distance from the inner edge of the geometry, directly included in [CircleOutline](/api/nanogl-primitives-2d/classes/CircleOutline) and [RectOutline](/api/nanogl-primitives-2d/classes/RectOutline), with the *aSide* float attribute." },
  ],
  [ExampleCategory.MATERIAL]: [
    { id: "unlit", name: "Unlit" },
    { id: "standard-specular", name: "Standard (Specular)" },
    { id: "standard-metalness", name: "Standard (Metalness)" },
  ],
  [ExampleCategory.POST]: [
    { id: "bloom", name: "Bloom" },
    { id: "dof", name: "Depth of field" },
    { id: "vignette", name: "Vignette" },
    { id: "grain", name: "Grain" },
  ],
  [ExampleCategory.GLTF]: [
    { id: "basic-gltf", name: "Basic model", description: "Model taken from [KhronosGroup's Github](https://github.com/KhronosGroup/glTF-Sample-Models/tree/master/2.0/Suzanne), made by Norbert Nopper." },
    { id: "animated-gltf", name: "Animated model", description: "Model taken from [KhronosGroup's Github](https://github.com/KhronosGroup/glTF-Sample-Models/tree/master/2.0/BoxAnimated), made by Cesium." },
    { id: "skinned-gltf", name: "Skinned model", description: "Model taken from [KhronosGroup's Github](https://github.com/KhronosGroup/glTF-Sample-Models/tree/master/2.0/BrainStem), made by Keith Hunter and owned by Smith Micro Software." },
    { id: "morphed-gltf", name: "Morphed model", description: "Model taken from [KhronosGroup's Github](https://github.com/KhronosGroup/glTF-Sample-Models/tree/master/2.0/AnimatedMorphCube)." },
  ],
  [ExampleCategory.MISC]: [
    { id: "full-screen-shader", name: "Full screen shader" },
    { id: "image-texture", name: "Image texture" },
    { id: "video-texture", name: "Video texture" },
    { id: "fbo-texture", name: "FBO to texture", description: "This example shows how to render to an FBO and use it as a texture." },
    { id: "node-nesting", name: "Node nesting", description: "This example shows how to nest nodes for more complex transforms." },
    { id: "gl-state", name: "GL State", description: "This example shows ways to use the gl state to handle the gl configs." },
    { id: "camera-types", name: "Cameras", description: "This example shows the difference between orthographic and perspective cameras." },
    // { id: "orbit-controls", name: "Orbit controls" },
  ],
}