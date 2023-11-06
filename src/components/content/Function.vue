<template>
  <div :id="`function-${libFunction.name}`">
    <Method :method="libFunction" />
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
