import Triangle from "@examples/triangle";
import Quad from "@examples/quad";
import CircleExample from "@examples/circle";
import OutlinedCircle from "@examples/outlined-circle";
import OutlinedQuad from "@examples/outlined-quad";

export enum ExampleCategory {
  GEOMETRY = "Geometry",
  MATERIAL = "Materials",
}

export type ExampleEntry = {
  id: string;
  name: string;
  module: Example;
}

type Example = {
  load(): Promise<void>;
  render(): void;
  dispose(): void;
}

export const examplesData: Record<ExampleCategory, ExampleEntry[]> = {
  [ExampleCategory.GEOMETRY]: [
    { id: "triangle", name: "Triangle", module: Triangle },
    { id: "quad", name: "Quad with UVs", module: Quad },
    { id: "circle", name: "Circle", module: CircleExample },
    { id: "outlined-quad", name: "Outlined quad", module: OutlinedQuad },
    { id: "outlined-circle", name: "Outlined circle", module: OutlinedCircle },
    // { id: "outlined-circle", name: "Outlined circle", module: OutlinedCircle },
  ],
  [ExampleCategory.MATERIAL]: [
    // { id: "clearcoat", name: "Clearcoat", module: Clearcoat },
    // { id: "unlit", name: "Unlit", module: Unlit },
  ],
}