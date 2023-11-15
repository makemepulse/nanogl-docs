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
        <UIButton
          class="self-end"
          :href="SOURCE_PATH + currentExample.id + '.js'"
          text="View code"
          icon="code"
          icon-stroke
        />
        <div id="debug" class="pointer-events-auto"></div>
      </div>
    </div>
    <GLPreview :name="exampleName" folder="examples" class="absolute top-0 left-0 w-full z-0" />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

import { useStore } from "@lib/store";
import { useMarkdown } from '@lib/markdown';

const SOURCE_PATH = "https://github.com/makemepulse/nanogl-docs/tree/main/src/gl-preview/examples/";

const { currentExample } = useStore();
const { md } = useMarkdown();

const exampleName = computed(() => currentExample.value?.id);

const exampleDescription = computed(() => {
  const description = currentExample.value?.description;

  if (!description) return;

  return md.value.render(description)
});
</script>