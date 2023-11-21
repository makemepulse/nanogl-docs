import { fileURLToPath } from 'url'
import { defineConfig, loadEnv } from 'vite'

import Vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import Markdown from 'unplugin-vue-markdown/vite'
import SvgLoader from 'vite-svg-loader'
import Components from 'unplugin-vue-components/vite'

import MdToC from 'markdown-it-table-of-contents'
import MdPrism from 'markdown-it-prism'
import MdAttrs from 'markdown-it-attrs'
import MdAnchor from 'markdown-it-anchor'
import MdLinkAttrs from 'markdown-it-link-attributes'
import MdReplaceLink from 'markdown-it-replace-link'
// import ViteGlslPlugin from 'vite-plugin-glsl';

// import { ShaderPlugin } from "./build/vite-plugin-nanogl"

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    // optimizeDeps: ['*.glsl', 'node_modules/**/*'],
    base: env.VITE_APP_BASE_URL || '/',
    resolve: {
      alias: [
        { find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
        { find: '@lib', replacement: fileURLToPath(new URL('./src/lib', import.meta.url)) },
        { find: '@assets', replacement: fileURLToPath(new URL('./src/assets', import.meta.url)) },
        { find: '@examples', replacement: fileURLToPath(new URL('./src/examples', import.meta.url)) },
        { find: '@gl-preview', replacement: fileURLToPath(new URL('./src/gl-preview', import.meta.url)) },
        { find: '@components', replacement: fileURLToPath(new URL('./src/components', import.meta.url)) },
      ]
    },
    plugins: [
      Vue({
        include: [/\.vue$/, /\.md$/]
      }),
      Pages({
        extensions: ['vue', 'md'],
      }),
      Markdown({
        markdownItSetup(md) {
          md.use(MdReplaceLink, {
            replaceLink: (link) => {
              const baseURL = env.VITE_APP_BASE_URL;
              return link.startsWith('/') && !!baseURL
                ? `${baseURL}${link}`
                : link;
            }
          })
          md.use(MdLinkAttrs, {
            matcher: (link) => /^https?:\/\//.test(link),
            attrs: {
              target: '_blank',
              rel: 'noopener',
            },
          })
          md.use(MdPrism, { highlightInlineCode: true })
          md.use(MdAttrs)
          md.use(MdAnchor.default)
          md.use(MdToC, {
            containerClass: 'toc',
            includeLevel: [2, 3, 4],
            containerHeaderHtml: '<h2 class="my-8">Summary</h2>',
          })
        }
      }),
      Components({
        extensions: ['vue', 'md'],
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
        dts: false,
      }),
      SvgLoader(),
      // ViteGlslPlugin()
      // ShaderPlugin()
    ],
  }
})
