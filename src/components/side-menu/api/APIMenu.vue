<template>
  <APILibItems v-if="currentLib"/>
  <APILibs v-else/>
</template>

<script setup lang="ts">
import { useStore } from '@lib/store';

const { currentLib } = useStore();
</script>