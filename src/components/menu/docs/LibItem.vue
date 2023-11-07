<template>
  <RouterLink
    :to="`/docs/${libraryName}/${type}/${itemName}`"
    :class="{ selected: isSelected }">
    {{ itemName }}
  </RouterLink>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  type: {
    type: String,
    required: true
  },
  libraryName: {
    type: String,
    required: true
  },
  itemName: {
    type: String,
    required: true
  },
  selectedType: {
    type: String,
    required: false
  },
  selectedItemName: {
    type: String,
    required: false
  }
})

const isSelected = computed(() => {
  return props.type === props.selectedType && props.itemName === props.selectedItemName;
})
</script>