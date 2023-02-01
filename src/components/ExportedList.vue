<script setup>
import { ref } from 'vue';

defineProps({
  lib: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['selectExported']);
const selectedExported = ref("");

function selectExported(exported) {
  emit('selectExported', exported);
  selectedExported.value = exported.name;
}
</script>

<template>
  <div class="exportedList">
    <div v-if="lib.classes.length">
      <h2>Classes</h2>
      <p v-for="libClass in lib.classes" @click="selectExported(libClass)" :class="{ selected: selectedExported === libClass.name }">{{ libClass.name }}</p>
    </div>
    <div v-if="lib.functions.length">
      <h2>Functions</h2>
      <p v-for="func in lib.functions" @click="selectExported(func)" :class="{ selected: selectedExported === func.name }">{{ func.name }}</p>
    </div>
  </div>
</template>

<style scoped lang="stylus">
.selected {
  font-weight: bold;
}
</style>