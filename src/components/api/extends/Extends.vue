<template>
  <div
    v-if="extendsList && extendsList.length"
    class="flex flex-row-reverse justify-end flex-wrap gap-x-8"
  >
    <p v-for="extendsNode in extendsList">
      <SingleType :type="extendsNode"/>
      <span> →</span>
    </p>
  </div>
</template>

<script setup lang="ts">
import { APISingleType } from '@lib/apiData';

type Props = {
  extendsList?: APISingleType[];
};
defineProps<Props>();
</script>