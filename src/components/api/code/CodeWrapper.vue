<template>
  <component
    :is="wrapperComponent"
    :class="!isInline && `language-${lang} flex`">
    <code
      :class="['flex-wrap collapse-space', isInline ? 'inline-flex' : 'flex', `language-${lang}`]"
      @copy="handleCopy"
      @cut="handleCopy">
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

const handleCopy = (evt: ClipboardEvent) => {
  const selection = document.getSelection();

  if (!selection) return;

  evt.preventDefault();
  evt.clipboardData?.setData("text/plain", selection.getRangeAt(0).toString());
}
</script>