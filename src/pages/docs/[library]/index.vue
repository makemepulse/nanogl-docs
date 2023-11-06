<template>
  <NotFound v-if="Object.keys(currentLib).length === 0" />
  <div v-else>
    <Class
      v-for="libClass in currentLib.classes"
      :lib-class="libClass" />
    <div v-if="currentLib.functions.length > 0">
      <h1>Functions</h1>
      <div class="space-y-32">
        <Function
          v-for="libFunc in currentLib.functions"
          :lib-function="libFunc" />
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  currentLib: {
    type: Object,
    required: true
  }
})
</script>
