<template>
  <!-- type is inline function -->
  <TypeFunction
    v-if="type.data?.function"
    :func="type.data?.function"
  />

  <!-- type is inline object -->
  <TypeObject
    v-else-if="type.data?.properties?.length"
    :properties="type.data?.properties"
  />

  <template v-else>
    <TypeWrapper :type-data="type">
      <!-- type has internal link -->
      <RouterLink
        v-if="!!url && url.isInternal"
        :class="{ 'code-link': isCode }"
        :to="url.path"
      >
        <span :class="`token ${tokenType}`">
          {{ typeItem.name }}
        </span>
      </RouterLink>
      <!-- type has external link -->
      <a
        v-else-if="!!url && !url.isInternal"
        :class="{ 'code-link': isCode }"
        :href="url.path"
        target="_blank"
      >
        <span :class="`token ${tokenType}`">
          {{ typeItem.name }}
        </span>
      </a>
      <!-- type does not have a link -->
      <span
        v-if="!url || childName"
        :class="`token ${tokenType}`"
      >
        {{ !url ? type.name : childName }}
      </span>
    </TypeWrapper>
  </template>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { APISingleType } from '@lib/apiData';
import { getLibItemType } from '@lib/utils';

type Props = {
  type: APISingleType;
  isCode?: boolean;
};

const props = defineProps<Props>();

const typeItem = computed(() => {
  return props.type.parent ? props.type.parent : props.type;
})

const url = computed(() => {
  if (props.type.lib && typeItem.value.name && typeItem.value.kind) {
    const itemType = getLibItemType(typeItem.value.kind);
    if (itemType) {
      return {
        path: `/api/${props.type.lib}/${itemType}/${typeItem.value.name}`,
        isInternal: true
      }
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

const childName = computed(() => {
  if (!props.type.parent) return null;
  return `.${props.type.name}`;
})

const tokenType = computed(() => {
  if (!props.type.data?.literalType || props.type.data?.literalType === 'null') return 'type';

  return props.type.data?.literalType;
});
</script>