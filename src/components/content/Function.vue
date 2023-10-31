<template>
  <div :id="`function-${libFunction.name}`" class="py-32 border-b">
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
