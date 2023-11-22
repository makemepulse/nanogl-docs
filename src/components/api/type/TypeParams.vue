<template>
  <span class="token punctuation">
    {{ '<' }}
  </span>
  <template v-for="(param, i) in params">
    <span>{{ param.name }}</span>
    <span
      v-if="i < (params.length - 1)"
      class="token punctuation"
    >
      {{ ', ' }}
    </span>
  </template>
  <span class="token punctuation">
    {{ '>' }}
  </span>
</template>

<script setup lang="ts">
import { APITypeParam } from '@lib/apiData';

type Props = {
  params: APITypeParam[];
};

defineProps<Props>();
</script>