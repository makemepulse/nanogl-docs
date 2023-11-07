<template>
  <div class="fixed grid grid-cols-10 w-full h-screen pointer-events-none">
    <div class="menu h-full overflow-auto scrollbar col-span-2 px-20 py-32 flex flex-col gap-24 pointer-events-auto bg-black">
      <h1>
        <RouterLink class="logo opacity-100" to="/">
          nanogl
        </RouterLink>
      </h1>
      <MenuTabs :selected-tab="selectedTab" />
      <hr class="opacity-25">
      <div class="flex flex-col gap-20">
        <GuideTab v-if="selectedTab === TABS.GUIDE"/>
        <DocsTab
          v-if="selectedTab === TABS.DOCS"
          :libs="libs"
          :selected-lib="selectedLib"
          :selected-type="selectedType"
          :selected-item="selectedItem" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';

import { TABS } from './MenuTabs.vue';

defineProps({
  libs: {
    type: Object,
    required: true
  },
  selectedLib: {
    type: Object,
    required: false
  },
  selectedType: {
    type: String,
    required: false
  },
  selectedItem: {
    type: Object,
    required: false
  },
})

const { currentRoute } = useRouter();

const selectedTab = computed(() => {
  return currentRoute.value.path.split('/')[1];
})
</script>