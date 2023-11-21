<template>
  <span class="token punctuation">
    {{ '<' }}
  </span>
  <template v-for="(arg, i) in args">
    <Type :data="arg" is-code />
    <span
      v-if="i < (args.length - 1)"
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
import { APISingleType } from '@lib/apiData';

type Props = {
  args: APISingleType[];
};

defineProps<Props>();
</script>