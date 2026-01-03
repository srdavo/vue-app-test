<template>
  <button
    class="base-button"
    :class="variantClass"
    :type="type"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  variant: {
    type: String,
    default: 'primary'
  },
  type: {
    type: String,
    default: 'button'
  },
  disabled: {
    type: Boolean,
    default: false
  }
});

const variantClass = computed(() => `base-button--${props.variant}`);
</script>

<style scoped>
.base-button {
  border: none;
  border-radius: var(--radius-sm);
  padding: 10px 16px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.1s ease, background 0.2s ease;
}

.base-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.base-button:active {
  transform: scale(0.98);
}

.base-button--primary {
  background: var(--color-primary);
  color: #fff;
}

.base-button--primary:hover:not(:disabled) {
  background: var(--color-primary-dark);
}

.base-button--secondary {
  background: #eef2ff;
  color: var(--color-primary-dark);
}

.base-button--danger {
  background: #fee2e2;
  color: var(--color-danger);
}

.base-button--ghost {
  background: transparent;
  color: var(--color-muted);
}
</style>
