<script setup>
defineProps({
  libClass: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <h1>{{ libClass.name }}<span v-if="libClass.source.length"> - <a :href="libClass.source" target="_blank">source</a></span></h1>
  <p>{{ libClass.comment }}</p>
  <div v-if="libClass.constructors.length">
    <hr>
    <h2>Constructors</h2>
    <div v-for="constructor in libClass.constructors">
      <h4>{{ constructor.name }}<span v-if="constructor.source?.length"> - <a :href="constructor.source" target="_blank">source</a></span></h4>
      <p>{{ constructor.comment }}</p>
    </div>
  </div>
  <div v-if="libClass.properties.length">
    <hr>
    <h2>Properties</h2>
    <div v-for="property in libClass.properties">
      <h4>{{ property.name }}<span v-if="property.type"> : {{ property.type }} </span><span v-if="property.source?.length"> - <a :href="property.source" target="_blank">source</a></span></h4>
      <p>{{ property.comment }}</p>
      <p v-if="property.defaultValue"><i>Default value : {{ property.defaultValue }}</i></p>
    </div>
  </div>
  <div v-if="libClass.accessors.length">
    <hr>
    <h2>Accessors</h2>
    <div v-for="accessor in libClass.accessors">
      <h4>{{ accessor.name }}<span v-if="accessor.source?.length"> - <a :href="accessor.source" target="_blank">source</a></span></h4>
      <p>{{ accessor.comment }}</p>
    </div>
  </div>
  <div v-if="libClass.methods.length">
    <hr>
    <h2>Methods</h2>
    <div v-for="method in libClass.methods">
      <h4>
        {{ method.name }}
        (<span v-if="method.params"><span v-for="param, index in method.params">{{ param.name }}<span v-if="param.optional">?</span>: {{ param.type }}<span v-if="index + 1 < method.params.length">, </span></span></span>)
        <span v-if="method.type"> : {{ method.type }} </span>
        <span v-if="method.source?.length"> - <a :href="method.source" target="_blank">source</a></span>
      </h4>
      <p>{{ method.comment }}</p>
      <i v-if="method.params">
        <p v-for="param in method.params">{{ param.name }}<span v-if="param.optional"> (optional) </span><span v-if="param.type"> : {{ param.type }}</span> - {{ param.comment }}</p>
      </i>
    </div>
  </div>
</template>

<style scoped>
</style>
