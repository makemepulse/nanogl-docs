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
      <Comment v-if="comment" :comment="comment" class="inline" />
    </div>
    <div v-if="defaultValue">
      <span>Default : </span>
      <span>{{ defaultValue }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { APICommentItem, APIType } from '@lib/apiData';

defineProps({
  id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  type: {
    type: Object || Array<APIType>,
    required: false
  },
  optional: {
    type: Boolean,
    required: false
  },
  comment: {
    type: Array<APICommentItem>,
    required: false
  },
  defaultValue: {
    type: String,
    required: false
  }
})
</script>