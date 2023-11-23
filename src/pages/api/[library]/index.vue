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
            <UIBlockLink
              v-for="libClass in currentLib.classes"
              class="px-16 py-8"
              :url="`/${SECTIONS.API}/${currentLib.name}/${LIB_ITEM_TYPE.CLASS}/${libClass.name}`"
              :text="libClass.name"
            />
          </div>
        </div>
        <div v-if="currentLib.functions.length">
          <h3 id="functions" class="mt-8 mb-4">Functions</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 auto-rows-fr gap-8">
            <UIBlockLink
              v-for="libFunc in currentLib.functions"
              class="px-16 py-8"
              :url="`/${SECTIONS.API}/${currentLib.name}/${LIB_ITEM_TYPE.FUNCTION}/${libFunc.name}`"
              :text="libFunc.name"
            />
          </div>
        </div>
        <div v-if="currentLib.interfaces.length">
          <h3 id="interfaces" class="mt-8 mb-4">Interfaces</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 auto-rows-fr gap-8">
            <UIBlockLink
              v-for="libInterface in currentLib.interfaces"
              class="px-16 py-8"
              :url="`/${SECTIONS.API}/${currentLib.name}/${LIB_ITEM_TYPE.INTERFACE}/${libInterface.name}`"
              :text="libInterface.name"
            />
          </div>
        </div>
        <div v-if="currentLib.types.length">
          <h3 id="types" class="mt-8 mb-4">Types</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 auto-rows-fr gap-8">
            <UIBlockLink
            v-for="libType in currentLib.types"
            class="px-16 py-8"
            :url="`/${SECTIONS.API}/${currentLib.name}/${LIB_ITEM_TYPE.TYPE}/${libType.name}`"
            :text="libType.name"
            />
          </div>
        </div>
        <div v-if="currentLib.enumerations.length">
          <h3 id="enumerations" class="mt-8 mb-4">Enumerations</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 auto-rows-fr gap-8">
            <UIBlockLink
              v-for="libEnum in currentLib.enumerations"
              class="px-16 py-8"
              :url="`/${SECTIONS.API}/${currentLib.name}/${LIB_ITEM_TYPE.ENUM}/${libEnum.name}`"
              :text="libEnum.name"
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
          <li v-if="currentLib.interfaces.length">
            <a href="#interfaces">Interfaces</a>
          </li>
          <li v-if="currentLib.enumerations.length">
            <a href="#enumerations">Enumerations</a>
          </li>
          <li v-if="currentLib.types.length">
            <a href="#types">Types</a>
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
