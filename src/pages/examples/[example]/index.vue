<template>
  <NotFound v-if="!currentExample" />
  <div v-else class="w-full h-full">
    <div class="relative z-[1] w-full h-full p-24 pointer-events-none overflow-hidden">
      <h1 class="text-16 bg-black-30 px-12 py-8 rounded-md inline-block">{{ currentExample.category }} — {{ currentExample.name }}</h1>
      <p class="text-14 px-12 py-8 w-1/3 pointer-events-auto" v-if="exampleDescription" v-html="exampleDescription"></p>
      <a :href="SOURCE_PATH + currentExample.id + '.js'" target="_blank" class="pointer-events-auto absolute bottom-24 right-24 flex items-center gap-10 bg-black-50 px-12 py-8 rounded-md opacity-50 hover:opacity-100 transition">
        <p class="text-16 font-bold">View code</p>
        <UIIcon
            name="github"
            class="scale-[0.2] -m-40"
          />
      </a>
      <div id="debug" class="pointer-events-auto absolute top-24 right-24"></div>
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

<style>
p a {
  @apply font-bold text-primary;
}
</style>