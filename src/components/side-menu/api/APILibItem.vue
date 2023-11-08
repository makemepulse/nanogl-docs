<template>
  <RouterLink
    :to="`/${SECTIONS.API}/${currentLib.name}/${type}/${itemName}`"
    :class="{ selected: isSelected }">
    {{ itemName }}
  </RouterLink>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { useStore } from '@lib/store';
import { SECTIONS } from '@lib/constants';

const { currentLib, currentType, currentItem } = useStore();

const props = defineProps({
  type: {
    type: String,
    required: true
  },
  itemName: {
    type: String,
    required: true
  },
})

const isSelected = computed(() => {
  return props.type === currentType.value && props.itemName === currentItem.value.name;
})
</script>