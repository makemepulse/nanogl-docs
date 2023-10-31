<template>
  <div class="fixed grid grid-cols-10 w-full h-screen pointer-events-none">
    <div class="menu col-span-2 px-20 py-32 flex flex-col gap-20 pointer-events-auto bg-black">
      <ArticlesMenu />
      <LibsMenu
        :libs="libs"
        :selected-lib="selectedLib.name" />
      <LibItemsMenu
        v-if="Object.keys(selectedLib).length"
        :lib="selectedLib" />
    </div>
  </div>
</template>

<script setup>
import LibsMenu from './LibsMenu.vue';
import ArticlesMenu from './ArticlesMenu.vue';
import LibItemsMenu from './LibItemsMenu.vue';

const props = defineProps({
  libs: {
    type: Object,
    required: true
  },
  selectedLib: {
    type: Object,
    required: true
  },
})
</script>