<template>
  <p>
    <SingleComment
      v-for="commentData in comment"
      :text="commentData.text"
      :target="commentData.target"
    />
  </p>
</template>

<script setup lang="ts">
import { APICommentItem } from '@lib/apiData';

defineProps({
  comment: {
    type: Array<APICommentItem>,
    required: true
  },
})
</script>