<template>
  <div class="content-wrapper" :id="`function-${libFunction.name}`">
    <div id="introduction" class="h1-container flex items-center justify-between">
      <div class="flex gap-8 items-baseline">
        <h1 class="no-margin">{{ libFunction.name }}</h1>
        <Tags :tags="libFunction.tags"/>
      </div>
      <UIButton
        v-if="libFunction.source.length"
        :href="libFunction.source"
        text="Source"
        icon="code"
        icon-stroke
        small
      />
    </div>
    <Method :method="libFunction" is-full-page />
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
import { APIFunction } from '@lib/apiData';

type Props = {
  libFunction: APIFunction;
};
defineProps<Props>();
</script>
