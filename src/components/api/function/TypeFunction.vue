<template>
  <span class="inline-flex flex-wrap">
    <span class="token punctuation">(</span>
    <template v-for="param, index in func.params">
      <span class="token param">{{ param.name }}</span>
      <span v-if="param.optional" class="token boolean">?</span>
      <span v-if="param.type" class="flex w-fit">
        <span class="token punctuation mr-8">:</span>
        <span class="token type inline-flex">
          <Type :data="param.type" is-code/>
        </span>
      </span>
      <span v-if="index + 1 < func.params.length" class="token punctuation mr-8">,</span>
    </template>
    <span class="token punctuation">)</span>
    <span class="token operator mx-8">=></span>
    <span v-if="func.type" class="token type inline-flex">
      <Type :data="func.type" is-code />
    </span>
    <span v-else class="token punctuation">{}</span>
  </span>
</template>

<script setup lang="ts">
import { APIFunction } from '@lib/apiData';

type Props = {
  func: APIFunction;
};
defineProps<Props>();
</script>