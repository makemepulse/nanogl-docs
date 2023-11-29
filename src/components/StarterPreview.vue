<template>
  <iframe
    :src="SOURCE"
    class="w-full max-w-[800px] mx-auto bg-grey-50 aspect-[4/3] my-32 rounded-md"
  >
  </iframe>
</template>

<script setup lang="ts">
const SOURCE = 'https://makemepulse.github.io/nanogl-docs/examples/triangle';
</script>