<template>
  <section class="stack">
    <div class="page-header">
      <div>
        <h1 class="page-title">Transactions</h1>
        <p class="page-subtitle">Track income and expenses with details.</p>
      </div>
      <BaseButton @click="openAdd">Add transaction</BaseButton>
    </div>

    <BaseCard>
      <TransactionFilters
        v-model:type="filters.type"
        v-model:category="filters.category"
        v-model:search="filters.search"
        :categories="categories"
      />
    </BaseCard>

    <BaseCard>
      <TransactionTable :transactions="filteredTransactions" :currency-symbol="currency" />
    </BaseCard>
  </section>
</template>

<script setup>
import { computed, reactive } from 'vue';
import BaseButton from '../components/base/BaseButton.vue';
import BaseCard from '../components/base/BaseCard.vue';
import TransactionFilters from '../components/transactions/TransactionFilters.vue';
import TransactionTable from '../components/transactions/TransactionTable.vue';
import { useModal } from '../composables/useModal';
import { useSettings } from '../composables/useSettings';
import { useTransactions } from '../composables/useTransactions';

const modal = useModal();
const { settings } = useSettings();
const { sortedTransactions } = useTransactions();

const filters = reactive({
  type: '',
  category: '',
  search: ''
});

const categories = computed(() => {
  const set = new Set(sortedTransactions.value.map((item) => item.category));
  return Array.from(set).sort();
});

const filteredTransactions = computed(() => {
  const searchTerm = filters.search.trim().toLowerCase();
  return sortedTransactions.value.filter((item) => {
    const matchesType = filters.type ? item.type === filters.type : true;
    const matchesCategory = filters.category ? item.category === filters.category : true;
    const matchesSearch = searchTerm
      ? item.note.toLowerCase().includes(searchTerm) || item.category.toLowerCase().includes(searchTerm)
      : true;
    return matchesType && matchesCategory && matchesSearch;
  });
});

const currency = computed(() => settings.value.currency);

const openAdd = () => {
  modal.open('transaction-form', { mode: 'add', transaction: null });
};
</script>

<style scoped>
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: var(--space-md);
  flex-wrap: wrap;
}

.page-subtitle {
  margin: 0;
  color: var(--color-muted);
}
</style>
