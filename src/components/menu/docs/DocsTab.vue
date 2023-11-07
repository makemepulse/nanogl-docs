<template>
  <LibsMenu
    :libs="libs"
    :selected-lib="selectedLib?.name" />
  <LibItemsMenu
    v-if="!!selectedLib"
    :lib="selectedLib"
    :selected-type="selectedType"
    :selected-item="selectedItem" />
</template>

<script setup>
const props = defineProps({
  libs: {
    type: Object,
    required: true
  },
  selectedLib: {
    type: Object,
    required: false
  },
  selectedType: {
    type: String,
    required: false
  },
  selectedItem: {
    type: Object,
    required: false
  },
})
</script>