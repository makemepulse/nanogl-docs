<template>
  <div>
    <h2 class="my-8">{{currentLib.name}}</h2>
    <div v-if="currentLib.classes.length">
      <h3 class="mt-8 mb-4">Classes</h3>
      <APILibItem
        v-for="libClass in currentLib.classes"
        type="classes"
        :item-name="libClass.name"
      />
    </div>
    <div v-if="currentLib.functions.length">
      <h3 class="mt-8 mb-4">Functions</h3>
      <APILibItem
        v-for="libFunc in currentLib.functions"
        type="functions"
        :item-name="libFunc.name"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from '@lib/store';

const { currentLib } = useStore();
</script>