<template>
  <NotFound v-if="!currentExample" />
  <div v-else class="w-full h-full page-examples">
    <div class="relative z-[1] w-full h-full flex justify-between pointer-events-none overflow-hidden">
      <div class="self-start w-fit lg:max-w-[33%] p-12 flex flex-col bg-light-grey rounded-md pointer-events-auto">
        <h1 class="text-16">
          {{ currentExample.category }} — {{ currentExample.name }}
        </h1>
        <p
          v-if="exampleDescription"
          class="text-14 mt-4"
          v-html="exampleDescription" />
      </div>
      <div class="h-full flex flex-col-reverse justify-between">
        <a
          :href="SOURCE_PATH + currentExample.id + '.js'"
          target="_blank"
          class="custom-link self-end bg-light-grey rounded-md overflow-hidden pointer-events-auto"
        >
          <div class="hover:bg-white-5 flex items-center justify-center gap-10 px-12 py-8 transition-colors">
            <p class="text-16 font-bold">View code</p>
            <UIIcon
              name="github"
              class="h-20 w-auto"
            />
          </div>
        </a>
        <div id="debug" class="pointer-events-auto"></div>
      </div>
    </div>
    <GLPreview :name="exampleName" folder="examples" class="absolute top-0 left-0 w-full z-0" />
  </div>
</template>

<script setup lang="ts">
import { useStore } from "@lib/store";
import { computed } from "vue";

import * as MarkdownIt from 'markdown-it';
import MdLinkAttrs from 'markdown-it-link-attributes'
import MdReplaceLink from 'markdown-it-replace-link'

const SOURCE_PATH = "https://github.com/makemepulse/nanogl-docs/tree/main/src/gl-preview/examples/";

const { currentExample } = useStore();

const md = new MarkdownIt();
md.use(MdReplaceLink, {
  replaceLink: (link) => {
    const baseURL = import.meta.env.VITE_APP_BASE_URL;
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
});

const exampleName = computed(() => currentExample.value?.id);

const exampleDescription = computed(() => {
  const description = currentExample.value?.description;

  if (!description) return;

  return md.render(description)
});
</script>