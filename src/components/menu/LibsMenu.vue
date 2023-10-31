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
    <h2 class="my-8">Libraries</h2>
    <RouterLink
      v-for="lib in libs"
      :to="`/libraries/${lib.name}`"
      :class="{ selected: selectedLib === lib.name }"
    >
      {{ lib.name }}
    </RouterLink>
  </div>
</template>