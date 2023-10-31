<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const guideRoutes = router.getRoutes().reduce((acc, route) => {
  if (!route.meta.menuGuide || !route.meta.menuSection) return acc;

  const sectionName = route.meta.menuSection;
  const section = acc[sectionName] ? [...acc[sectionName]] : [];
  const article = { route, name: route.meta.menuName};
  const menuOrder = route.meta.menuOrder === null || route.meta.menuOrder === undefined
    ? section.length
    : route.meta.menuOrder;

  section[menuOrder] = article;

  return {
    ...acc,
    [sectionName]: section
  };
}, {})
</script>

<template>
  <div>
    <h2 class="my-4">Guide</h2>
    <div v-for="(articles, section) in guideRoutes">
      <h3 class="my-2">{{ section }}</h3>
      <template v-for="article in articles">
        <RouterLink
          v-if="!!article"
          :to="article.route.path"
          :class="{ 'font-bold': router.currentRoute.value.name === article.route.name }"
        >
          {{ article.name }}
        </RouterLink>
    </template>
    </div>
  </div>
</template>