<template>
  <!-- If it's an 'Name<Type>' or 'Name<Type, Type>' shape -->
  <template v-if="['ArrayLike', 'Set', 'Record', 'Map', 'WeakMap', 'Promise'].includes(types[0].name)">
    <span>{{ `${types[0].name}<` }}</span>
    <template v-for="(typeData, index) in types[0].types">
      <Type
        :data="typeData"
        :isCode="isCode"
      />
      <span v-if="index < types[0].types.length - 1">{{ ', ' }}</span>
    </template>
    <span>{{ '>' }}</span>
  </template>

  <!-- If multiple different types are accepted -->
  <template v-else-if="types.length > 1" v-for="(typeData, index) in types">
    <Type
      :data="typeData"
      :isCode="isCode"
    />
    <span v-if="index < types.length - 1">
      {{ ' | ' }}
    </span>
  </template>

  <!-- If it's a simple single type -->
  <template v-else>
    <SingleType
      :type="types[0]"
      :isCode="isCode"
    />
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
  if (Array.isArray(props.data)) {
    return props.data.filter((v,i,a)=>a.findIndex(v2=>(v2.name===v.name&&v2.lib===v.lib))===i);
  } 
  return [props.data];
})

</script>