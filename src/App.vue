<script setup>
import { ref } from 'vue'
import LibsList from './components/LibsList.vue'
import ExportedList from './components/ExportedList.vue';
import Class from './components/Class.vue';
import { fetchLibs } from './scripts/fetch.js';

const libs = ref([]);
libs.value = import.meta.glob('./assets/data.json', { eager: true })['./assets/data.json'].libs;
// console.log(libs.value);
fetchLibs();

const selectedLib = ref({});
const selectedExported = ref({});

function onSelectLib(lib) {
  selectedLib.value = lib;
}

function onSelectExported(exported) {
  selectedExported.value = exported;
}
</script>

<template>
  <div class="app">
    <div class="sidebar">
      <LibsList :libs="libs" @select-lib="onSelectLib" />
      <ExportedList v-if="Object.keys(selectedLib).length" :lib="selectedLib" @select-exported="onSelectExported" />
    </div>
    <div class="content">
      <Class v-if="Object.keys(selectedExported).length" :lib-class="selectedExported" />
    </div>
  </div>
</template>

<style lang="stylus">
.app {
  display: flex;
  flex-direction: row;
}

.sidebar {
  width: 300px;
  height: 100vh;
  margin: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  > div {
    padding: 10px;
    background-color: #eee;

    p {
      margin: 0;

      &:hover {
        cursor: pointer;
        font-weight: bold;
      }
    }
  }
}

.content {
  width: 100%;
  margin: 20px;
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