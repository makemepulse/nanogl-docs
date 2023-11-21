<template>
  <div class="content-wrapper" :id="`lib-type-${libType.name}`">
    <div id="introduction" class="h1-container">
      <Title
        :name="libType.name"
        :tags="libType.tags"
        :source="libType.source"
      />
    </div>
    <CodeWrapper>
      <span class="token keyword">{{ 'type ' }}</span>
      <span class="">{{ libType.name }}</span>
      <span class="token punctuation">{{ ' = ' }}</span>
      <Type :data="libType.type" is-code />
    </CodeWrapper>
  </div>
  <div class="toc-wrapper">
    <div class="toc">
      <h2>Summary</h2>
      <ul>
        <li>
          <a href="#introduction">Introduction</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { APILibTypeSimple } from '@lib/apiData';

type Props = {
  libType: APILibTypeSimple;
};
defineProps<Props>();
</script>