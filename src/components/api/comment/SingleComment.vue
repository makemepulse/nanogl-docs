<template>
  <a
    v-if="!!target"
    :href="`#item-${target}`"
  >
    {{ text }}
  </a>
  <span v-else>{{ text }}</span>
</template>

<script setup lang="ts">
defineProps({
  text: {
    type: String,
    required: true
  },
  target: {
    type: Number,
    required: false,
  }
})
</script>