<script setup>
defineProps({
  libs: {
    type: Object,
    required: true
  },
  selectedLib: {
    type: String,
    required: false
  }
})
</script>

<template>
  <div>
    <h2 class="my-4">Libraries</h2>
    <RouterLink
      v-for="lib in libs"
      :to="`/libraries/${lib.name}`"
      :class="{ 'font-bold': selectedLib === lib.name }"
    >
      {{ lib.name }}
    </RouterLink>
  </div>
</template>