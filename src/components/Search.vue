<template>
  <input ref="input" />
</template>

<script setup lang="ts">
import { useStore } from '@lib/store';
import { onMounted, onUnmounted, ref } from 'vue';

const input = ref<HTMLInputElement | null>();
const { libsData } = useStore();

onMounted(() => {
  input.value.addEventListener('input', onInputChange);
});

onUnmounted(() => {
  input.value.removeEventListener('input', onInputChange);
})

const onInputChange = () => {
  console.log(input.value.value, libsData.value.filter((lib) => lib.name.includes(input.value.value)));
}
</script>