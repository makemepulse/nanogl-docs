<template>
  <div :class="{
    'px-8 py-2 rounded-full ': true,
    'text-14': big,
    'text-12': !big,
    'bg-purple-25': tag === LIB_ITEM_TAGS.ABSTRACT,
    'bg-blue-25': tag === LIB_ITEM_TAGS.STATIC,
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
  big?: boolean;
};
defineProps<Props>();
</script>