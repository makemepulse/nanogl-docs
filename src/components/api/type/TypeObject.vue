<template>
  <span class="token punctuation">
    {{ '{ ' }}
  </span>
  <template v-for="(prop, i) in properties">
    <span class="token property">{{ prop.name }}</span>
    <span class="token punctuation">{{ ': ' }}</span>
    <Type :data="prop.type" is-code />
    <span
      v-if="i < properties.length - 1"
      class="token punctuation">
      {{ ', ' }}
    </span>
  </template>
  <span class="token punctuation">
    {{ ' }' }}
  </span>
</template>

<script setup lang="ts">
import { APISimpleVariable } from '@lib/apiData';

type Props = {
  properties: APISimpleVariable[];
};

defineProps<Props>();
</script>