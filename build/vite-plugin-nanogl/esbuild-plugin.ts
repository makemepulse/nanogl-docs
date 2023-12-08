import { OnLoadArgs, OnLoadResult, Plugin, PluginBuild } from "esbuild";
import fs from 'node:fs'
// import compiler from "nanogl-template/lib/compiler";
import { loadChunk } from "./compiler";

function glsl(): Plugin {

	const cache = new Map<string, string>();

	return {
		name: "nanogl-glsl",
		setup(build: PluginBuild) {

			async function onLoad(args: OnLoadArgs): Promise<OnLoadResult> {
				let source = await fs.promises.readFile(args.path, 'utf8')
				const compiledGlsl = loadChunk(source);
                // const compiledGlsl = compiler(source)

				return {
					contents: compiledGlsl
				};

			}

			build.onLoad({ filter: /\.(?:frag|vert|glsl)$/ }, onLoad);

		}
	};

}

export { glsl, glsl as default };
