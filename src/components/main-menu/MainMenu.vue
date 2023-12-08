<template>
  <div class="fixed top-0 left-0 w-screen h-menu bg-grey z-30">
    <div class="h-full w-full max-w-screen-2xl mx-auto px-20 flex items-center justify-between">
      <h1 class="text-32">
        <RouterLink class="logo opacity-100" to="/">
          {{ isMobile ? 'ngl' : 'nanogl' }}
        </RouterLink>
      </h1>
      <div class="flex items-center gap-20 md:gap-32">
        <div class="search-btn" ref="search">
          <p v-if="!isMobile">⌘K</p>
          <UIIcon name="search" />
        </div>
        <SectionLink
          v-for="section in sections"
          :name="section.name"
          :section="section.slug"
          :sub-menu="section.subMenu"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { SECTIONS } from '@lib/constants';

import { useStore } from '@lib/store';
import { isMobile } from '@lib/utils';
import { onMounted, onUnmounted, ref } from 'vue';

const { guideList, libsData } = useStore();

const sections = [
  {
    name: 'Guide',
    slug: SECTIONS.GUIDE,
    subMenu: guideList.value.map(guide => ({
      name: guide.name,
      path: `/${SECTIONS.GUIDE}/${guide.slug}`
    }))
  },
  {
    name: 'API',
    slug: SECTIONS.API,
    subMenu: libsData.value.map(lib => ({
      name: lib.name,
      path: `/${SECTIONS.API}/${lib.name}`
    }))
  },
  {
    name: 'Examples',
    slug: SECTIONS.EXAMPLES
  },
]

const search = ref<HTMLDivElement | null>();

onMounted(() => {
  search.value.addEventListener('click', onSearchClick);
  document.addEventListener('keydown', onKeyPress);
})

onUnmounted(() => {
  search.value.removeEventListener('click', onSearchClick);
  document.removeEventListener('keydown', onKeyPress);
})

const onKeyPress = (e) => {
  if (e.key === "k" && e.metaKey) {
    onSearchClick();
  }
}

const onSearchClick = () => {
  const searchMenu = document.getElementsByClassName('search-wrapper')[0];
  if (!searchMenu) return;
  const opened = searchMenu.classList.contains('opened');
  
  if (!opened) {
    searchMenu.classList.add('opened');
    document.body.classList.add('search');
  }
}
</script>