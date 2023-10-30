<script setup>
defineProps({
  lib: {
    type: Object,
    required: true
  },
  selectedExported: {
    type: String,
    required: false
  }
})

const emit = defineEmits(['selectExported']);

function selectExported(exported) {
  emit('selectExported', exported);
}
</script>

<template>
  <div class="exportedList">
    <div v-if="lib.classes.length">
      <h2>Classes</h2>
      <p v-for="libClass in lib.classes" @click="selectExported(libClass)" :class="{ selected: selectedExported === libClass.name }">{{ libClass.name }}</p>
    </div>
    <div v-if="lib.functions.length">
      <h3>Functions</h3>
      <p v-for="func in lib.functions" @click="selectExported(func)" :class="{ selected: selectedExported === func.name }">{{ func.name }}</p>
    </div>
  </div>
</template>

<style scoped lang="stylus">
.selected {
  font-weight: bold;
}
</style>