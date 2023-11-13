<template>
  <div class="flex flex-col gap-4">
    <div class="inline-block">
      <code class="language-ts inline-block">
        {{ name }}
      </code>
      <span v-if="type || optional || comment || defaultValue"> : </span>
      <code v-if="type" class="language-ts inline-block">
        <Type :data="type" is-code />
      </code>
    </div>
    <div>
      <span v-if="optional">(optional) </span>
      <span v-if="comment">{{ comment }}</span>
    </div>
    <div v-if="defaultValue">
      <span>Default : </span>
      <span>{{ defaultValue }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  name: {
    type: String,
    required: true
  },
  type: {
    type: Object || Array<Object>,
    required: false
  },
  optional: {
    type: Boolean,
    required: false
  },
  comment: {
    type: String,
    required: false
  },
  defaultValue: {
    type: String,
    required: false
  }
})
</script>