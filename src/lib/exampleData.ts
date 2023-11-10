import Triangle from "@examples/triangle";
import Rectangle from "@examples/rectangle";
import CircleExample from "@examples/circle";
import OutlinedCircle from "@examples/outlined-circle";
import OutlinedRectangle from "@examples/outlined-rectangle";

export enum ExampleCategory {
  GEOMETRY = "Geometry",
  MATERIAL = "Materials",
}

export type ExampleEntry = {
  id: string;
  name: string;
  module: any;
  description?: string;
}

export const examplesData: Record<ExampleCategory, ExampleEntry[]> = {
  [ExampleCategory.GEOMETRY]: [
    { id: "triangle", name: "Triangle", module: Triangle },
    { id: "rectangle", name: "Rectangle", module: Rectangle, description: "The color here represents UVs, directly included in the 4 [nanogl-primitives-2d](/api/nanogl-primitives-2d) geometries, with the \"aTexCoord\" vec2 attribute." },
    { id: "circle", name: "Circle", module: CircleExample },
    { id: "outlined-rectangle", name: "Outlined rectangle", module: OutlinedRectangle },
    { id: "outlined-circle", name: "Outlined circle", module: OutlinedCircle, description: "The color here represents the distance from the inner edge of the geometry, directly included in [CircleOutline](/api/nanogl-primitives-2d/classes/CircleOutline) and [RectOutline](/api/nanogl-primitives-2d/classes/RectOutline), with the \"aSide\" float attribute." },
  ],
  [ExampleCategory.MATERIAL]: [
    // { id: "clearcoat", name: "Clearcoat", module: Clearcoat },
    // { id: "unlit", name: "Unlit", module: Unlit },
  ],
}