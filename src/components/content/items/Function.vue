<template>
  <div class="content-wrapper" :id="`function-${libFunction.name}`">
    <Method :method="libFunction" />
  </div>
  <div class="toc-wrapper">
    <div class="toc">
      <h2>Summary</h2>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  libFunction: {
    type: Object,
    required: true
  }
})
</script>
