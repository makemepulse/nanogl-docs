<template>
  <NotFound v-if="!currentLib || !currentType || !currentItem" />
  <div v-else class="page-body-toc">
    <Class
      v-if="currentType === LIB_ITEM_TYPE.CLASS"
      :lib-class="currentItem" />
    <LibFunction
      v-else-if="currentType === LIB_ITEM_TYPE.FUNCTION"
      :lib-function="currentItem" />
    <Interface
      v-else-if="currentType === LIB_ITEM_TYPE.INTERFACE"
      :lib-interface="currentItem" />
    <Enum
      v-else-if="currentType === LIB_ITEM_TYPE.ENUM"
      :lib-enum="currentItem" />
    <Interface
      v-else-if="currentType === LIB_ITEM_TYPE.TYPE && (currentItem as APILibType).useInterface"
      :lib-interface="currentItem"
      is-type />
    <LibType
      v-else-if="currentType === LIB_ITEM_TYPE.TYPE"
      :lib-type="currentItem" />
  </div>
</template>

<script setup lang="ts">
import { useStore } from '@lib/store';
import { APILibType } from '@lib/apiData';
import { LIB_ITEM_TYPE } from '@lib/constants';

const { currentLib, currentType, currentItem } = useStore();
</script>
