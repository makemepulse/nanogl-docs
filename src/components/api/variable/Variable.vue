<template>
  <div :id="`item-${id}`" class="flex flex-col gap-4 scroll-mt-72">
    <div class="inline-block">
      <code class="language-ts inline-block">
        {{ name }}
      </code>
      <span v-if="type || comment || defaultValue"> : </span>
      <code v-if="type" class="language-ts inline-block">
        <Type :data="type" is-code />
      </code>
      <div v-if="tags?.length" class="inline-block my-4 ml-8">
        <Tags :tags="tags" />
      </div>
    </div>
    <div v-if="comment">
      <Comment :comment="comment" inline />
    </div>
    <div v-if="defaultValue">
      <span>Default : </span>
      <code  class="language-js inline-block">
        {{ defaultValue }}
      </code>
    </div>
  </div>
</template>

<script setup lang="ts">
import { APITag, APIType } from '@lib/apiData';

type Props = {
  id: number;
  name: string;
  type?: APIType;
  tags?: APITag[];
  comment?: string;
  defaultValue?: string;
};
defineProps<Props>();
</script>