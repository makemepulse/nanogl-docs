<template>
  <div class="sidebar">
    <ArticlesMenu />
    <LibsMenu
      :libs="libs"
      :selected-lib="selectedLib.name" />
    <LibItemsMenu
      v-if="Object.keys(selectedLib).length"
      :lib="selectedLib" />
  </div>
</template>

<script setup>
import LibsMenu from './LibsMenu.vue';
import ArticlesMenu from './ArticlesMenu.vue';
import LibItemsMenu from './LibItemsMenu.vue';

const props = defineProps({
  libs: {
    type: Object,
    required: true
  },
  selectedLib: {
    type: Object,
    required: true
  },
})
</script>

<style lang="stylus">
.sidebar {
  width: 300px;
  height: 100vh;
  margin: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: fixed;

  > div {
    padding: 10px;
    background-color: #eee;

    h3 {
      margin: 0 0 4px 0;
    }

    p, a {
      display block;
      margin: 0;
      text-decoration: none;
      color: black;

      &:hover {
        cursor: pointer;
        font-weight: bold;
      }
    }
  }
}
</style>