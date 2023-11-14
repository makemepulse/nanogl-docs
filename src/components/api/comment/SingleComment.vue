<template>
  <code v-if="isCode" class="language-js">
    <span>{{ text }}</span>
  </code>
  <a
    v-else-if="!!target"
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
  },
  isCode: {
    type: Boolean,
    required: false,
  }
})
</script>