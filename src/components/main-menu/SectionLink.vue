<template>
  <div
    class="relative"
    @mouseenter="mouseEnter"
    @mouseleave="mouseLeave"
  >
    <RouterLink
      :to="`/${section}`"
      :class="[
        'flex justify-start items-center font-bold hover:text-primary',
        currentSection === section ? 'selected text-primary' : ''
      ]"
    >
      <span class="text-18">{{ name }}</span>
      <span v-if="subMenu" class="relative ml-8">
        <UIIcon
          name="arrow-down"
          :class="{
            'h-10 w-auto': true,
            'rotate-180 translate-y-1/4': isHovered
          }"
        />
      </span>
    </RouterLink>
    <div
      v-if="isHovered && subMenu"
      class="absolute top-full pt-4 left-1/2 -translate-x-1/2 w-fit"
    >
      <div class="flex flex-col bg-light-grey rounded-md p-4">
        <RouterLink
          v-for="link in subMenu"
          :to="link.path"
          :class="[
            'rounded-md px-8 py-6 whitespace-nowrap text-14',
            isSubmenuSelected(link.path) ? 'bg-primary-5 text-primary' : 'hover:bg-white-5'
          ]"
        >
          {{ link.name }}
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export type SubMenuItem = {
  name: string;
  path: string;
}
</script>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { useStore } from '@lib/store';

const { currentSection } = useStore();
const { currentRoute } =useRouter();

const isSubmenuSelected = (path) => {
  const currentPath = currentRoute.value.path
  return currentPath === path ||
    currentPath.startsWith(`${path}/`)
}

defineProps({
  name: {
    type: String,
    required: true
  },
  section: {
    type: String,
    required: true
  },
  subMenu: {
    type: Array<SubMenuItem>,
    required: false,
  }
})


const isHovered = ref(false);

const mouseEnter = () => {
  isHovered.value = true;
}

const mouseLeave = () => {
  isHovered.value = false;
}
</script>