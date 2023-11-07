<template>
  <div>
    <h2 class="my-8">{{lib.name}}</h2>
    <div v-if="lib.classes.length">
      <h3 class="mt-8 mb-4">Classes</h3>
      <LibItem
        v-for="libClass in lib.classes"
        type="classes"
        :library-name="lib.name"
        :item-name="libClass.name"
        :selected-type="selectedType"
        :selected-item-name="selectedItem?.name"
      />
    </div>
    <div v-if="lib.functions.length">
      <h3 class="mt-8 mb-4">Functions</h3>
      <LibItem
        v-for="libFunc in lib.functions"
        type="functions"
        :library-name="lib.name"
        :item-name="libFunc.name"
        :selected-type="selectedType"
        :selected-item-name="selectedItem?.name"
      />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  lib: {
    type: Object,
    required: true
  },
  selectedType: {
    type: String,
    required: false
  },
  selectedItem: {
    type: Object,
    required: false
  }
})
</script>