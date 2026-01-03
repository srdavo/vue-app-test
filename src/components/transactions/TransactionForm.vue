<template>
  <form class="transaction-form" @submit.prevent="handleSubmit">
    <div class="transaction-form__grid">
      <BaseSelect v-model="form.type" label="Type" required>
        <option value="" disabled>Select type</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </BaseSelect>
      <BaseInput
        v-model="form.amount"
        label="Amount"
        type="number"
        min="0"
        step="0.01"
        placeholder="0.00"
        required
      />
      <BaseInput
        v-model="form.category"
        label="Category"
        placeholder="e.g. Rent"
        required
      />
      <BaseInput
        v-model="form.date"
        label="Date"
        type="date"
        required
      />
    </div>
    <BaseInput
      v-model="form.note"
      label="Note"
      placeholder="Optional note"
    />
    <p v-if="error" class="transaction-form__error">{{ error }}</p>
    <div class="transaction-form__actions">
      <BaseButton variant="secondary" @click.prevent="$emit('cancel')">Cancel</BaseButton>
      <BaseButton type="submit">{{ mode === 'edit' ? 'Save changes' : 'Add transaction' }}</BaseButton>
    </div>
  </form>
</template>

<script setup>
import { reactive, ref, watch } from 'vue';
import BaseButton from '../base/BaseButton.vue';
import BaseInput from '../base/BaseInput.vue';
import BaseSelect from '../base/BaseSelect.vue';

const props = defineProps({
  transaction: {
    type: Object,
    default: null
  },
  mode: {
    type: String,
    default: 'add'
  }
});

const emit = defineEmits(['save', 'cancel']);

const defaultForm = () => ({
  id: '',
  type: '',
  amount: '',
  category: '',
  note: '',
  date: ''
});

const form = reactive(defaultForm());
const error = ref('');

const hydrate = () => {
  Object.assign(form, defaultForm(), props.transaction || {});
  error.value = '';
};

watch(
  () => props.transaction,
  () => hydrate(),
  { immediate: true }
);

const handleSubmit = () => {
  const amount = Number(form.amount);
  if (!form.type || !form.category || !form.date || amount <= 0) {
    error.value = 'Please fill all required fields and enter a valid amount.';
    return;
  }
  emit('save', {
    id: form.id,
    type: form.type,
    amount,
    category: form.category.trim(),
    note: form.note.trim(),
    date: form.date
  });
};
</script>

<style scoped>
.transaction-form {
  display: grid;
  gap: var(--space-md);
}

.transaction-form__grid {
  display: grid;
  gap: var(--space-md);
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}

.transaction-form__actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--space-sm);
}

.transaction-form__error {
  color: var(--color-danger);
  margin: 0;
  font-size: var(--font-sm);
}
</style>
