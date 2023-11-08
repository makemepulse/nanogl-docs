<template>
  <div>
    <h2 class="my-8">Examples</h2>
    <div v-for="(examples, category) in examplesData">
      <h3 class="mt-8 mb-4">{{ category }}</h3>
      <template v-for="example in examples">
        <RouterLink
          v-if="!!example"
          :to="`/${SECTIONS.EXAMPLES}/${example.id}`"
          :class="{ selected: currentExample?.id === example.id }"
        >
          {{ example.name }}
        </RouterLink>
      </template>
    </div>
  </div>
</template>

<script setup>
import { SECTIONS } from '@lib/constants';
import { examplesData } from "@lib/exampleData";
import { useStore } from '@lib/store';

const { currentExample } = useStore();
</script>
