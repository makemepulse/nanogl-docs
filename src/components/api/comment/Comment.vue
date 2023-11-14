<template>
  <div v-if="htmlData" :class="{ inline }">
    <div v-html="htmlData" :class="{ inline }"></div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { useMarkdown } from '@lib/markdown';

const props = defineProps({
  comment: {
    type: String,
    required: true
  },
  inline: {
    type: Boolean,
    required: false,
    default: false
  }
})

const { md } = useMarkdown();

const htmlData = computed(() => {
  if (props.inline) {
    return md.value.renderInline(props.comment)
  }

  return md.value.render(props.comment);
});
</script>