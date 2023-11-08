<template>
  <div class="page-body">
    <h1>API</h1>
    <p>A detailed API for every nanogl library.</p>
    <div class="mt-32 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-fr gap-16">
      <BlockLink
        v-for="lib in libsData"
        class="p-24"
        :url="`/${SECTIONS.API}/${lib.name}`"
        :text="lib.name"
        :description="lib.description"
        fullHeight
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { SECTIONS } from '@lib/constants';
import { useStore } from '@lib/store';

const { libsData } = useStore();
</script>
