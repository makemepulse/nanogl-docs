<template>
  <div
    :id="!hasTitle ? `item-${method.id}` : ''"
    :class="{ 'scroll-mt-72 ': !hasTitle }"
  >
    <Tags :tags="method.tags"/>
    <pre class="language-ts flex">
      <code class="language-ts flex flex-wrap">
        <span class="token function">{{ method.name }}</span>
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
    <div v-if="method.params" class="my-16">
      <h2 v-if="isFullPage" :id="`${method.name}-params`">Parameters</h2>
      <h3 v-else-if="isConstructor">Parameters</h3>
      <h4 v-else>Parameters</h4>
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
import { APIMethod } from '@lib/apiData';

type Props = {
  method: APIMethod;
  isConstructor?: boolean;
  isFullPage?: boolean;
  hasTitle?: boolean;
  showSource?: boolean;
};
withDefaults(defineProps<Props>(), {
  isConstructor: false,
  isFullPage: false,
  hasTitle: false,
  showSource: false,
});
</script>