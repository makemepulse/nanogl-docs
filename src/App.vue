<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router';

import { fetchLibs } from './scripts/fetch.js';

import UIMenu from './components/menu/UIMenu.vue';

const libs = ref([]);
libs.value = import.meta.glob('./assets/data.json', { eager: true })['./assets/data.json'].libs;
fetchLibs();

const { currentRoute } = useRouter();

const currentLib = computed(() => {
  const lib = libs.value.find(lib => lib.name === currentRoute.value.params.library);
  return lib || {};
})
</script>

<template>
  <div class="app">
    <UIMenu
      :libs="libs"
      :selected-lib="currentLib"
    />
    <div class="content">
      <RouterView :currentLib="currentLib"/>
    </div>
  </div>
</template>

<style lang="stylus">
.app {
  display: flex;
  flex-direction: row;
}

.content {
  width: 100%;
  margin: 20px;
  padding-left: 320px;
}
</style>

<style>
* {
  text-align: left;
}

html, body {
  margin: 0;
  padding: 0;
  background-color: #fff;
  color: #555;
}
</style>