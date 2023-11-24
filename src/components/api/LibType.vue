<template>
  <div class="content-wrapper" :id="`lib-type-${libType.name}`">
    <div id="introduction" class="h1-container">
      <Title
        :name="libType.name"
        :tags="libType.tags"
        :source="libType.source"
      />
    </div>
    <CodeWrapper>
      <span class="token keyword">{{ 'type ' }}</span>
      <span class="">{{ libType.name }}</span>
      <TypeParams
        v-if="libType.params?.length"
        :params="libType.params"
      />
      <span class="token punctuation">{{ ' = ' }}</span>
      <Type :data="libType.type" is-code />
    </CodeWrapper>
    <Comment v-if="libType.comment" :comment="libType.comment" />
    <Comment
      v-if="libType.example"
      title="Example"
      :comment="libType.example"
    />
    <div v-if="libType.params?.length" class="my-16">
      <h3 id="type-params">
        Type parameters
      </h3>
      <div class="space-y-24">
        <Variable
          v-for="typeParam in libType.params"
          :id="typeParam.id"
          :name="typeParam.name"
          :type="typeParam.type"
          :comment="typeParam.comment"
          :tags="typeParam.tags"
          :default-type="typeParam.default"
        />
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
        <li v-if="libType.params?.length">
          <a href="#type-params">Type parameters</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { APILibTypeSimple } from '@lib/apiData';

type Props = {
  libType: APILibTypeSimple;
};
defineProps<Props>();
</script>