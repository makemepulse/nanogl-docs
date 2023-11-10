<template>
  <NotFound v-if="!currentExample" />
  <div v-else class="w-full h-full page-examples">
    <div class="relative z-[1] w-full h-full flex flex-col justify-between pointer-events-none">
      <div class="self-start w-fit max-w-[33%] p-12 flex flex-col bg-light-grey rounded-md pointer-events-auto">
        <h1 class="text-16">
          {{ currentExample.category }} — {{ currentExample.name }}
        </h1>
        <p
          v-if="exampleDescription"
          class="text-14 mt-4"
          v-html="exampleDescription" />
      </div>
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
    </div>
    <GLPreview :name="exampleName" folder="examples" class="absolute top-0 left-0 w-full z-0" />
  </div>
</template>

<script setup lang="ts">
import { useStore } from "@lib/store";
import { computed } from "vue";

const SOURCE_PATH = "https://github.com/makemepulse/nanogl-docs/tree/main/src/examples/";

const { currentExample } = useStore();

const exampleName = computed(() => currentExample.value?.id);

const root = import.meta.env.VITE_APP_BASE_URL || '';

const exampleDescription = computed(() => {
  const description = currentExample.value?.description;
  if (!description) return;

  // Parse markdown links to HTML <a> tags
  return description.replace(/\[([^\[]+)\](\(([^)]*))\)/gim, (match, text, _, link) => {
    const isInternalLink = !link.startsWith('http');
    const url = isInternalLink ? `${root}${link}` : link;
    return `<a href="${url}" target="_blank">${text}</a>`;
  });
});
</script>