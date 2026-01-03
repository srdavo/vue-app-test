<template>
  <div class="confirm-dialog">
    <p class="confirm-dialog__message">{{ message }}</p>
    <div class="confirm-dialog__actions">
      <BaseButton variant="secondary" @click="$emit('cancel')">Cancel</BaseButton>
      <BaseButton variant="danger" @click="$emit('confirm')">{{ confirmText }}</BaseButton>
    </div>
  </div>
</template>

<script setup>
import BaseButton from './BaseButton.vue';

defineProps({
  message: {
    type: String,
    default: ''
  },
  confirmText: {
    type: String,
    default: 'Confirm'
  }
});

defineEmits(['confirm', 'cancel']);
</script>

<style scoped>
.confirm-dialog {
  display: grid;
  gap: var(--space-md);
}

.confirm-dialog__message {
  margin: 0;
  color: var(--color-muted);
}

.confirm-dialog__actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--space-sm);
}
</style>
