<template>
  <template v-for="(typeData, index) in types">
    <SingleType
      :type="typeData"
      :isCode="isCode"
    />
    <span v-if="index < types.length - 1"> | </span>
  </template>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  data: {
    type: Object || Array<Object>,
    required: true
  },
  isCode: {
    type: Boolean,
    required: false,
  }
})

const types = computed(() => {
  return Array.isArray(props.data) ? props.data : [props.data];
})
</script>