<template>
  <NotFound v-if="!currentLib" />
</template>

<script setup>
const props = defineProps({
  currentLib: {
    type: Object,
    required: true
  }
})
</script>
