<template>
  <component
    :is="icon"
    :class="{ 'fill-current': !stroke, 'stroke-current': stroke }"
  />
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue';

type Props = {
  name: 'arrow-down' | 'arrow-right' | 'github';
  stroke?: boolean;
};

const props = defineProps<Props>();

const icon = defineAsyncComponent(() =>
  import(`../assets/icons/${props.name}.svg`)
);
</script>