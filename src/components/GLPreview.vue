<template>
  <canvas
    ref="canvasRef"
    :class="[
      'w-full bg-grey-50',
      folder === 'examples' ? 'h-full' : 'aspect-[4/3] my-16 rounded-md',
      isValid ? 'block' : 'hidden'
    ]">
  </canvas>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { useStore } from "@lib/store";

const { examplesNames } = useStore();
const FOLDERS = ['guide', 'examples'];
const NAMES = ['add-movement', 'creating-a-scene', 'full-screen-shader', 'load-gltf-model', 'load-gltf-model-lights', ...examplesNames.value];

type Props = {
  name: typeof NAMES[number];
  folder: typeof FOLDERS[number];
};

const props = defineProps<Props>();

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
  if (!isValidFolder() || !isValidName()) return;

  const module = await import(`@gl-preview/${props.folder}/${props.name}.js`);

  if (!module.preview || !canvasRef.value) return;

  isValid.value = true;
  stop.value = module.preview(canvasRef.value);
}

const unmount = () => {
  if (stop.value) stop.value();
}

onMounted(() => {
  setup();
})

onBeforeUnmount(() => {
  unmount();
})

watch(() => props.name, (newName) => {
  unmount();
  setup();
})
</script>