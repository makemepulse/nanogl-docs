<template>
  <div>
    <h2 class="my-8">{{lib.name}}</h2>
    <div v-if="lib.classes.length">
      <h3 class="mt-8 mb-4">Classes</h3>
      <LibItem
        v-for="libClass in lib.classes"
        :libraryName="lib.name"
        :itemName="libClass.name"
        type="class"
      />
    </div>
    <div v-if="lib.functions.length">
      <h3 class="mt-8 mb-4">Functions</h3>
      <LibItem
        v-for="libFunc in lib.functions"
        :libraryName="lib.name"
        :itemName="libFunc.name"
        type="function"
      />
    </div>
  </div>
</template>

<script setup>
import LibItem from './LibItem.vue';

const props = defineProps({
  lib: {
    type: Object,
    required: true
  }
})
</script>