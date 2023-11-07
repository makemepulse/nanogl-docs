<template>
  <div class="fixed top-0 left-0 w-screen h-64 z-10 bg-grey">
    <div class="h-full w-full max-w-screen-2xl mx-auto px-20 flex items-center justify-between">
      <h1 class="text-32">
        <RouterLink class="logo opacity-100" to="/">
          nanogl
        </RouterLink>
      </h1>
      <div class="flex gap-32">
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

const { guideList, libsData } = useStore();

const sections = [
  {
    name: 'Guide',
    slug: SECTIONS.GUIDE,
    subMenu: guideList.value.map(guide => ({
      name: guide.name,
      path: guide.articles[0].route.path
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
</script>