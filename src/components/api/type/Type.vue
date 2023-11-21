<template>
  <template v-if="types.length">
    <!-- If multiple different types are accepted -->
    <template v-if="types.length > 1" v-for="(typeData, index) in types">
      <Type
        :data="typeData"
        :isCode="isCode"
      />
      <span v-if="index < types.length - 1" class="token operator">
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
  if (!props.data) return [];
  if (Array.isArray(props.data)) {
    return props.data.filter((v,i,a)=>a.findIndex(v2=>(v2.name===v.name&&v2.lib===v.lib))===i);
  }
  return [props.data];
})

</script>