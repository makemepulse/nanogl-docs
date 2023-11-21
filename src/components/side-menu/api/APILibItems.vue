<template>
  <div>
    <h2 class="my-8">{{currentLib.name}}</h2>
    <div v-if="currentLib.classes.length">
      <h3 class="mt-8 mb-4">Classes</h3>
      <APILibItem
        v-for="libClass in orderedClasses"
        :type="LIB_ITEM_TYPE.CLASS"
        :item-name="libClass.name"
      />
    </div>
    <div v-if="currentLib.functions.length">
      <h3 class="mt-8 mb-4">Functions</h3>
      <APILibItem
        v-for="libFunc in orderedFunctions"
        :type="LIB_ITEM_TYPE.FUNCTION"
        :item-name="libFunc.name"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from '@lib/store';
import { LIB_ITEM_TYPE } from '@lib/constants';
import { computed } from 'vue';

const { currentLib } = useStore();

const orderedClasses = computed(() => {
  return currentLib.value.classes.sort((a,b) => a.name.localeCompare(b.name))
});

const orderedFunctions = computed(() => {
  return currentLib.value.functions.sort((a,b) => a.name.localeCompare(b.name))
});
</script>