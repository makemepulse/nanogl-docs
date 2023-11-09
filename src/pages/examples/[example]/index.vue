<template>
  <NotFound v-if="!currentExample" />
  <div v-else class="w-full h-full">
    <div class="relative z-[1] w-full h-full p-24 pointer-events-none">
      <h1 class="text-16 bg-black-30 px-12 py-8 rounded-md inline-block">{{ currentExample.category }} — {{ currentExample.name }}</h1>
      <a :href="SOURCE_PATH + currentExample.id + '.js'" target="_blank" class="pointer-events-auto absolute bottom-24 right-24 flex items-center gap-10 bg-black-50 px-12 py-8 rounded-md opacity-50 hover:opacity-100 transition">
        <p class="text-16 font-bold">View code</p>
        <UIIcon
            name="github"
            class="scale-[0.2] -m-40"
          />
      </a>
    </div>
    <canvas class="absolute top-0 left-0 w-full h-[calc(100vh-4rem)] z-0" id="canvas"></canvas>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "@lib/store";
import { watch, ref, onMounted } from "vue";
import Example from "@examples/utils/example";

const SOURCE_PATH = "https://github.com/makemepulse/nanogl-docs/tree/main/src/examples/";

const { currentExample } = useStore();
const exampleModule = ref<Example>();

watch(currentExample, (newExample) => onExampleChange(newExample))

const onExampleChange = (newExample: Example) => {
  if (!newExample) return;
  exampleModule.value?.dispose();
  exampleModule.value = new newExample.module();
}

const render = () => {
  window.requestAnimationFrame(render);
  exampleModule.value?.update();
}

onMounted(() => {
  onExampleChange(currentExample.value);
  // render();
})
</script>