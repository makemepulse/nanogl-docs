import { Example } from '@examples/utils/example';
import SimpleQuad from "@examples/simple-quad";
import Clearcoat from "@examples/clearcoat";
import Unlit from "@examples/unlit";
import OutlinedCircle from '@examples/outlined-circle';

export enum ExampleCategory {
  GEOMETRY = "Geometry",
  MATERIAL = "Materials",
}

export type ExampleEntry = {
  id: string;
  name: string;
  module: Example;
}

export const examplesData: Record<ExampleCategory, ExampleEntry[]> = {
  [ExampleCategory.GEOMETRY]: [
    { id: "simple-quad", name: "Simple quad", module: SimpleQuad },
    { id: "outlined-circle", name: "Outlined circle", module: OutlinedCircle },
  ],
  [ExampleCategory.MATERIAL]: [
    { id: "clearcoat", name: "Clearcoat", module: Clearcoat },
    { id: "unlit", name: "Unlit", module: Unlit },
  ],
}