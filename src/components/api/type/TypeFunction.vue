<template>
  <span class="token punctuation">
    {{ '(' }}
  </span>
  <template v-for="param, index in func.params">
    <span class="token param">{{ param.name }}</span>
    <span v-if="param.optional" class="token boolean">?</span>
    <template v-if="param.type">
      <span class="token punctuation">
        {{  ': ' }}
      </span>
      <Type :data="param.type" is-code />
    </template>
    <span
      v-if="index + 1 < func.params.length"
      class="token punctuation"
    >
      {{  ', ' }}
    </span>
  </template>
  <span class="token punctuation">
    {{ ')' }}
  </span>
  <span class="token operator">
    {{  ' => ' }}
  </span>
  <Type
    v-if="func.type"
    :data="func.type"
    is-code
  />
  <span v-else class="token punctuation">
    {{ '{}' }}
  </span>
</template>

<script setup lang="ts">
import { APIFunction } from '@lib/apiData';

type Props = {
  func: APIFunction;
};
defineProps<Props>();
</script>