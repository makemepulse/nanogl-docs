<template>
  <NotFound v-if="!currentLib || !currentType || !currentItem" />
  <div v-else class="page-body-toc">
    <Class
      v-if="currentType === 'classes'"
      :lib-class="currentItem" />
    <LibFunction
      v-else-if="currentType === 'functions'"
      :lib-function="currentItem" />
  </div>
</template>

<script setup lang="ts">
import { useStore } from '@lib/store';

const { currentLib, currentType, currentItem } = useStore();
</script>
