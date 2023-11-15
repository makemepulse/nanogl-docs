<template>
  <div :class="{
    'text-12 px-8 py-2 rounded-full ': true,
    'bg-purple-25': tag === LIB_ITEM_TAGS.ABSTRACT,
    'bg-green-25': tag === LIB_ITEM_TAGS.READONLY,
    'bg-yellow-25': tag === LIB_ITEM_TAGS.OPTIONAL,
    'bg-orange-25': tag === LIB_ITEM_TAGS.PROTECTED,
    'bg-red-25': tag === LIB_ITEM_TAGS.PRIVATE,
  }">
    {{ tag }}
  </div>
</template>

<script setup lang="ts">
import { APITag } from '@lib/apiData';
import { LIB_ITEM_TAGS } from '@lib/constants';

type Props = {
  tag: APITag;
};
defineProps<Props>();
</script>