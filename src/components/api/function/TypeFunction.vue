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
      <span class="token type">
        <Type :data="param.type" is-code/>
      </span>
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
  <span v-if="func.type" class="token type">
    <Type :data="func.type" is-code />
  </span>
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