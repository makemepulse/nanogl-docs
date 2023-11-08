export enum ExampleCategory {
  GLTF = "GLTFs",
  MATERIAL = "Materials",
}

export type Example = {
  id: string;
  name: string;
  src: string;
}

export const examplesData: Record<ExampleCategory, Example[]> = {
  [ExampleCategory.GLTF]: [
    { id: "loading-suzanne", name: "Loading Suzanne", src: "gltfs/loading-suzanne.html" },
  ],
  [ExampleCategory.MATERIAL]: [
    { id: "clearcoat", name: "Clearcoat", src: "materials/clearcoat.html" },
    { id: "unlit", name: "Unlit", src: "materials/unlit.html" }
  ],
}