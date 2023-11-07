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
      class="absolute top-full left-1/2 -translate-x-1/2 w-fit pt-16 pb-8 px-16 bg-grey rounded flex flex-col"
    >
      <RouterLink
        v-for="link in subMenu"
        :to="link.path"
        class="hover:text-primary py-4 whitespace-nowrap"
      >
        {{ link.name }}
      </RouterLink>
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

import { useStore } from '@lib/store';

const { currentSection } = useStore();

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