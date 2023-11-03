<template>
  <div class="flex flex-col">
    <TabButton :tab="TABS.GUIDE" name="Guide" :selected-tab="selectedTab"/>
    <TabButton :tab="TABS.DOCS" name="Docs" :selected-tab="selectedTab"/>
  </div>
</template>

<script lang="ts">
export enum TABS {
  GUIDE = 'guide',
  DOCS = 'docs'
}
</script>

<script lang="ts" setup>
defineProps({
  selectedTab: {
    type: String,
    required: true
  },
})
</script>