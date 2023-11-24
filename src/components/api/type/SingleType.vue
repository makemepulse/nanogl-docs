<template>
  <!-- type is inline function -->
  <TypeFunction
    v-if="type.data?.function"
    :func="type.data?.function"
  />

  <!-- type is inline object -->
  <TypeObject
    v-if="type.data?.properties?.length"
    :properties="type.data?.properties"
  />

  <template v-else>
    <!-- type needs asserts -->
    <span v-if="type.data?.useAsserts" class="token keyword">
      {{ 'asserts ' }}
    </span>
    <!-- type is query -->
    <span v-if="type.isQuery" class="token keyword">
      {{ 'typeof ' }}
    </span>
    <!-- type has operator -->
    <span v-if="type.data?.operator" class="token keyword">
      {{ `${type.data?.operator} ` }}
    </span>
    <span v-if="type.isInferred" class="token keyword">
      {{ 'infer ' }}
    </span>

    <!-- ~~TYPE NAME~~ -->

    <!-- type has internal link -->
    <RouterLink
      v-if="!!url && url.isInternal"
      :class="{ 'code-link': isCode }"
      :to="url.path"
      target="_blank"
    >
      <TypeName
        :name="type.name"
        :literal-type="type.data?.literalType"
      />
    </RouterLink>
    <!-- type has external link -->
    <a
      v-else-if="!!url && !url.isInternal"
      :class="{ 'code-link': isCode }"
      :href="url.path"
      target="_blank"
    >
      <TypeName
        :name="type.name"
        :literal-type="type.data?.literalType"
      />
    </a>
    <!-- type does not have a link -->
    <TypeName
      v-else
      :name="type.name"
      :literal-type="type.data?.literalType"
    />

    <!-- ~~TYPE NAME~~ -->

    <!-- type has arguments -->
    <TypeArguments
      v-if="type.data?.arguments"
      :args="type.data?.arguments"
    />
    <!-- type is array or is indexed -->
    <template v-if="type.isArray || type.isIndexed">
      <span class="token punctuation">
        {{ '[' }}
      </span>
      <span v-if="type.data?.indexType">
        <Type :data="type.data?.indexType" is-code />
      </span>
      <span class="token punctuation">
        {{ ']' }}
      </span>
    </template>
    <!-- type is has extends type -->
    <template v-if="type.data?.extendsType">
      <span class="token keyword">{{ ' extends ' }}</span>
      <Type :data="type.data?.extendsType" is-code />
    </template>
    <!-- type is has conditional types -->
    <template v-if="type.data?.conditionalTypes?.length > 1">
      <span class="token operator">{{ ' ? ' }}</span>
      <Type :data="type.data?.conditionalTypes[0]" is-code />
      <span class="token operator">{{ ' : ' }}</span>
      <Type :data="type.data?.conditionalTypes[1]" is-code />
    </template>
    <!-- type is has target type -->
    <template v-if="type.data?.targetType">
      <span class="token keyword">{{ ' is ' }}</span>
      <Type :data="type.data?.targetType" is-code />
    </template>
  </template>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { APISingleType } from '@lib/apiData';
import { getLibItemType } from '@lib/utils';

type Props = {
  type: APISingleType;
  isCode?: boolean;
};

const props = defineProps<Props>();

const itemType = computed(() => {
  return getLibItemType(props.type.kind);
})

const url = computed(() => {
  if (props.type.lib && props.type.name && itemType.value) {
    return {
      path: `/api/${props.type.lib}/${itemType.value}/${props.type.name}`,
      isInternal: true
    }
  }

  if (props.type.source) {
    return {
      path: props.type.source,
      isInternal: false
    };
  }

  return null
})
</script>