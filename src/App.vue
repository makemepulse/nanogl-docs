<script setup>
import { ref } from 'vue'

import { fetchLibs } from './scripts/fetch.js';
import { articlesData } from './articles/articlesData.js';

import Class from './components/content/Class.vue';
import Article from './components/content/Article.vue';
import LibsList from './components/menu/LibsList.vue'
import ArticleList from './components/menu/ArticleList.vue';
import ExportedList from './components/menu/ExportedList.vue';

const libs = ref([]);
libs.value = import.meta.glob('./assets/data.json', { eager: true })['./assets/data.json'].libs;
// console.log(libs.value);
fetchLibs();

const articleSections = ref(articlesData);

const selectedArticle = ref({});
const selectedLib = ref({});
const selectedExported = ref({});

function onSelectArticle(article) {
  selectedArticle.value = article;
  selectedLib.value = {};
  selectedExported.value = {};
}

function onSelectLib(lib) {
  selectedLib.value = lib;
  selectedArticle.value = {};
}

function onSelectExported(exported) {
  selectedExported.value = exported;
  selectedArticle.value = {};
}

</script>

<template>
  <div class="app">
    <div class="sidebar">
      <ArticleList
        :article-sections="articleSections"
        :selected-article="selectedArticle.id"
        @select-article="onSelectArticle" />
      <LibsList
        :libs="libs"
        :selected-lib="selectedLib.name"
        @select-lib="onSelectLib" />
      <ExportedList
        v-if="Object.keys(selectedLib).length"
        :lib="selectedLib"
        :selected-exported="selectedExported.name"
        @select-exported="onSelectExported" />
    </div>
    <div class="content">
      <Article v-if="Object.keys(selectedArticle).length" :article="selectedArticle" />
      <Class v-else-if="Object.keys(selectedExported).length" :lib-class="selectedExported" />
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

    h3 {
      margin: 0 0 4px 0;
    }

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