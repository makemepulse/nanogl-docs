<template>
  <NotFound v-if="!currentLib" />
  <div v-else class="page-body-toc">
    <div class="content-wrapper">
      <h1 id="introduction">{{ currentLib.name }}</h1>
      <p>{{  currentLib.description }}</p>
      <div class="mt-16 flex flex-col gap-8">
        <div v-if="currentLib.classes.length">
          <h3 id="classes" class="mt-8 mb-4">Classes</h3>
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
          <h3 id="functions" class="mt-8 mb-4">Functions</h3>
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
    <div class="toc-wrapper">
      <div class="toc">
        <h2>Summary</h2>
        <ul>
          <li>
            <a href="#introduction">Introduction</a>
          </li>
          <li v-if="currentLib.classes.length">
            <a href="#classes">Classes</a>
          </li>
          <li v-if="currentLib.functions.length">
            <a href="#functions">Functions</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { SECTIONS, LIB_ITEM_TYPE } from '@lib/constants';
import { useStore } from '@lib/store';

const { currentLib } = useStore();
</script>
