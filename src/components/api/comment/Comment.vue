<template>
  <p>
    <template v-for="commentData in comment">
      <SingleComment
        v-if="!commentData.list"
        :text="commentData.text"
        :target="commentData.target"
        :is-code="commentData.isCode"
      />
      <ul v-else>
        <li v-for="listItem in commentData.list">
          <SingleComment
            :text="listItem.text"
            :target="listItem.target"
            :is-code="listItem.isCode"
          />
        </li>
      </ul>
    </template>
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