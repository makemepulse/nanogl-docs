<template>
  <div>
    <h2 class="my-8">Guide</h2>
    <div v-for="section in guideList">
      <h3 class="mt-8 mb-4">{{ section.name }}</h3>
      <template v-for="article in section.articles">
        <RouterLink
          v-if="!!article"
          :to="article.route.path"
          :class="{ selected: currentRoute.name === article.route.name }"
        >
          {{ article.name }}
        </RouterLink>
    </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useStore } from "@lib/store";

const { guideList } = useStore();
const { currentRoute } = useRouter();
</script>