<template>
  <div class="content-wrapper" :id="`class-${libClass.name}`">
    <div
      v-if="libClass.extends && libClass.extends.length"
      class="flex flex-row-reverse justify-end flex-wrap gap-x-8"
    >
      <p v-for="extendsNode in libClass.extends">
        <SingleType :type="extendsNode"/>
        <span> →</span>
      </p>
    </div>
    <h1 id="introduction" class="flex gap-8 items-baseline">
      <span>{{ libClass.name }}</span>
      <span v-if="libClass.source.length" class="text-16">
        <a :href="libClass.source" target="_blank">source</a>
      </span>
    </h1>
    <p v-if="libClass.comment">{{ libClass.comment }}</p>
    <div v-if="libClass.constructors.length" class="mb-48">
      <h2 id="constructor">Constructor</h2>
      <div class="space-y-16">
        <Method v-for="constructor in libClass.constructors" :method="constructor" :isConstructor="true" />
      </div>
    </div>
    <div v-if="libClass.properties.length" class="mb-48">
      <h2 id="properties">Properties</h2>
      <div class="space-y-16">
        <Variable
          v-for="property in libClass.properties"
          :name="property.name"
          :type="property.type"
          :optional="property.optional"
          :comment="property.comment"
          :source="property.source"
          :default-value="property.defaultValue"
        />
      </div>
    </div>
    <div v-if="libClass.accessors.length" class="mb-48">
      <h2 id="accessors">Accessors</h2>
      <div class="space-y-32">
        <div v-for="accessor in libClass.accessors">
          <h3>
            <code class="language-ts inline-block">
              {{ accessor.name }}
            </code>
          </h3>
          <div class="pl-24">
            <p v-if="accessor.comment">{{ accessor.comment }}</p>
            <div class="space-y-16">
              <div v-if="accessor.getter">
                <h4>Getter</h4>
                <div class="pl-24">
                  <Method :method="accessor.getter" />
                </div>
              </div>
              <div v-if="accessor.setter">
                <h4>Setter</h4>
                <div class="pl-24">
                  <Method :method="accessor.setter" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="libClass.methods.length" class="mb-48">
      <h2 id="methods">Methods</h2>
      <div class="space-y-32">
        <div v-for="method in libClass.methods">
          <h3>{{ method.name }}</h3>
          <Method :method="method" class="pl-24" />
        </div>
      </div>
    </div>
  </div>
  <div class="toc-wrapper">
    <div class="toc">
      <h2>Summary</h2>
      <ul>
        <li>
          <a href="#introduction">Introduction</a>
        </li>
        <li v-if="libClass.constructors.length">
          <a href="#constructor">Constructor</a>
        </li>
        <li v-if="libClass.properties.length">
          <a href="#properties">Properties</a>
        </li>
        <li v-if="libClass.accessors.length">
          <a href="#accessors">Accessors</a>
        </li>
        <li v-if="libClass.methods.length">
          <a href="#methods">Methods</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  libClass: {
    type: Object,
    required: true
  }
})
</script>
