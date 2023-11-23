<template>
  <div>
    <h3 :id="`item-${accessor.id}`">
      <CodeWrapper is-inline>
        {{ accessor.name }}
      </CodeWrapper>
    </h3>
    <div class="pl-24">
      <Comment v-if="accessor.comment" :comment="accessor.comment" />
      <div class="space-y-16">
        <div v-if="accessor.getter">
          <Function
            :func="accessor.getter"
            custom-name="Getter"
            heading-component="h4"
          />
        </div>
        <div v-if="accessor.setter">
          <Function
            :func="accessor.setter"
            custom-name="Setter"
            heading-component="h4"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { APIAccessor } from '@lib/apiData';

type Props = {
  accessor: APIAccessor;
};
defineProps<Props>();
</script>