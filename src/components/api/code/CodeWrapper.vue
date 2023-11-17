<template>
  <component
    :is="wrapperComponent"
    :class="!isInline && `language-${lang} flex`">
    <code
      :class="`language-${lang} collapse-space`">
      <slot />
    </code>
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue';

type Props = {
  lang?: string,
  isInline?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  lang: 'ts'
});

const wrapperComponent = computed(() => {
  return props.isInline ? 'v-fragment' : 'pre';
})
</script>