<template>
  <div :id="`item-${id}`" class="flex flex-col gap-4 scroll-mt-72">
    <div class="inline-block">
      <code class="language-ts inline-block">
        {{ name }}
      </code>
      <span v-if="type || optional || comment || defaultValue"> : </span>
      <code v-if="type" class="language-ts inline-block">
        <Type :data="type" is-code />
      </code>
    </div>
    <div>
      <span v-if="optional">(optional) </span>
      <Comment v-if="comment" :comment="comment" inline />
    </div>
    <div v-if="defaultValue">
      <span>Default : </span>
      <span>{{ defaultValue }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { APIType } from '@lib/apiData';

type Props = {
  id: number;
  name: string;
  type?: APIType;
  optional?: boolean;
  comment?: string;
  defaultValue?: string;
};
defineProps<Props>();
</script>