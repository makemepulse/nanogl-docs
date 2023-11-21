<template>
  <TypeFunction
    v-if="type.function"
    :func="type.function"
  />
  <template v-else>
    <span v-if="type.isQuery" class="token keyword">
      {{ 'typeof ' }}
    </span>
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
    <span v-else>
      {{ type.name }}
    </span>
    <TypeArguments
      v-if="type.arguments"
      :args="type.arguments"
    />
    <template v-if="type.isArray || type.isIndexed">
      <span>
        {{ '[' }}
      </span>
      <span v-if="type.indexType">
        <Type :data="type.indexType" is-code />
      </span>
      <span>
        {{ ']' }}
      </span>
    </template>
  </template>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { APISingleType } from '@lib/apiData';
import { LIB_ITEM_TYPE } from '@lib/constants';

type Props = {
  type: APISingleType;
  isCode?: boolean;
};

const props = defineProps<Props>();

const itemType = computed(() => {
  if (props.type.kind === 'Class') {
    return LIB_ITEM_TYPE.CLASS;
  }

  if (props.type.kind === 'Function') {
    return LIB_ITEM_TYPE.FUNCTION;
  }

  if (props.type.kind === 'Interface') {
    return LIB_ITEM_TYPE.INTERFACE;
  }

  if (props.type.kind === 'Type alias') {
    return LIB_ITEM_TYPE.TYPE;
  }

  if (props.type.kind === 'Enumeration') {
    return LIB_ITEM_TYPE.ENUM;
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