<script setup lang="ts">
import { useStore } from '@lib/store';
import { useMarkdown } from '@lib/markdown';
import { isMobile } from '@lib/utils';
import { onMounted, onUnmounted, ref } from 'vue';

const { init: initStore } = useStore();
const { init: initMarkdown } = useMarkdown();

initStore();
initMarkdown();

const app = ref<HTMLDivElement | null>();

onMounted(() => {
  if (isMobile.value) {
    app.value.addEventListener('click', onClickContent);
  }
})

onUnmounted(() => {
  if (isMobile.value) {
    app.value.removeEventListener('click', onClickContent);
  }
})

const onClickContent = (e) => {
  const toc = document.getElementsByClassName('toc')[0];
  const tocHeader = document.getElementsByClassName('toc-header')[0];
  if (!toc || !tocHeader) return;

  const opened = toc.classList.contains('opened');
  
  if (tocHeader.contains(e.target) || tocHeader === e.target) {
    if (opened) {
      toc.classList.remove('opened');
    } else {
      toc.classList.add('opened');
    }
  } else {
    if (opened) {
      toc.classList.remove('opened');
    }
  }
}
</script>

<template>
  <div class="app relative w-full max-w-screen-2xl mx-auto" ref="app">
    <MainMenu />
    <div class="grid grid-cols-10 mt-menu">
      <SideMenu />
      <div class="content relative">
        <RouterView />
      </div>
    </div>
  </div>
</template>