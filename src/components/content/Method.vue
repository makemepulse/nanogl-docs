<template>
  <div :id="`method-${method.name}`">
    <h4>
      {{ method.name }}(<span v-if="method.params"><span v-for="param, index in method.params">{{ param.name }}<span v-if="param.optional">?</span>: {{ param.type }}<span v-if="index + 1 < method.params.length">, </span></span></span>)
      <span v-if="method.type && !isConstructor"> : {{ method.type }} </span>
      <span v-if="method.source?.length"> - <a :href="method.source" target="_blank">source</a></span>
    </h4>
    <p>{{ method.comment }}</p>
    <i v-if="method.params">
      <p v-for="param in method.params">{{ param.name }}<span v-if="param.optional"> (optional) </span><span v-if="param.type"> : {{ param.type }}</span> - {{ param.comment }}</p>
    </i>
  </div>
</template>

<script setup>
defineProps({
  method: {
    type: Object,
    required: true
  },
  isConstructor: {
    type: Boolean,
    required: false,
    default: false
  }
})
</script>