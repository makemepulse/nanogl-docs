<template>
  <div :class="{
    'callout my-16 px-24 py-12 rounded-md flex items-baseline text-16 leading-loose': true,
    'bg-red-25': type === 'important',
    'bg-blue-25': type === 'info',
    'bg-green-25': type === 'example',
  }">
    <slot />
  </div>
</template>

<script setup lang="ts">
type Props = {
  type?: 'info' | 'important' | 'example';
};
withDefaults(defineProps<Props>(), {
  type: 'info'
});
</script>
