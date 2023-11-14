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
type Props = {
  type?: 'info' | 'important';
};
withDefaults(defineProps<Props>(), {
  type: 'info'
});
</script>
