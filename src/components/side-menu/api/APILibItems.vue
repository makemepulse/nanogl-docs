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
    <div v-if="currentLib.interfaces.length">
      <h3 class="mt-8 mb-4">Interfaces</h3>
      <APILibItem
        v-for="libInterface in currentLib.interfaces"
        :type="LIB_ITEM_TYPE.INTERFACE"
        :item-name="libInterface.name"
      />
    </div>
    <div v-if="currentLib.types.length">
      <h3 class="mt-8 mb-4">Types</h3>
      <APILibItem
      v-for="libType in currentLib.types"
      :type="LIB_ITEM_TYPE.TYPE"
      :item-name="libType.name"
      />
    </div>
    <div v-if="currentLib.enumerations.length">
      <h3 class="mt-8 mb-4">Enumerations</h3>
      <APILibItem
        v-for="libEnum in currentLib.enumerations"
        :type="LIB_ITEM_TYPE.ENUM"
        :item-name="libEnum.name"
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