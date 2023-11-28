import { OnLoadArgs, OnLoadResult, Plugin, PluginBuild } from "esbuild";
import fs from 'node:fs'
import compiler from "nanogl-template/lib/compiler";

function glsl(): Plugin {

	const cache = new Map<string, string>();

	return {
		name: "nanogl-glsl",
		setup(build: PluginBuild) {

			async function onLoad(args: OnLoadArgs): Promise<OnLoadResult> {
                console.log( "run glsl plugin for", args.path);
                let source = await fs.promises.readFile(args.path, 'utf8')
                const compiledGlsl = compiler(source)

				return {
					contents: compiledGlsl
				};

			}

			build.onLoad({ filter: /\.(?:frag|vert|glsl)$/ }, onLoad);

		}
	};

}

export { glsl, glsl as default };
