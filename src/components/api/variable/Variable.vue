<template>
  <div :id="`item-${id}`" class="flex flex-col gap-4 scroll-mt-72">
    <div class="inline-block">
      <CodeWrapper is-inline>
        {{ name }}
      </CodeWrapper>
      <span v-if="type || comment || defaultValue"> : </span>
      <CodeWrapper v-if="type" is-inline>
        <Type :data="type" is-code />
      </CodeWrapper>
      <div v-if="tags?.length" class="inline-block my-4 ml-8">
        <Tags :tags="tags" />
      </div>
    </div>
    <div v-if="comment">
      <Comment :comment="comment" inline />
    </div>
    <div v-if="defaultValue || defaultType">
      <span>Default : </span>
      <span v-if="!!defaultValueHtml" v-html="defaultValueHtml" />
      <CodeWrapper v-else lang="ts" is-inline>
        <span v-if="defaultValue === 'null'" class="token null">null</span>
        <Type v-else :data="defaultType" is-code />
      </CodeWrapper>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { useMarkdown } from '@lib/markdown';
import { APITag, APIType } from '@lib/apiData';

type Props = {
  id: number;
  name: string;
  type?: APIType;
  tags?: APITag[];
  comment?: string;
  defaultValue?: string;
  defaultType?: APIType;
};
const props = defineProps<Props>();

const { md } = useMarkdown();

const defaultValueHtml = computed(() => {
  if (!props.defaultValue || props.defaultValue === 'null') return;
  return md.value.renderInline(`\`${props.defaultValue}\``);
});
</script>