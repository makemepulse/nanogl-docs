import { ref } from 'vue';

import MarkdownIt from 'markdown-it';
import MdPrism from 'markdown-it-prism'
import MdLinkAttrs from 'markdown-it-link-attributes'
import MdReplaceLink from 'markdown-it-replace-link'

import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-c";
import "prismjs/components/prism-glsl";

const md = ref<MarkdownIt | null>(null);

export function useMarkdown() {
  const init = () => {
    if (md.value) return;

    md.value = new MarkdownIt();
    md.value.use(MdReplaceLink, {
      replaceLink: (link) => {
        const baseURL = import.meta.env.VITE_APP_BASE_URL;
        return link.startsWith('/') && !!baseURL
          ? `${baseURL}${link}`
          : link;
      }
    })
    md.value.use(MdLinkAttrs, {
      matcher: (link) => /^https?:\/\//.test(link),
      attrs: {
        target: '_blank',
        rel: 'noopener',
      },
    });
    md.value.use(MdPrism, { highlightInlineCode: true, defaultLanguage: 'js' })
  }

  return {
    init,
    md,
  }
}