<template>
  <NotFound v-if="!currentLib" />
  <div v-else>
    <h1>{{ currentLib.name }}</h1>
    <p>{{  currentLib.description }}</p>
    <div class="mt-16 flex flex-col gap-8">
      <div v-if="currentLib.classes.length">
        <h3 class="mt-8 mb-4">Classes</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 auto-rows-fr gap-8">
          <BlockLink
            v-for="libClass in currentLib.classes"
            class="px-16 py-8"
            :to="`/${SECTIONS.API}/${currentLib.name}/${LIB_ITEM_TYPE.CLASS}/${libClass.name}`"
            :text="libClass.name"
          />
        </div>
      </div>
      <div v-if="currentLib.functions.length">
        <h3 class="mt-8 mb-4">Functions</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 auto-rows-fr gap-8">
          <BlockLink
            v-for="libFunc in currentLib.functions"
            class="px-16 py-8"
            :to="`/${SECTIONS.API}/${currentLib.name}/${LIB_ITEM_TYPE.FUNCTION}/${libFunc.name}`"
            :text="libFunc.name"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { SECTIONS, LIB_ITEM_TYPE } from '@lib/constants';
import { useStore } from '@lib/store';

const { currentLib } = useStore();
</script>
