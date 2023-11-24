<template>
  <template v-if="htmlData">
    <component
      v-if="title"
      :is="headingComponent"
    >
      {{ title }}
    </component>
    <div v-html="htmlData" :class="{ inline }"></div>
  </template>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { useMarkdown } from '@lib/markdown';

type Props = {
  comment: string;
  inline?: boolean;
  title?: string;
  headingComponent?: 'h1' | 'h2' | 'h3' | 'h4';
};
const props = withDefaults(defineProps<Props>(), {
  inline: false,
  headingComponent: 'h4',
});

const { md } = useMarkdown();

const htmlData = computed(() => {
  if (props.inline) {
    return md.value.renderInline(props.comment)
  }

  return md.value.render(props.comment);
});
</script>