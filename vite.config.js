import { defineConfig, loadEnv } from 'vite'

import Vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import MdToC from 'markdown-it-table-of-contents'
import MdPrism from 'markdown-it-prism'
import MdAttrs from 'markdown-it-attrs'
import MdAnchor from 'markdown-it-anchor'
import Markdown from 'unplugin-vue-markdown/vite'
import Components from 'unplugin-vue-components/vite'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    base: env.VITE_APP_BASE_URL || '/',
    plugins: [
      Vue({
        include: [/\.vue$/, /\.md$/]
      }),
      Pages({
        extensions: ['vue', 'md'],
      }),
      Markdown({
        markdownItSetup(md) {
          md.use(MdPrism, { highlightInlineCode: true })
          md.use(MdAttrs)
          md.use(MdAnchor.default)
          md.use(MdToC)
        }
      }),
      Components({
        extensions: ['vue', 'md'],
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      })
    ],
  }
})
