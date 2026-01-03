<template>
  <BaseModal
    v-if="modal.state.isOpen"
    :title="modalTitle"
    :close-on-overlay="modal.state.options.closeOnOverlay"
    @close="modal.close"
  >
    <component
      :is="activeComponent"
      v-if="activeComponent"
      v-bind="componentProps"
      @cancel="modal.close"
      @confirm="handleConfirm"
      @save="handleSave"
    />
  </BaseModal>
</template>

<script setup>
import { computed } from 'vue';
import { useModal } from '../../composables/useModal';
import { useTransactions } from '../../composables/useTransactions';
import { useSettings } from '../../composables/useSettings';
import BaseModal from '../base/BaseModal.vue';
import ConfirmDialog from '../base/ConfirmDialog.vue';
import TransactionForm from '../transactions/TransactionForm.vue';

const modal = useModal();
const { addTransaction, updateTransaction, deleteTransaction, resetTransactions } = useTransactions();
const { resetSettings } = useSettings();

const modalTitle = computed(() => {
  if (modal.state.name === 'transaction-form') {
    return modal.state.payload?.mode === 'edit'
      ? 'Edit transaction'
      : 'Add transaction';
  }
  if (modal.state.name === 'confirm-action') {
    return modal.state.payload?.title || 'Confirm action';
  }
  return 'Modal';
});

const activeComponent = computed(() => {
  if (modal.state.name === 'transaction-form') {
    return TransactionForm;
  }
  if (modal.state.name === 'confirm-action') {
    return ConfirmDialog;
  }
  return null;
});

const componentProps = computed(() => {
  if (modal.state.name === 'transaction-form') {
    return {
      transaction: modal.state.payload?.transaction || null,
      mode: modal.state.payload?.mode || 'add'
    };
  }
  if (modal.state.name === 'confirm-action') {
    return {
      message: modal.state.payload?.message || '',
      confirmText: modal.state.payload?.confirmText || 'Confirm'
    };
  }
  return {};
});

const handleSave = (payload) => {
  if (modal.state.payload?.mode === 'edit') {
    updateTransaction(payload);
  } else {
    addTransaction(payload);
  }
  modal.close();
};

const handleConfirm = () => {
  const action = modal.state.payload?.action;
  if (action === 'delete') {
    deleteTransaction(modal.state.payload?.id);
  }
  if (action === 'reset') {
    resetTransactions();
    resetSettings();
  }
  modal.close();
};
</script>
