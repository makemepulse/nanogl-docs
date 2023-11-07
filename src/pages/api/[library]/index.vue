<template>
  <NotFound v-if="!currentLib" />
  <div v-else>
    <h1>{{ currentLib.name }}</h1>
  </div>
</template>

<script setup lang="ts">
import { useStore } from '@lib/store';

const { currentLib } = useStore();
</script>
