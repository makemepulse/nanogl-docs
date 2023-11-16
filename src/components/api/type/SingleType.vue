<template>
  <TypeFunction
    v-if="type.function"
    :func="type.function"
    :class="class"
  />
  <RouterLink
    v-else-if="!!url && url.isInternal"
    :class="{ 'code-link': isCode, [className]: !!className }"
    :to="url.path"
    target="_blank"
  >
    {{ type.name }}
  </RouterLink>
  <a
    v-else-if="!!url && !url.isInternal"
    :class="{ 'code-link': isCode, [className]: !!className }"
    :href="url.path"
    target="_blank"
  >
    {{ type.name }}
  </a>
  <span v-else :class="className">{{ type.name }}</span>
  <span v-if="type.isArray" :class="className">
    {{ '[]' }}
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { APISingleType } from '@lib/apiData';
import { LIB_ITEM_TYPE } from '@lib/constants';

type Props = {
  type: APISingleType;
  isCode?: boolean;
  className?: string;
};

const props = defineProps<Props>();

const itemType = computed(() => {
  if (props.type.kind === 'Class') {
    return LIB_ITEM_TYPE.CLASS;
  }

  if (props.type.kind === 'Function') {
    return LIB_ITEM_TYPE.FUNCTION;
  }

  return null
})

const url = computed(() => {
  if (props.type.lib && props.type.name && itemType.value) {
    return {
      path: `/api/${props.type.lib}/${itemType.value}/${props.type.name}`,
      isInternal: true
    }
  }

  if (props.type.source) {
    return {
      path: props.type.source,
      isInternal: false
    };
  }

  return null
})
</script>