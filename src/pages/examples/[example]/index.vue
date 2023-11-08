<template>
  <NotFound v-if="!currentExample" />
  <div v-else>
    <div class="relative z-[1] pointer-events-none">
      <h1>{{ currentExample.category }} - {{ currentExample.name }} (<a class="pointer-events-auto" :href="SOURCE_PATH + currentExample.src" target="_blank">Source</a>)</h1>
    </div>
    <iframe
      class="absolute top-0 left-0 w-full h-[calc(100vh-4rem)] z-0"
      allow="autoplay"
      :src="`../examples/${currentExample.src}`"
    ></iframe>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "@lib/store";

const { currentExample } = useStore();
const SOURCE_PATH = "https://github.com/makemepulse/nanogl-docs/tree/main/examples/";
</script>