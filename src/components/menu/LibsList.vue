<script setup>
defineProps({
  libs: {
    type: Object,
    required: true
  },
  selectedLib: {
    type: String,
    required: false
  }
})

const emit = defineEmits(['selectLib']);

function selectLib(lib) {
  emit('selectLib', lib);
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