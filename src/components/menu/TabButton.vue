<template>
  <RouterLink
    :to="`/${tab}`"
    :class="[
      'w-full flex justify-start items-start',
      selectedTab === tab ? 'selected font-bold' : ''
    ]"
  >
    <span class="text-18">{{ name }}</span>
  </RouterLink>
</template>

<script setup>
defineProps({
  tab: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  selectedTab: {
    type: String,
    required: true
  },
})
</script>