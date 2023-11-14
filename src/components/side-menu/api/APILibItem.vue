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
import { LIB_ITEM_TYPE, SECTIONS } from '@lib/constants';

const { currentLib, currentType, currentItem } = useStore();

type Props = {
  type: LIB_ITEM_TYPE;
  itemName: string;
};

const props = defineProps<Props>();

const isSelected = computed(() => {
  return props.type === currentType.value && props.itemName === currentItem.value.name;
})
</script>