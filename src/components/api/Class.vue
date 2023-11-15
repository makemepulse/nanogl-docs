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
    <div id="introduction" class="h1-container flex flex-col">
      <div class="flex items-center justify-between">
        <div class="flex gap-8 items-baseline">
          <h1 class="no-margin">{{ libClass.name }}</h1>
          <Tags v-if="libClass.tags.length" :tags="libClass.tags" big />
        </div>
        <UIButton
          v-if="libClass.source.length"
          :href="libClass.source"
          text="Source"
          icon="code"
          icon-stroke
          small
        />
      </div>
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
      <div class="space-y-16">
        <Method
          v-for="constructor in libClass.constructors"
          :method="constructor"
          :isConstructor="true"
        />
      </div>
    </div>
    <div v-if="libClass.properties.length" class="mb-48">
      <h2 id="properties">Properties</h2>
      <div class="space-y-16">
        <Variable
          v-for="property in libClass.properties"
          :id="property.id"
          :name="property.name"
          :type="property.type"
          :optional="property.optional"
          :comment="property.comment"
          :tags="property.tags"
          :default-value="property.defaultValue"
        />
      </div>
    </div>
    <div v-if="libClass.accessors.length" class="mb-48">
      <h2 id="accessors">Accessors</h2>
      <div class="space-y-32">
        <div v-for="accessor in libClass.accessors">
          <h3 :id="`item-${accessor.id}`">
            <code class="language-ts inline-block">
              {{ accessor.name }}
            </code>
          </h3>
          <div class="pl-24">
            <Comment v-if="accessor.comment" :comment="accessor.comment" />
            <div class="space-y-16">
              <div v-if="accessor.getter">
                <Method
                  :method="accessor.getter"
                  custom-name="Getter"
                  heading-component="h4"
                />
              </div>
              <div v-if="accessor.setter">
                <Method
                  :method="accessor.setter"
                  custom-name="Setter"
                  heading-component="h4"
                />
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
          <Method
            :method="method"
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
