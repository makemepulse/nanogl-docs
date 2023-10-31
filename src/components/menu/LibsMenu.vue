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
  <div class="libsMenu">
    <h2>Libraries</h2>
    <RouterLink
      v-for="lib in libs"
      :to="`/libraries/${lib.name}`"
      :class="{ selected: selectedLib === lib.name }"
    >
      {{ lib.name }}
    </RouterLink>
  </div>
</template>

<style scoped lang="stylus">
.selected {
  font-weight: bold;
}
</style>