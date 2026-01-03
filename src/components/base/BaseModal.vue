<template>
  <div class="modal-overlay" @click="onOverlayClick">
    <div
      ref="dialogRef"
      class="modal"
      role="dialog"
      aria-modal="true"
      :aria-labelledby="titleId"
      @click.stop
      @keydown="onKeydown"
      tabindex="-1"
    >
      <header class="modal__header">
        <h2 :id="titleId" class="modal__title">{{ title }}</h2>
        <button class="modal__close" type="button" @click="$emit('close')">
          ✕
        </button>
      </header>
      <div class="modal__content">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';

const props = defineProps({
  title: {
    type: String,
    default: 'Modal'
  },
  closeOnOverlay: {
    type: Boolean,
    default: true
  }
});

const emit = defineEmits(['close']);

const dialogRef = ref(null);
const titleId = `modal-title-${Math.random().toString(16).slice(2)}`;

const onOverlayClick = () => {
  if (props.closeOnOverlay) {
    emit('close');
  }
};

const onKeydown = (event) => {
  if (event.key === 'Escape') {
    event.stopPropagation();
    event.preventDefault();
    emit('close');
    return;
  }

  if (event.key !== 'Tab') return;
  const focusable = dialogRef.value?.querySelectorAll(
    'a[href], button:not([disabled]), textarea, input, select, [tabindex="0"]'
  );
  if (!focusable || focusable.length === 0) return;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
};

onMounted(() => {
  document.body.style.overflow = 'hidden';
  requestAnimationFrame(() => {
    dialogRef.value?.focus();
    const focusable = dialogRef.value?.querySelectorAll(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex="0"]'
    );
    focusable?.[0]?.focus?.();
  });
});

onBeforeUnmount(() => {
  document.body.style.overflow = '';
});
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.4);
  display: grid;
  place-items: center;
  padding: var(--space-lg);
  z-index: 1000;
}

.modal {
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  width: min(560px, 100%);
  box-shadow: var(--shadow-sm);
  display: grid;
  gap: var(--space-md);
  outline: none;
}

.modal__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-lg) var(--space-lg) 0;
}

.modal__title {
  margin: 0;
  font-size: var(--font-lg);
}

.modal__close {
  border: none;
  background: transparent;
  font-size: 1.2rem;
  cursor: pointer;
}

.modal__content {
  padding: 0 var(--space-lg) var(--space-lg);
}
</style>
