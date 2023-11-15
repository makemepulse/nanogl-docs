<template>
  <div :class="[
    'px-8 py-2 rounded-full',
    big ? 'text-14' : 'text-12'
  ]">
    <slot />
  </div>
</template>

<script setup lang="ts">
type Props = {
  big?: boolean;
};
defineProps<Props>();
</script>