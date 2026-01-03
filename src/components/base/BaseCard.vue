<template>
  <section class="base-card">
    <slot />
  </section>
</template>

<style scoped>
.base-card {
  background: var(--color-surface);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  padding: var(--space-lg);
}
</style>
