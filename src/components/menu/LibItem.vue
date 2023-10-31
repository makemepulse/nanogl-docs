<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  libraryName: {
    type: String,
    required: true
  },
  itemName: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  }
})

const { currentRoute } = useRouter();

const isSelected = computed(() => {
  const currentLibrary = currentRoute.value.params.library;
  const currentItem = currentRoute.value.hash.replace(/#\w+-/, '');
  const currentType = currentRoute.value.hash.replace(/#/, '').split('-')[0];

  return !!currentLibrary && !!currentItem && !!currentType
    && currentLibrary === props.libraryName && currentItem === props.itemName && currentType === props.type;
})
</script>

<template>
  <RouterLink
    :to="`/libraries/${libraryName}#${type}-${itemName}`"
    :class="{ selected: isSelected }">
    {{ itemName }}
  </RouterLink>
</template>