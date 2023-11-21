import type { FilterPattern } from '@rollup/pluginutils';
import type { Plugin, ResolvedConfig } from 'vite';

import { createFilter } from '@rollup/pluginutils';
import { transformWithEsbuild } from 'vite';
import { loadShaders } from "./compiler";
import hmr from './hmr';



/**
 * @const
 * @default
 * @type {string}
 */
const DEFAULT_EXTENSION = 'glsl';


/**
 * @const
 * @default
 * @type {readonly RegExp[]}
 */
const DEFAULT_SHADERS = Object.freeze([
  '**/*.glsl', '**/*.wgsl',
  '**/*.vert', '**/*.frag',
  '**/*.vs', '**/*.fs'
]);

/**
 * @function
 * @name glsl
 *
 * @param {FilterPattern} exclude RegExp | RegExp[] of file paths/extentions to ignore
 * @param {FilterPattern} include RegExp | RegExp[] of file paths/extentions to import
 * @param {string} defaultExtension Shader import suffix when no extension is specified
 *
 * @default
 *   exclude = undefined
 *   include = /\.(glsl|wgsl|vert|frag|vs|fs)$/i
 *   defaultExtension = 'glsl'
 *
 * @returns {Plugin}
 */
export default function(
  exclude?: FilterPattern,
  include: FilterPattern = DEFAULT_SHADERS,
  defaultExtension = DEFAULT_EXTENSION
): Plugin {
  let config: ResolvedConfig;

  const filter = createFilter(include, exclude);
  const production = process.env.NODE_ENV === 'production';

  return {
    enforce: 'pre',
    name: 'vite-nanogl-template',

    configResolved(resolvedConfig) {
      config = resolvedConfig;
    },

    async transform(source, shader) {
      if (filter(shader)) {

        let input = loadShaders(source, shader, defaultExtension);
        input = hmr(input);

        return await transformWithEsbuild(
          input,
          shader,
          {
            sourcemap: "both",
            // sourcemap: config.build.sourcemap == true,
            minifyWhitespace: production,
            loader: 'js',
            format: 'esm'
          }
        );
      }
    }
  };
}