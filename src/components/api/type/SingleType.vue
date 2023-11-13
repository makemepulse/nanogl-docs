<template>
  <RouterLink
    v-if="!!url && url.isInternal"
    :class="{ 'code-link': isCode }"
    :to="url.path"
    target="_blank"
  >
    {{ type.name }}
  </RouterLink>
  <a
    v-else-if="!!url && !url.isInternal"
    :class="{ 'code-link': isCode }"
    :href="url.path"
    target="_blank"
  >
    {{ type.name }}
  </a>
  <span v-else>{{ type.name }}</span>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { LIB_ITEM_TYPE } from '@lib/constants';

const props = defineProps({
  type: {
    type: Object,
    required: true
  },
  isCode: {
    type: Boolean,
    required: false,
  }
})

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