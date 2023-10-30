<script setup>
defineProps({
  articleSections: {
    type: Object,
    required: true
  },
  selectedArticle: {
    type: String,
    required: false
  }
})

const emit = defineEmits(['selectArticle']);

function selectArticle(article) {
  emit('selectArticle', article);
}
</script>

<template>
  <div class="articleList">
    <h2>Guide</h2>
    <div v-for="articleSection in articleSections">
      <h3>{{ articleSection.name }}</h3>
      <p
        v-for="article in articleSection.articles"
        @click="selectArticle(article)"
        :class="{ selected: selectedArticle === article.id }"
      >
        {{ article.name }}
      </p>
    </div>
  </div>
</template>

<style scoped lang="stylus">
.selected {
  font-weight: bold;
}
</style>