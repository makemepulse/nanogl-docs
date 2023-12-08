<template>
  <div class="menu top-menu h-full-menu overflow-auto scrollbar col-span-2 py-32 px-20 flex flex-col gap-24 pointer-events-auto" ref="menu">
    <div class="flex flex-col gap-20">
      <GuideMenu v-if="currentSection === SECTIONS.GUIDE" />
      <APIMenu v-if="currentSection === SECTIONS.API" />
      <ExamplesMenu v-if="currentSection === SECTIONS.EXAMPLES" />
    </div>
  </div>
  <div class="open-menu" ref="openMenu"><UIIcon name="menu" /> Menu</div>
</template>

<script setup lang="ts">
import { useStore } from '@lib/store';
import { SECTIONS } from '@lib/constants';
import { onMounted, onUnmounted, ref } from 'vue';
import { isTablet } from '@lib/utils';

const { currentSection } = useStore();

const menu = ref<HTMLDivElement | null>();
const openMenu = ref<HTMLDivElement | null>();

onMounted(() => {
  if (isTablet.value) {
    openMenu.value.addEventListener('click', onOpenMenu);
    document.body.addEventListener('click', onClickBody);
  }
});

onUnmounted(() => {
  if (isTablet.value) {
    openMenu.value.removeEventListener('click', onOpenMenu);
    document.body.removeEventListener('click', onClickBody);
  }
});

const onOpenMenu = () => {
  if (!menu.value) return;
  const opened = menu.value.classList.contains('opened');
  
  if (!opened) {
    menu.value.classList.add('opened');
  }
}

const onClickBody = (e) => {
  if (!menu.value) return;
  const opened = menu.value.classList.contains('opened');
  
  if (!openMenu.value.contains(e.target) && openMenu.value !== e.target) {
    if (opened) {
      menu.value.classList.remove('opened');
    }
  }
}
</script>