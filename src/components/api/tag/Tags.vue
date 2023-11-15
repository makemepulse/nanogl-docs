<template>
  <div class="flex gap-4">
    <Tag
      v-for="tag in tags"
      :tag="tag"
    />
  </div>
</template>

<script setup lang="ts">
import { APITag } from '@lib/apiData';

type Props = {
  tags: APITag[];
};
defineProps<Props>();
</script>