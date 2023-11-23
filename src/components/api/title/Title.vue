<template>
  <div class="flex items-center justify-between">
    <div class="flex gap-8 items-baseline">
      <h1 class="no-margin">{{ name }}</h1>
      <Tags v-if="tags.length" :tags="tags" big />
    </div>
    <UIButton
      v-if="source.length"
      :href="source"
      text="Source"
      icon="code"
      icon-stroke
      small
    />
  </div>
</template>

<script setup lang="ts">
import { APITag } from '@lib/apiData';

type Props = {
  name: string;
  tags: APITag[];
  source: string;
};
defineProps<Props>();
</script>
