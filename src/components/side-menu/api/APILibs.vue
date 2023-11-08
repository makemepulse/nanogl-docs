<template>
  <div>
    <h2 class="my-8">Libraries</h2>
    <RouterLink
      v-for="lib in libsData"
      :to="`/${SECTIONS.API}/${lib.name}`"
      :class="{ selected: currentLib?.name === lib.name }"
    >
      {{ lib.name }}
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import { SECTIONS } from '@lib/constants';
import { useStore } from '@lib/store';

const { libsData, currentLib } = useStore();
</script>