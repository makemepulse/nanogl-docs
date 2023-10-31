<template>
  <NotFound v-if="Object.keys(currentLib).length === 0" />
  <div v-else>
    <Class
      v-for="libClass in currentLib.classes"
      :lib-class="libClass" />
    <Function
      v-for="libFunc in currentLib.functions"
      :lib-function="libFunc" />
  </div>
</template>

<script setup>
import Class from '../../../components/content/Class.vue';
import Function from '../../../components/content/Function.vue';
import NotFound from '../../../components/NotFound.vue';

const props = defineProps({
  currentLib: {
    type: Object,
    required: true
  }
})
</script>
