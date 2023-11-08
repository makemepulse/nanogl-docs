<template>
  <component
    :is="icon"
    :class="{ 'fill-current': !stroke, 'stroke-current': stroke }"
  />
</template>

<script setup>
import { defineAsyncComponent } from 'vue';

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  stroke: {
    type: Boolean,
    required: false
  }
});

const icon = defineAsyncComponent(() =>
  import(`../assets/icons/${props.name}.svg`)
);
</script>