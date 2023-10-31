<template>
  <div :id="`function-${libFunction.name}`" class="functionContainer">
    <h1>
      {{ libFunction.name }}<span v-if="libFunction.source.length"> - <a :href="libFunction.source" target="_blank">source</a></span>
    </h1>
  </div>
</template>

<script setup>
defineProps({
  libFunction: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.functionContainer {
  padding-bottom: 32px;
  margin-bottom: 32px;
  border-bottom: 1px solid black;
}
</style>
