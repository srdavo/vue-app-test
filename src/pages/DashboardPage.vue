<template>
  <section class="stack">
    <div>
      <h1 class="page-title">Dashboard</h1>
      <p class="page-subtitle">A quick snapshot of your finances.</p>
    </div>

    <div class="dashboard-grid">
      <BaseCard>
        <h3>Total income</h3>
        <p class="metric positive">{{ formatCurrency(totals.income, currency) }}</p>
        <span class="muted">All time</span>
      </BaseCard>
      <BaseCard>
        <h3>Total expenses</h3>
        <p class="metric negative">{{ formatCurrency(totals.expense, currency) }}</p>
        <span class="muted">All time</span>
      </BaseCard>
      <BaseCard>
        <h3>Balance</h3>
        <p class="metric">{{ formatCurrency(totals.balance, currency) }}</p>
        <span class="muted">All time</span>
      </BaseCard>
    </div>

    <div class="dashboard-grid">
      <BaseCard>
        <h3>This month</h3>
        <div class="summary">
          <div>
            <p class="summary__label">Income</p>
            <p class="summary__value positive">{{ formatCurrency(currentMonthSummary.income, currency) }}</p>
          </div>
          <div>
            <p class="summary__label">Expenses</p>
            <p class="summary__value negative">{{ formatCurrency(currentMonthSummary.expense, currency) }}</p>
          </div>
          <div>
            <p class="summary__label">Balance</p>
            <p class="summary__value">{{ formatCurrency(currentMonthSummary.balance, currency) }}</p>
          </div>
        </div>
      </BaseCard>
      <BaseCard>
        <h3>Top spending categories</h3>
        <ul class="category-list">
          <li v-for="item in topCategories" :key="item.category">
            <span>{{ item.category }}</span>
            <strong>{{ formatCurrency(item.amount, currency) }}</strong>
          </li>
        </ul>
        <p v-if="topCategories.length === 0" class="muted">No expenses yet.</p>
      </BaseCard>
    </div>
  </section>
</template>

<script setup>
import BaseCard from '../components/base/BaseCard.vue';
import { computed } from 'vue';
import { useSettings } from '../composables/useSettings';
import { useTransactions } from '../composables/useTransactions';
import { formatCurrency } from '../utils/format';

const { settings } = useSettings();
const { totals, currentMonthSummary, topCategories } = useTransactions();

const currency = computed(() => settings.value.currency);
</script>

<style scoped>
.page-subtitle {
  margin: 0;
  color: var(--color-muted);
}

.dashboard-grid {
  display: grid;
  gap: var(--space-md);
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}

.metric {
  font-size: 1.75rem;
  margin: var(--space-sm) 0;
}

.metric.positive {
  color: var(--color-success);
}

.metric.negative {
  color: var(--color-danger);
}

.muted {
  color: var(--color-muted);
  font-size: var(--font-sm);
}

.summary {
  display: grid;
  gap: var(--space-md);
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
}

.summary__label {
  margin: 0;
  color: var(--color-muted);
  font-size: var(--font-sm);
}

.summary__value {
  margin: var(--space-xs) 0 0;
  font-weight: 700;
}

.summary__value.positive {
  color: var(--color-success);
}

.summary__value.negative {
  color: var(--color-danger);
}

.category-list {
  list-style: none;
  padding: 0;
  margin: var(--space-md) 0 0;
  display: grid;
  gap: var(--space-sm);
}

.category-list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
