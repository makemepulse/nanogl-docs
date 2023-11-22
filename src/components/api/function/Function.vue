<template>
  <div
    v-if="!isConstructor && !isFullPage"
    :class="`${headingComponent}-container flex gap-8 items-baseline`"
  >
    <component
      :is="headingComponent"
      :id="func.id ? `item-${func.id}` : ''"
      class="no-margin"
    >
      {{ name }}
    </component>
    <Tags v-if="func.tags.length" :tags="func.tags" />
  </div>
  <div :class="{ 'pl-24': !isConstructor && !isFullPage }">
    <CodeWrapper>
      <span class="token function">{{ func.name }}</span>
      <TypeParams
        v-if="func.typeParams?.length"
        :params="func.typeParams"
      />
      <span class="token punctuation">
        {{  '(' }}
      </span>
      <template v-for="param, index in func.params">
        <span class="token param">{{ param.name }}</span>
        <span
          v-if="param.optional"
          class="token boolean">
          {{ '?' }}
        </span>
        <template v-if="param.type">
          <span class="token punctuation">
            {{ ': ' }}
          </span>
          <Type :data="param.type" is-code/>
        </template>
        <span
          v-if="index + 1 < func.params.length"
          class="token punctuation"
        >
          {{ ', ' }}
        </span>
      </template>
      <span class="token punctuation">
        {{  ')' }}
      </span>
      <template v-if="func.type && !isConstructor">
        <span class="token punctuation">
          {{ ' : ' }}
        </span>
        <Type :data="func.type" is-code />
      </template>
    </CodeWrapper>
    <Comment v-if="func.comment" :comment="func.comment" class="my-16" />
    <div v-if="func.typeParams?.length" class="my-16">
      <component
        :is="paramsHeadingComponent"
        :id="isFullPage ? `${func.name}-type-params` : ''"
      >
        Type parameters
      </component>
      <div class="space-y-24">
        <Variable
          v-for="typeParam in func.typeParams"
          :id="typeParam.id"
          :name="typeParam.name"
          :type="typeParam.type"
          :comment="typeParam.comment"
          :tags="typeParam.tags"
          :default-type="typeParam.default"
        />
      </div>
    </div>
    <div v-if="func.params" class="my-16">
      <component
        :is="paramsHeadingComponent"
        :id="isFullPage ? `${func.name}-params` : ''"
      >
        Parameters
      </component>
      <div class="space-y-24">
        <Variable
          v-for="param in func.params"
          :id="param.id"
          :name="param.name"
          :type="param.type"
          :comment="param.comment"
          :tags="param.tags"
          :default-value="param.defaultValue"
        />
      </div>
    </div>
    <div  v-if="func.example" class="my-16">x"
      <component
        :is="paramsHeadingComponent"
        :id="isFullPage ? `${func.name}-params` : ''"
      >
        Example
      </component>
      <Comment :comment="func.example" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { APIFunction } from '@lib/apiData';

type Props = {
  func: APIFunction;
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
  return props.customName || props.func.name;
})

const paramsHeadingComponent = computed(() => {
  if (props.isFullPage) return 'h2';
  if (props.isConstructor) return 'h3';
  return 'h4';
});
</script>