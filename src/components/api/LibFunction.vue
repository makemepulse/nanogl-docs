<template>
  <div class="content-wrapper" :id="`function-${libFunction.name}`">
    <div id="introduction" class="h1-container">
      <Title
        :name="libFunction.name"
        :tags="libFunction.tags"
        :source="libFunction.source"
      />
    </div>
    <Function :func="libFunction" is-full-page />
  </div>
  <div class="toc-wrapper">
    <div class="toc">
      <h2>Summary</h2>
      <ul>
        <li>
          <a href="#introduction">Introduction</a>
        </li>
        <li v-if="libFunction.params">
          <a :href="`#${libFunction.name}-params`">Parameters</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { APILibFunction } from '@lib/apiData';

type Props = {
  libFunction: APILibFunction;
};
defineProps<Props>();
</script>
