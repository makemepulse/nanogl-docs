<template>
  <div
    v-if="!isConstructor && !isFullPage"
    :class="`${headingComponent}-container flex gap-8 items-baseline`"
  >
    <component
      :is="headingComponent"
      :id="method.id ? `item-${method.id}` : ''"
      class="no-margin"
    >
      {{ name }}
    </component>
    <Tags v-if="method.tags.length" :tags="method.tags" />
  </div>
  <div :class="{ 'pl-24': !isConstructor && !isFullPage }">
    <pre class="language-ts flex">
      <code class="language-ts flex flex-wrap">
        <span class="token function">{{ method.name }}</span>
        <template v-if="method.typeParams?.length">
          <span class="token punctuation">&lt;</span>
          <span v-for="(typeParam, i) in method.typeParams" class="token type inline-flex">
            <span>{{ typeParam.name + (i < method.typeParams.length - 1 ? ', ' : '') }}</span>
          </span>
          <span class="token punctuation">></span>
        </template>
        <span class="token punctuation">(</span>
        <template v-for="param, index in method.params">
          <span class="token param">{{ param.name }}</span>
          <span v-if="param.optional" class="token boolean">?</span>
          <span v-if="param.type" class="flex w-fit">
            <span class="token punctuation">: </span>
            <span class="token type inline-flex">
              <Type :data="param.type" is-code/>
            </span>
          </span>
          <span v-if="index + 1 < method.params.length" class="token punctuation">, </span>
        </template>
        <span class="token punctuation">)</span>
        <span v-if="method.type && !isConstructor" class="flex">
          <span class="token punctuation"> : </span>
          <span class="token type inline-flex">
            <Type :data="method.type" is-code />
          </span>
        </span>
      </code>
    </pre>
    <Comment v-if="method.comment" :comment="method.comment" class="my-16" />
    <Comment v-if="method.example" :comment="method.example" class="my-16" />
    <div v-if="method.typeParams" class="my-16">
      <component
        :is="paramsHeadingComponent"
        :id="isFullPage ? `${method.name}-type-params` : ''"
      >
        Type parameters
      </component>
      <div class="space-y-16">
        <Variable
          v-for="typeParam in method.typeParams"
          :id="typeParam.id"
          :name="typeParam.name"
          :type="typeParam.type"
          :comment="typeParam.comment"
          :tags="typeParam.tags"
          :default-type="typeParam.default"
        />
      </div>
    </div>
    <div v-if="method.params" class="my-16">
      <component
        :is="paramsHeadingComponent"
        :id="isFullPage ? `${method.name}-params` : ''"
      >
        Parameters
      </component>
      <div class="space-y-16">
        <Variable
          v-for="param in method.params"
          :id="param.id"
          :name="param.name"
          :type="param.type"
          :optional="param.optional"
          :comment="param.comment"
          :tags="param.tags"
          :default-value="param.defaultValue"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { APIMethod } from '@lib/apiData';

type Props = {
  method: APIMethod;
  isConstructor?: boolean;
  isFullPage?: boolean;
  showSource?: boolean;
  customName?: string;
  headingComponent?: 'h1' | 'h2' | 'h3' | 'h4';
};
const props = withDefaults(defineProps<Props>(), {
  isConstructor: false,
  isFullPage: false,
  showSource: false,
  headingComponent: 'h4',
});

const name = computed(() => {
  return props.customName || props.method.name;
})

const paramsHeadingComponent = computed(() => {
  if (props.isFullPage) return 'h2';
  if (props.isConstructor) return 'h3';
  return 'h4';
});
</script>