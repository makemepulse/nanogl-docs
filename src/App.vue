<script setup lang="ts">
import { useStore } from '@lib/store';
import { useMarkdown } from '@lib/markdown';

const { init: initStore } = useStore();
const { init: initMarkdown } = useMarkdown();

initStore();
initMarkdown();
</script>

<template>
  <div class="app relative w-full max-w-screen-2xl mx-auto">
    <MainMenu />
    <div class="grid grid-cols-10 mt-menu">
      <SideMenu />
      <div class="content col-span-8 col-start-3 relative">
        <RouterView />
      </div>
    </div>
  </div>
</template>