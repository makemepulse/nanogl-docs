<script setup lang="ts">
import { useStore } from '@lib/store';

const { init } = useStore();
init();
</script>

<template>
  <div class="app relative w-full max-w-screen-2xl mx-auto">
    <MainMenu />
    <div class="grid grid-cols-10 mt-menu">
      <SideMenu />
      <div class="content col-span-8 col-start-3">
        <RouterView />
      </div>
    </div>
  </div>
</template>