<template>
  <div>
    <h2 class="my-8">Guide</h2>
    <div v-for="section in sections">
      <h3 class="mt-8 mb-4">{{ section.name }}</h3>
      <template v-for="article in section.articles">
        <RouterLink
          v-if="!!article"
          :to="article.route.path"
          :class="{ selected: router.currentRoute.value.name === article.route.name }"
        >
          {{ article.name }}
        </RouterLink>
    </template>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const guideRoutes = router.getRoutes().reduce((acc, route) => {
  if (!route.meta.menuGuide) return acc;

  const pathParts = route.path.slice(1).split('/');

  if (pathParts.length < 2) return acc;

  const sectionSlug = route.path.slice(1).split('/')[1];
  const sectionName = sectionSlug.charAt(0).toUpperCase() + sectionSlug.slice(1).replace(/-/g, ' ');
  const section = acc[sectionSlug] ? { ...acc[sectionSlug] } : { name: sectionName, articles: [] };
  const article = { route, name: route.meta.menuName};
  const menuOrder = route.meta.menuOrder === null || route.meta.menuOrder === undefined
    ? section.length
    : route.meta.menuOrder;

  section.articles[menuOrder] = article;

  return {
    ...acc,
    [sectionSlug]: section
  };
}, {});

const sections = Object.values(guideRoutes).sort((a, b) => a.name.localeCompare(b.name));
</script>