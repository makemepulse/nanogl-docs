<template>
  <!-- type needs asserts -->
  <span v-if="singleType?.data?.useAsserts" class="token keyword">
    {{ 'asserts ' }}
  </span>
  <!-- type is query -->
  <span v-if="typeData.isQuery" class="token keyword">
    {{ 'typeof ' }}
  </span>
  <!-- type has operator -->
  <span v-if="typeData.data?.operator" class="token keyword">
    {{ `${typeData.data?.operator} ` }}
  </span>
  <span v-if="singleType?.isInferred" class="token keyword">
    {{ 'infer ' }}
  </span>

  <slot />

  <!-- type has arguments -->
  <TypeArguments
    v-if="singleType?.data?.arguments"
    :args="singleType?.data?.arguments"
  />
  <!-- type is array or is indexed -->
  <template v-if="typeData.isArray || typeData.isIndexed">
    <span class="token punctuation">
      {{ '[' }}
    </span>
    <span v-if="typeData.data?.indexType">
      <Type :data="typeData.data?.indexType" is-code />
    </span>
    <span class="token punctuation">
      {{ ']' }}
    </span>
  </template>
  <!-- type is has extends type -->
  <template v-if="typeData.data?.extendsType">
    <span class="token keyword">{{ ' extends ' }}</span>
    <Type :data="typeData.data?.extendsType" is-code />
  </template>
  <!-- type is has conditional types -->
  <template v-if="typeData.data?.conditionalTypes?.length > 1">
    <span class="token operator">{{ ' ? ' }}</span>
    <Type :data="typeData.data?.conditionalTypes[0]" is-code />
    <span class="token operator">{{ ' : ' }}</span>
    <Type :data="typeData.data?.conditionalTypes[1]" is-code />
  </template>
  <!-- type is has target type -->
  <template v-if="singleType?.data?.targetType">
    <span class="token keyword">{{ ' is ' }}</span>
    <Type :data="singleType?.data?.targetType" is-code />
  </template>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { APIType, APISingleType } from '@lib/apiData';

type Props = {
  typeData: APIType;
};

const props = defineProps<Props>();

const singleType = computed(() => {
  if (props.typeData.hasOwnProperty('list')) return;
  return props.typeData as APISingleType;
});
</script>