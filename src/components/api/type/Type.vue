<template>
  <template v-if="types.length">
    <!-- If multiple different types are accepted -->
    <template v-if="typeList && types.length > 1" >
      <TypeWrapper :type-data="typeList">
        <span v-if="typeList.listType === 'tuple'" class="token punctuation">
          {{ '[' }}
        </span>
        <template v-for="(typeData, index) in types">
          <Type
            :data="typeData"
            :isCode="isCode"
          />
          <template v-if="index < types.length - 1">
            <span v-if="typeList.listType === 'union'" class="token operator">
              {{ ' | ' }}
            </span>
            <span v-if="typeList.listType === 'intersection'" class="token operator">
              {{ ' & ' }}
            </span>
            <span v-if="typeList.listType === 'tuple'" class="token punctuation">
              {{ ', ' }}
            </span>
          </template>
        </template>
        <span v-if="typeList.listType === 'tuple'" class="token punctuation">
          {{ ']' }}
        </span>
      </TypeWrapper>
    </template>

    <!-- If it's a simple single type -->
    <template v-else>
      <SingleType
        :type="types[0]"
        :isCode="isCode"
      />
    </template>
  </template>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { APIListType, APIType } from '@lib/apiData';

type Props = {
  data: APIType;
  isCode?: boolean;
};

const props = defineProps<Props>();

const typeList = computed(() => {
  if (!props.data.hasOwnProperty('list') || !props.data.hasOwnProperty('listType')) return;
  return props.data as APIListType;
});

const types = computed(() => {
  if (!props.data) return [];
  if (typeList.value) {
    return typeList.value.list;
  }
  return [props.data];
})
</script>