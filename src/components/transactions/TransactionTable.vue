<template>
  <div class="table-wrapper">
    <table class="transaction-table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Type</th>
          <th>Category</th>
          <th>Note</th>
          <th class="align-right">Amount</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in transactions" :key="item.id">
          <td>{{ formatDate(item.date) }}</td>
          <td>
            <span class="pill" :class="item.type === 'income' ? 'pill--income' : 'pill--expense'">
              {{ item.type }}
            </span>
          </td>
          <td>{{ item.category }}</td>
          <td>{{ item.note || '—' }}</td>
          <td class="align-right">
            {{ formatCurrency(item.amount, currencySymbol) }}
          </td>
          <td class="actions">
            <button type="button" class="link" @click="openEdit(item)">Edit</button>
            <button type="button" class="link link--danger" @click="openDelete(item)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-if="transactions.length === 0" class="empty-state">No transactions found.</p>
  </div>
</template>

<script setup>
import { useModal } from '../../composables/useModal';
import { formatCurrency, formatDate } from '../../utils/format';

const props = defineProps({
  transactions: {
    type: Array,
    default: () => []
  },
  currencySymbol: {
    type: String,
    default: '$'
  }
});

const modal = useModal();

const openEdit = (transaction) => {
  modal.open('transaction-form', { mode: 'edit', transaction });
};

const openDelete = (transaction) => {
  modal.open(
    'confirm-action',
    {
      title: 'Delete transaction',
      message: `Delete ${transaction.category} on ${formatDate(transaction.date)}?`,
      confirmText: 'Delete',
      action: 'delete',
      id: transaction.id
    },
    { closeOnOverlay: false }
  );
};
</script>

<style scoped>
.table-wrapper {
  display: grid;
  gap: var(--space-md);
}

.transaction-table {
  width: 100%;
  border-collapse: collapse;
  font-size: var(--font-sm);
}

.transaction-table th,
.transaction-table td {
  text-align: left;
  padding: 12px 8px;
  border-bottom: 1px solid var(--color-border);
}

.transaction-table th {
  color: var(--color-muted);
  font-weight: 600;
}

.align-right {
  text-align: right;
}

.actions {
  display: flex;
  gap: var(--space-sm);
  justify-content: flex-end;
}

.link {
  border: none;
  background: transparent;
  color: var(--color-primary-dark);
  cursor: pointer;
  font-weight: 600;
}

.link--danger {
  color: var(--color-danger);
}

.pill {
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 0.75rem;
  text-transform: capitalize;
  font-weight: 600;
}

.pill--income {
  background: #dcfce7;
  color: #166534;
}

.pill--expense {
  background: #fee2e2;
  color: #991b1b;
}

.empty-state {
  margin: 0;
  color: var(--color-muted);
}

@media (max-width: 720px) {
  .transaction-table {
    display: block;
    overflow-x: auto;
  }
}
</style>
