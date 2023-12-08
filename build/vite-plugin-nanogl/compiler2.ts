import compiler from "nanogl-template/lib/compiler";
import { transform } from '@chialab/cjs-to-esm';


export async function loadShaders(source: string) {
  const compiledGlsl = compiler(source)
  const result = await transform(compiledGlsl);
  
  if( !result ) {
    throw new Error("Failed to transform shader")
  }

  return result.code;
}