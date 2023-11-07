<template>
  <NotFound v-if="!currentLib || !currentType || !currentItem" />
  <div v-else>
    <Class
      v-if="currentType === 'classes'"
      :lib-class="currentItem" />
    <Function
      v-else-if="currentType === 'functions'"
      :lib-function="currentItem" />
  </div>
</template>

<script setup>
const props = defineProps({
  currentLib: {
    type: Object,
    required: false
  },
  currentType: {
    type: String,
    required: false
  },
  currentItem: {
    type: Object,
    required: false
  }
})
</script>
