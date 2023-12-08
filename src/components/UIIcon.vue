<template>
  <component
    :is="icon"
    :class="{ 'fill-current': !stroke, 'fill-none stroke-current stroke-[4px]': stroke }"
  />
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue';

export type Icon = 'arrow-down' | 'arrow-right' | 'github' | 'menu';

type Props = {
  name: Icon;
  stroke?: boolean;
};

const props = defineProps<Props>();

const icon = defineAsyncComponent(() =>
  import(`../assets/icons/${props.name}.svg`)
);
</script>