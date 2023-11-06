<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router';

const libs = ref([]);
libs.value = import.meta.glob('./assets/data.json', { eager: true })['./assets/data.json'].libs;

const { currentRoute } = useRouter();

const currentLib = computed(() => {
  const lib = libs.value.find(lib => lib.name === currentRoute.value.params.library);
  return lib || {};
})
</script>

<template>
  <div class="app grid grid-cols-10">
    <UIMenu
      :libs="libs"
      :selected-lib="currentLib"
    />
    <div class="content col-span-8 col-start-3 px-48 pb-32">
      <RouterView :currentLib="currentLib"/>
    </div>
  </div>
</template>