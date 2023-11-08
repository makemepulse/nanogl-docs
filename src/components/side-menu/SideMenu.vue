<template>
  <div class="menu sticky top-menu h-full-menu overflow-auto scrollbar col-span-2 py-32 px-20 flex flex-col gap-24 pointer-events-auto">
    <div class="flex flex-col gap-20">
      <GuideMenu v-if="currentSection === SECTIONS.GUIDE" />
      <APIMenu v-if="currentSection === SECTIONS.API" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from '@lib/store';
import { SECTIONS } from '@lib/constants';

const { currentSection } = useStore();

</script>