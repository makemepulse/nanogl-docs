<template>
  <div :class="{
    'callout my-16 px-24 py-12 w-fit rounded-md flex items-baseline text-16 leading-loose': true,
    'bg-primary-25': type === 'info',
    'bg-important-25': type === 'important',
  }">
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps({
  type: {
    type: String,
    default: 'info',
    validator: (value: string) => ['info', 'important'].includes(value)
  }
})
</script>
