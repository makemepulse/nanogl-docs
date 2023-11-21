<template>
  <div class="content-wrapper" :id="`enum-${libEnum.name}`">
    <div id="introduction" class="h1-container">
      <Title
        :name="libEnum.name"
        :tags="libEnum.tags"
        :source="libEnum.source"
      />
    </div>
    <CodeWrapper>
      <span class="token keyword">{{ 'enum ' }}</span>
      <span class="">{{ libEnum.name }}</span>
    </CodeWrapper>
    <div v-if="libEnum.members.length" class="mb-48">
      <h2 id="members">Members</h2>
      <div class="space-y-24">
        <Variable
          v-for="member in libEnum.members"
          :id="member.id"
          :name="member.name"
          :type="member.type"
          :comment="member.comment"
          :tags="member.tags"
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
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { APIEnum } from '@lib/apiData';

type Props = {
  libEnum: APIEnum;
};
defineProps<Props>();
</script>