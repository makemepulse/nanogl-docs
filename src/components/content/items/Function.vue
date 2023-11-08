<template>
  <div class="content-wrapper" :id="`function-${libFunction.name}`">
    <h1 id="introduction" class="flex gap-8 items-baseline">
      <span>{{ libFunction.name }}</span>
      <span v-if="libFunction.source.length" class="text-16">
        <a :href="libFunction.source" target="_blank">source</a>
      </span>
    </h1>
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
          <a :href="`#method-${libFunction.name}-params`">Parameters</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  libFunction: {
    type: Object,
    required: true
  }
})
</script>
