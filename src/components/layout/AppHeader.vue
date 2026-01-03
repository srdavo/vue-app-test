<template>
  <header class="app-header">
    <div class="container app-header__content">
      <div class="app-header__brand">
        <span class="app-header__logo">💸</span>
        <span class="app-header__title">Finance Tracker</span>
      </div>
      <nav class="app-header__nav">
        <RouterLink to="/" class="app-header__link" active-class="app-header__link--active">
          Dashboard
        </RouterLink>
        <RouterLink to="/transactions" class="app-header__link" active-class="app-header__link--active">
          Transactions
        </RouterLink>
        <RouterLink to="/settings" class="app-header__link" active-class="app-header__link--active">
          Settings
        </RouterLink>
        <RouterLink to="/about" class="app-header__link" active-class="app-header__link--active">
          About
        </RouterLink>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { RouterLink } from 'vue-router';
</script>

<style scoped>
.app-header {
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
}

.app-header__content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-md) 0;
  flex-wrap: wrap;
  gap: var(--space-md);
}

.app-header__brand {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  font-weight: 700;
}

.app-header__logo {
  font-size: 1.5rem;
}

.app-header__nav {
  display: flex;
  gap: var(--space-md);
  flex-wrap: wrap;
}

.app-header__link {
  color: var(--color-muted);
  font-weight: 600;
  padding-bottom: 4px;
  border-bottom: 2px solid transparent;
}

.app-header__link--active {
  color: var(--color-primary-dark);
  border-color: var(--color-primary-dark);
}
</style>
