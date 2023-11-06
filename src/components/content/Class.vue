<template>
  <div :id="`class-${libClass.name}`" class="py-32 border-b">
    <p v-if="libClass.extends">{{ libClass.extends }} →</p>
    <h1>{{ libClass.name }}<span v-if="libClass.source.length"> - <a :href="libClass.source" target="_blank">source</a></span></h1>
    <p>{{ libClass.comment }}</p>
    <div v-if="libClass.constructors.length">
      <hr>
      <h2>Constructor</h2>
      <div class="space-y-32">
        <Method v-for="constructor in libClass.constructors" :method="constructor" :isConstructor="true" />
      </div>
    </div>
    <div v-if="libClass.properties.length">
      <hr>
      <h2>Properties</h2>
      <div class="space-y-32">
        <div v-for="property in libClass.properties">
          <h4>{{ property.name }}<span v-if="property.type"> : {{ property.type }} </span><span v-if="property.source?.length"> - <a :href="property.source" target="_blank">source</a></span></h4>
          <p>{{ property.comment }}</p>
          <p v-if="property.defaultValue"><i>Default value : {{ property.defaultValue }}</i></p>
        </div>
      </div>
    </div>
    <div v-if="libClass.accessors.length">
      <hr>
      <h2>Accessors</h2>
      <div class="space-y-32">
        <div v-for="accessor in libClass.accessors">
          <h4>{{ accessor.name }}<span v-if="accessor.source?.length"> - <a :href="accessor.source" target="_blank">source</a></span></h4>
          <p>{{ accessor.comment }}</p>
          <div class="space-y-16">
            <div v-if="accessor.setter">
              <h4>Setter :</h4>
              <Method :method="accessor.setter" />
            </div>
            <div v-if="accessor.getter">
              <h4>Getter :</h4>
              <Method :method="accessor.getter" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="libClass.methods.length">
      <hr>
      <h2>Methods</h2>
      <div class="space-y-32">
        <Method v-for="method in libClass.methods" :method="method" />
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  libClass: {
    type: Object,
    required: true
  }
})
</script>
