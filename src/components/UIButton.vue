<template>
  <a
    :href="href"
    target="_blank"
    class="custom-link bg-light-grey rounded-md overflow-hidden pointer-events-auto"
  >
    <div :class="[
      'hover:bg-white-5 flex items-center justify-center transition-colors',
      small ? 'gap-6 px-8 py-4' : 'gap-8 px-12 py-8'
    ]">
      <UIIcon
        v-if="!!icon"
        :name="icon"
        :class="['w-auto', small ? 'h-16' : 'h-20']"
        :stroke="iconStroke"
      />
      <span :class="small ? 'text-14 font-medium' : 'text-16 font-bold'">
        {{ text }}
      </span>
    </div>
  </a>
</template>

<script setup lang="ts">
import { Icon } from './UIIcon.vue';

type Props = {
  href: string;
  text: string;
  icon?: Icon;
  iconStroke?: boolean;
  small?: boolean;
}
defineProps<Props>();
</script>