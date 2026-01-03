<template>
  <div class="filters">
    <BaseSelect v-model="typeValue" label="Type">
      <option value="">All types</option>
      <option value="income">Income</option>
      <option value="expense">Expense</option>
    </BaseSelect>
    <BaseSelect v-model="categoryValue" label="Category">
      <option value="">All categories</option>
      <option v-for="category in categories" :key="category" :value="category">
        {{ category }}
      </option>
    </BaseSelect>
    <BaseInput v-model="searchValue" label="Search" placeholder="Search notes or categories" />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import BaseInput from '../base/BaseInput.vue';
import BaseSelect from '../base/BaseSelect.vue';

const props = defineProps({
  type: {
    type: String,
    default: ''
  },
  category: {
    type: String,
    default: ''
  },
  search: {
    type: String,
    default: ''
  },
  categories: {
    type: Array,
    default: () => []
  }
});

const emit = defineEmits(['update:type', 'update:category', 'update:search']);

const typeValue = computed({
  get: () => props.type,
  set: (value) => emit('update:type', value)
});

const categoryValue = computed({
  get: () => props.category,
  set: (value) => emit('update:category', value)
});

const searchValue = computed({
  get: () => props.search,
  set: (value) => emit('update:search', value)
});
</script>

<style scoped>
.filters {
  display: grid;
  gap: var(--space-md);
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}
</style>
