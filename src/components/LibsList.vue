<script setup>
import { ref } from 'vue';

defineProps({
  libs: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['selectLib']);
const selectedLib = ref("")

function selectLib(lib) {
  emit('selectLib', lib);
  selectedLib.value = lib.name;
}
</script>

<template>
  <div class="libsList">
    <h2>Libraries</h2>
    <p v-for="lib in libs" @click="selectLib(lib)" :class="{ selected: selectedLib === lib.name }">{{ lib.name }}</p>
  </div>
</template>

<style scoped lang="stylus">
.selected {
  font-weight: bold;
}
</style>