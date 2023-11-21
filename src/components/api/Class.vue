<template>
  <div class="content-wrapper" :id="`class-${libClass.name}`">
    <Extends :extendsList="libClass.extends" />
    <div id="introduction" class="h1-container flex flex-col">
      <Title
        :name="libClass.name"
        :tags="libClass.tags"
        :source="libClass.source"
      />
      <UIPill
        v-if="libClass.implements"
        class="self-start bg-grey"
        big
      >
        <span>implements <SingleType :type="libClass.implements"/></span>
      </UIPill>
    </div>
    <Comment v-if="libClass.comment" :comment="libClass.comment" />
    <Comment v-if="libClass.example" :comment="libClass.example" />
    <div v-if="libClass.constructors.length" class="mb-48">
      <h2 id="constructor">Constructor</h2>
      <div class="space-y-24">
        <Function
          v-for="constructor in libClass.constructors"
          :func="constructor"
          :isConstructor="true"
        />
      </div>
    </div>
    <div v-if="libClass.properties.length" class="mb-48">
      <h2 id="properties">Properties</h2>
      <div class="space-y-24">
        <Variable
          v-for="property in libClass.properties"
          :id="property.id"
          :name="property.name"
          :type="property.type"
          :comment="property.comment"
          :tags="property.tags"
          :default-value="property.defaultValue"
        />
      </div>
    </div>
    <div v-if="libClass.accessors.length" class="mb-48">
      <h2 id="accessors">Accessors</h2>
      <div class="space-y-32">
        <Accessor
          v-for="accessor in libClass.accessors"
          :accessor="accessor"
        />
      </div>
    </div>
    <div v-if="libClass.methods.length" class="mb-48">
      <h2 id="methods">Methods</h2>
      <div class="space-y-32">
        <div v-for="method in libClass.methods">
          <Function
            :func="method"
            heading-component="h3"
          />
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
import { APIClass } from '@lib/apiData';

type Props = {
  libClass: APIClass;
};
defineProps<Props>();
</script>
