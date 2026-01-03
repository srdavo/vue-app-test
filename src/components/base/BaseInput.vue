<template>
  <label class="base-field">
    <span v-if="label" class="base-field__label">{{ label }}</span>
    <input
      class="base-field__input"
      v-bind="$attrs"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </label>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    default: ''
  },
  modelValue: {
    type: [String, Number],
    default: ''
  }
});
</script>

<style scoped>
.base-field {
  display: grid;
  gap: var(--space-xs);
  font-size: var(--font-sm);
  color: var(--color-muted);
}

.base-field__label {
  font-weight: 600;
}

.base-field__input {
  padding: 10px 12px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--color-border);
  background: #fff;
  color: var(--color-text);
}

.base-field__input:focus {
  outline: 2px solid rgba(59, 130, 246, 0.3);
  border-color: var(--color-primary);
}
</style>
