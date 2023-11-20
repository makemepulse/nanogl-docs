<template>
  <template v-if="types[0].name === 'Record'">
    <span>{{ 'Record<' }}</span>
    <SingleType
      :type="types[0].types[0]"
      :isCode="isCode"
    />
    <span>{{ ', ' }}</span>
    <SingleType
      :type="types[0].types[1]"
      :isCode="isCode"
    />
    <span>{{ '>' }}</span>
  </template>
  <template v-else v-for="(typeData, index) in types">
    <SingleType
      :type="typeData"
      :isCode="isCode"
    />
    <span v-if="index < types.length - 1">
      {{ ' | ' }}
    </span>
  </template>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { APIType } from '@lib/apiData';

type Props = {
  data: APIType;
  isCode?: boolean;
};

const props = defineProps<Props>();

const types = computed(() => {
  return Array.isArray(props.data) ? props.data : [props.data];
})

</script>