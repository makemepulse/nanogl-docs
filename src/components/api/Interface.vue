<template>
  <div class="content-wrapper mt-56 lg:mt-0" :class="libInterface.extends ? 'md:mt-16' : 'md:mt-48'" :id="`class-${libInterface.name}`">
    <Extends :extendsList="libInterface.extends" />
    <div id="introduction" class="h1-container flex flex-col">
      <Title
        :name="libInterface.name"
        :tags="libInterface.tags"
        :source="libInterface.source"
      />
      <UIPill
        v-if="libInterface.implemented"
        class="self-start bg-grey"
        big
      >
        <span>implemented by </span>
        <span v-for="(implemented, i) in libInterface.implemented">
          <SingleType :type="implemented"/>
          <span v-if="i < libInterface.implemented.length - 1">
            {{ ', ' }}
          </span>
        </span>
      </UIPill>
    </div>
    <CodeWrapper>
      <span v-if="!isType" class="token keyword">interface </span>
      <span v-else class="token keyword">type </span>
      <span>{{ libInterface.name }}</span>
    </CodeWrapper>
    <Comment v-if="libInterface.comment" :comment="libInterface.comment" />
    <Comment
      v-if="libInterface.example"
      title="Example"
      :comment="libInterface.example"
    />
    <div v-if="libInterface.properties.length" class="mb-48">
      <h2 id="properties">Properties</h2>
      <div class="space-y-24">
        <Variable
          v-for="property in libInterface.properties"
          :id="property.id"
          :name="property.name"
          :type="property.type"
          :comment="property.comment"
          :tags="property.tags"
          :default-value="property.defaultValue"
        />
      </div>
    </div>
    <div v-if="libInterface.accessors.length" class="mb-48">
      <h2 id="accessors">Accessors</h2>
      <div class="space-y-32">
        <Accessor
          v-for="accessor in libInterface.accessors"
          :accessor="accessor"
        />
      </div>
    </div>
    <div v-if="libInterface.methods.length" class="mb-48">
      <h2 id="methods">Methods</h2>
      <div class="space-y-32">
        <div v-for="method in libInterface.methods">
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
      <h2 class="my-8 toc-header">Summary</h2>
      <ul>
        <li>
          <a href="#introduction">Introduction</a>
        </li>
        <li v-if="libInterface.properties.length">
          <a href="#properties">Properties</a>
        </li>
        <li v-if="libInterface.accessors.length">
          <a href="#accessors">Accessors</a>
        </li>
        <li v-if="libInterface.methods.length">
          <a href="#methods">Methods</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { APIInterface, APILibTypeInterface } from '@lib/apiData';

type Props = {
  libInterface: APIInterface | APILibTypeInterface;
  isType?: boolean;
};
defineProps<Props>();
</script>
