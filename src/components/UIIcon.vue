<script setup>
import { defineAsyncComponent } from 'vue';

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
});

const icon = defineAsyncComponent(() =>
  import(`../assets/icons/${props.name}.svg`)
);
</script>

<template>
  <component :is="icon" class="fill-current" />
</template>