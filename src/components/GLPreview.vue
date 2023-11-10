<template>
  <canvas
    ref="canvasRef"
    :class="[
      'w-full bg-grey-50 rounded-md',
      fillParent ? 'h-full' : 'aspect-[4/3] my-16',
      isValid ? 'block' : 'hidden'
    ]">
  </canvas>
</template>

<script lang="ts">
const FOLDERS = ['guide'];
const NAMES = ['add-movement', 'creating-a-scene'];
</script>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  folder: {
    type: String,
    required: true
  },
  fillParent: {
    type: Boolean,
    default: false
  }
})

const canvasRef= ref<HTMLCanvasElement | null>();

const isValid = ref<boolean>(false);
const stop = ref<() => void | null>(null);

const isValidFolder = () => {
  return FOLDERS.includes(props.folder);
}

const isValidName = () => {
  return NAMES.includes(props.name);
}

const setup = async () => {
  if (!isValidFolder() || isValidName()) return;

  const module = await import(`@gl-preview/${props.folder}/${props.name}.js`);

  if (!module.preview || !canvasRef.value) return;

  isValid.value = true;
  stop.value = module.preview(canvasRef.value);
}

onMounted(() => {
  setup();
})

onBeforeUnmount(() => {
  if (stop.value) stop.value();
})
</script>