<template>
  <div :id="`method-${method.name}`">
    <pre class="language-ts flex">
      <code class="language-ts flex flex-wrap">
        <span class="token function">{{ method.name }}</span>
        <span class="token punctuation">(</span>
        <template v-for="param, index in method.params">
          <span class="token param">{{ param.name }}</span>
          <span v-if="param.optional" class="token boolean">?</span>
          <span v-if="param.type" class="flex w-fit">
            <span class="token punctuation">:</span><span class="token type"> {{ param.type }}</span>
          </span>
          <span v-if="index + 1 < method.params.length" class="token punctuation">, </span>
        </template>
        <span class="token punctuation">)</span>
        <span v-if="method.type && !isConstructor" class="flex">
          <span class="token punctuation"> : </span>
          <span class="token type">{{ method.type }}</span>
        </span>
      </code>
    </pre>
    <p v-if="method.comment" class="my-16">{{ method.comment }}</p>
    <div v-if="method.params" class="my-16">
      <h2 v-if="isFullPage" :id="`method-${method.name}-params`">Parameters</h2>
      <h4 v-else>Parameters</h4>
      <div class="space-y-16">
        <Variable
          v-for="param in method.params"
          :name="param.name"
          :type="param.type"
          :optional="param.optional"
          :comment="param.comment"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  method: {
    type: Object,
    required: true
  },
  isConstructor: {
    type: Boolean,
    required: false,
    default: false
  },
  isFullPage: {
    type: Boolean,
    required: false,
    default: false
  }
})
</script>