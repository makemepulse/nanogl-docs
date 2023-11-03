<template>
  <LibsMenu
    :libs="libs"
    :selected-lib="selectedLib.name" />
  <LibItemsMenu
    v-if="Object.keys(selectedLib).length"
    :lib="selectedLib" />
</template>

<script setup>
import LibsMenu from './LibsMenu.vue';
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