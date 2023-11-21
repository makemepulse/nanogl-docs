<template>
  <div class="content-wrapper" :id="`enum-${libEnum.name}`">
    <div id="introduction" class="h1-container">
      <Title
        :name="libEnum.name"
        :tags="libEnum.tags"
        :source="libEnum.source"
      />
    </div>
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
import { APIEnum } from '@lib/apiData';

type Props = {
  libEnum: APIEnum;
};
defineProps<Props>();
</script>