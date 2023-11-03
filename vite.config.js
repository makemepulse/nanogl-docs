import { defineConfig } from 'vite'

import Vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import Prism from 'markdown-it-prism'
import Markdown from 'unplugin-vue-markdown/vite'
import Components from 'unplugin-vue-components/vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: '',
  plugins: [
    Vue({
      include: [/\.vue$/, /\.md$/]
    }),
    Pages({
      extensions: ['vue', 'md'],
    }),
    Markdown({
      markdownItSetup(md) {
        md.use(Prism, { highlightInlineCode: true })
      }
    }),
    Components({
      extensions: ['vue', 'md'],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
    })
  ],
})
