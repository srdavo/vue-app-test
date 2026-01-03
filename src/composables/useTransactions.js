import { computed, ref, watch } from 'vue';
import { KEYS, read, write, remove } from '../services/storage';
import { createId, getCurrentMonthKey, parseDate } from '../utils/format';

const seedTransactions = [
  {
    id: createId(),
    type: 'income',
    amount: 3200,
    category: 'Salary',
    note: 'Monthly paycheck',
    date: '2024-09-01'
  },
  {
    id: createId(),
    type: 'expense',
    amount: 1200,
    category: 'Rent',
    note: 'September rent',
    date: '2024-09-03'
  },
  {
    id: createId(),
    type: 'expense',
    amount: 180,
    category: 'Groceries',
    note: 'Weekly groceries',
    date: '2024-09-05'
  },
  {
    id: createId(),
    type: 'income',
    amount: 250,
    category: 'Freelance',
    note: 'Side project',
    date: '2024-09-10'
  }
];

const transactions = ref([]);

const loadTransactions = () => {
  const stored = read(KEYS.transactions, null);
  if (!stored || stored.length === 0) {
    transactions.value = seedTransactions;
    write(KEYS.transactions, transactions.value);
    return;
  }
  transactions.value = stored;
};

const addTransaction = (payload) => {
  transactions.value = [
    { ...payload, id: createId() },
    ...transactions.value
  ];
};

const updateTransaction = (payload) => {
  transactions.value = transactions.value.map((item) =>
    item.id === payload.id ? { ...payload } : item
  );
};

const deleteTransaction = (id) => {
  transactions.value = transactions.value.filter((item) => item.id !== id);
};

const resetTransactions = () => {
  transactions.value = [];
  remove(KEYS.transactions);
};

const totals = computed(() => {
  const income = transactions.value
    .filter((item) => item.type === 'income')
    .reduce((sum, item) => sum + item.amount, 0);
  const expense = transactions.value
    .filter((item) => item.type === 'expense')
    .reduce((sum, item) => sum + item.amount, 0);
  return {
    income,
    expense,
    balance: income - expense
  };
});

const currentMonthSummary = computed(() => {
  const currentKey = getCurrentMonthKey();
  const currentMonthItems = transactions.value.filter((item) => {
    const key = item.date.slice(0, 7);
    return key === currentKey;
  });
  const income = currentMonthItems
    .filter((item) => item.type === 'income')
    .reduce((sum, item) => sum + item.amount, 0);
  const expense = currentMonthItems
    .filter((item) => item.type === 'expense')
    .reduce((sum, item) => sum + item.amount, 0);
  return {
    income,
    expense,
    balance: income - expense
  };
});

const topCategories = computed(() => {
  const map = new Map();
  transactions.value
    .filter((item) => item.type === 'expense')
    .forEach((item) => {
      map.set(item.category, (map.get(item.category) || 0) + item.amount);
    });
  return Array.from(map.entries())
    .map(([category, amount]) => ({ category, amount }))
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 5);
});

const sortedTransactions = computed(() => {
  return [...transactions.value].sort((a, b) => {
    const dateDiff = parseDate(b.date) - parseDate(a.date);
    if (dateDiff !== 0) return dateDiff;
    return b.amount - a.amount;
  });
});

watch(
  transactions,
  (value) => {
    write(KEYS.transactions, value);
  },
  { deep: true }
);

loadTransactions();

export function useTransactions() {
  return {
    transactions,
    sortedTransactions,
    totals,
    currentMonthSummary,
    topCategories,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    resetTransactions
  };
}
