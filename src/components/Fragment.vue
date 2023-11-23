<template>
  <slot />
</template>

<script setup lang="ts">
type Props = {
  class?: string
}
defineProps<Props>();
</script>