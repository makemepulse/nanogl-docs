<template>
  <span :class="`token ${tokenType}`">
    {{ name }}
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { APILiteralType } from '@lib/apiData';

type Props = {
  name: string ;
  literalType?: APILiteralType;
};
const props = defineProps<Props>();

const tokenType = computed(() => {
  if (!props.literalType || props.literalType === 'null') return 'type';

  return props.literalType;
});
</script>