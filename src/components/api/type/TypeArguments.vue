<template>
  <span class="token punctuation">
    {{ '<' }}
  </span>
  <template v-for="(arg, i) in args">
    <span class="token type">
      <Type :data="arg" is-code />
    </span>
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

const props = defineProps<Props>();
console.log(props.args)
</script>