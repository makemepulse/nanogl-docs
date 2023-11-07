<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router';

const libs = ref([]);
libs.value = import.meta.glob('./assets/data.json', { eager: true })['./assets/data.json'].libs;

const { currentRoute } = useRouter();

const currentLib = computed(() => {
  const lib = libs.value.find(lib => lib.name === currentRoute.value.params.library);
  return lib || null;
})

const currentType = computed(() => {
  return currentRoute.value.params.type || null;
})

const currentItem = computed(() => {
  if (!currentLib.value) return null;

  const itemName = currentRoute.value.params.item;

  if (!currentType.value || !itemName) return null;

  const items = currentLib.value[currentType.value];

  if (!items) return null;

  return items.find(item => item.name === itemName) || null;
})
</script>

<template>
  <div class="app grid grid-cols-10">
    <UIMenu
      :libs="libs"
      :selected-lib="currentLib"
      :selected-type="currentType"
      :selected-item="currentItem"
    />
    <div class="content col-span-8 col-start-3 px-48 pb-32">
      <RouterView
        :current-lib="currentLib"
        :current-type="currentType"
        :current-item="currentItem"
      />
    </div>
  </div>
</template>