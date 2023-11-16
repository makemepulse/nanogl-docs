<template>
  <RouterLink
    :to="url"
    class="custom-link bg-grey-50 hover:bg-grey rounded-md transition-colors"
  >
    <div :class="{ 'flex items-center justify-between gap-16': true, 'h-full': fullHeight }">
      <div :class="{ 'flex flex-col gap-4': true, 'h-full': fullHeight }">
        <span :class="!!description ? 'font-bold text-18' : 'text-16'">
          {{ text }}
        </span>
        <span
          v-if="description"
          class="text-14"
        >
          {{ description }}
        </span>
      </div>
      <UIIcon name="arrow-right" class="text-primary w-16 h-auto flex-shrink-0" stroke />
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
type Props = {
  url: string;
  text: string;
  description?: string;
  fullHeight?: boolean;
};
withDefaults(defineProps<Props>(), {
  fullHeight: false
});
</script>