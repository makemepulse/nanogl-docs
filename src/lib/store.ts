import { useRouter } from "vue-router";
import { computed, ref } from "vue";

import { APILib } from "@lib/apiData";
import { GuideSection } from "@lib/guideData";
import { examplesData } from "./exampleData";

const libsData = ref<APILib[]>([]);
const guideList = ref<GuideSection[]>([]);
const examplesList = ref([]);

export function useStore() {
  const router = useRouter();

  const init = () => {
    const data = import.meta.glob('../assets/data.json', { eager: true })['../assets/data.json'] as { libs: APILib[] };
    libsData.value = data.libs

    const guideRoutes = router.getRoutes().reduce((acc, route) => {
      if (!route.meta.menuGuide) return acc;

      const pathParts = route.path.slice(1).split('/');

      if (pathParts.length < 2) return acc;

      const sectionSlug = route.path.slice(1).split('/')[1];
      const sectionName = sectionSlug.charAt(0).toUpperCase() + sectionSlug.slice(1).replace(/-/g, ' ');
      const section = acc[sectionSlug] ? { ...acc[sectionSlug] } : { name: sectionName, slug: sectionSlug, articles: [] };
      const article = { route, name: route.meta.menuName as string };
      const menuOrder = route.meta.menuOrder === null || route.meta.menuOrder === undefined
        ? section.articles.length
        : route.meta.menuOrder;

      section.articles[menuOrder as number] = article;

      return {
        ...acc,
        [sectionSlug]: section
      };
    }, {} as { [key: string]: GuideSection });

    guideList.value = Object.values(guideRoutes).sort((a, b) => a.name.localeCompare(b.name));

    examplesList.value = Object.entries(examplesData).map(([category, examples]) => {
      return examples.map(example => {
        return { ...example, category }
      })
    }).flat();
  }

  const currentSection = computed(() => {
    return router.currentRoute.value.path.split('/')[1];
  })

  const currentLib = computed(() => {
    const lib = libsData.value.find(lib => lib.name === router.currentRoute.value.params.library);
    return lib || null;
  })

  const currentType = computed(() => {
    return router.currentRoute.value.params.type as string || null;
  })

  const currentItem = computed(() => {
    if (!currentLib.value) return null;

    const itemName = router.currentRoute.value.params.item;

    if (!currentType.value || !itemName) return null;

    const items = currentLib.value[currentType.value];

    if (!items) return null;

    return items.find(item => item.name === itemName) || null;
  })

  const currentExample = computed(() => {
    const example = examplesList.value.find(example => example.id === router.currentRoute.value.params.example);
    return example || null;
  })

  return {
    init,
    libsData,
    guideList,
    currentLib,
    currentType,
    currentItem,
    currentSection,
    currentExample,
  }
}