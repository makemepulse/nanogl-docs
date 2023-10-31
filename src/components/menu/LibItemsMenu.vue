<script setup>
import LibItem from './LibItem.vue';

const props = defineProps({
  lib: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="libItemsMenu">
    <div v-if="lib.classes.length">
      <h2>Classes</h2>
      <LibItem
        v-for="libClass in lib.classes"
        :libraryName="lib.name"
        :itemName="libClass.name"
        type="class"
      />
    </div>
    <div v-if="lib.functions.length">
      <h2>Functions</h2>
      <LibItem
        v-for="libFunc in lib.functions"
        :libraryName="lib.name"
        :itemName="libFunc.name"
        type="function"
      />
    </div>
  </div>
</template>