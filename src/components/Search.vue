<template>
  <Teleport to="body">
    <div class="search-wrapper" ref="wrapper">
      <div class="search-background" ref="background"></div>
      <div class="search-content">
        <div class="search-input">
          <input ref="input" placeholder="Search..." />
          <div ref="close">
            <UIIcon name="close" />
          </div>
        </div>
        <div class="search-results">
          <h2>{{ results.length }} results</h2>
          <div class="search-results-list">
            <div class="search-result" v-for="result in results" @click="onClickClose">
              <RouterLink :to="result.element.url">
                <h3>{{ result.element.name }}</h3>
                <p v-if="result.element.description">{{ result.element.description }}</p>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { useStore } from '@lib/store';
import { onMounted, onUnmounted, ref } from 'vue';

const input = ref<HTMLInputElement | null>();
const { libsData } = useStore();

const wrapper = ref<HTMLDivElement | null>();
const background = ref<HTMLDivElement | null>();
const close = ref<HTMLDivElement | null>();

enum SearchElementType {
  LIBRARY,
  CLASS,
  FUNCTION,
  INTERFACE,
  TYPE,
  ENUM,
}

enum SearchElementOrder {
  LIBRARY,
  NAME,
  DESCRIPTION,
}

type SearchElement = {
  name: string,
  description?: string,
  url: string,
  type: SearchElementType
}

type ResultElement = {
  element: SearchElement,
  order: SearchElementOrder
}

const searchElements: SearchElement[] = [];
const results = ref<ResultElement[]>([]);

onMounted(() => {
  input.value.addEventListener('input', onInputChange);
  close.value.addEventListener('click', onClickClose);
  background.value.addEventListener('click', onClickClose);
  libsData.value.forEach((lib) => {
    searchElements.push({
      name: lib.name,
      description: lib.description,
      type: SearchElementType.LIBRARY,
      url: `/api/${lib.name}`
    })
    
    lib.classes.forEach((libClass) => {
      searchElements.push({
        name: libClass.name,
        description: libClass.comment,
        type: SearchElementType.CLASS,
        url: `/api/${lib.name}/classes/${libClass.name}`
      })
    })
    
    lib.functions.forEach((libFunction) => {
      searchElements.push({
        name: libFunction.name,
        description: libFunction.comment,
        type: SearchElementType.FUNCTION,
        url: `/api/${lib.name}/functions/${libFunction.name}`
      })
    })
    
    lib.interfaces.forEach((libInterface) => {
      searchElements.push({
        name: libInterface.name,
        description: libInterface.comment,
        type: SearchElementType.FUNCTION,
        url: `/api/${lib.name}/interfaces/${libInterface.name}`
      })
    })
    
    lib.types.forEach((libType) => {
      searchElements.push({
        name: libType.name,
        description: libType.comment,
        type: SearchElementType.TYPE,
        url: `/api/${lib.name}/types/${libType.name}`
      })
    })
    
    lib.enumerations.forEach((libEnum) => {
      searchElements.push({
        name: libEnum.name,
        description: libEnum.comment,
        type: SearchElementType.ENUM,
        url: `/api/${lib.name}/enumerations/${libEnum.name}`
      })
    })
  })
});

onUnmounted(() => {
  input.value.removeEventListener('input', onInputChange);
  close.value.removeEventListener('click', onClickClose);
  background.value.removeEventListener('click', onClickClose);
})

const onInputChange = () => {
  const value = input.value.value.toLocaleLowerCase();
  if (value === '') results.value = [];
  else {
    results.value = searchElements
    .filter((el) => el.name.toLocaleLowerCase().includes(value) || el.description?.toLocaleLowerCase().includes(value))
    .map((el) => {
      if (el.name.toLocaleLowerCase().includes(value)) {
        return {
          element: el,
          order: el.name.startsWith('nanogl') ? SearchElementOrder.LIBRARY : SearchElementOrder.NAME,
        }
      }
      else if (el.description?.toLocaleLowerCase().includes(value)) {
        return {
          element: el,
          order: SearchElementOrder.DESCRIPTION
        }
      }
    })
    .sort((a, b) => a.order - b.order);
  }
}

const onClickClose = () => {
  if (wrapper.value.classList.contains('opened')) {
    wrapper.value.classList.remove('opened');
    input.value.value = '';
    results.value = [];
    document.body.classList.remove('search');
  }
}
</script>