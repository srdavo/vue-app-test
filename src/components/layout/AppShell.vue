<template>
  <div class="app-shell">
    <AppHeader />
    <main class="app-shell__content">
      <div class="container">
        <slot />
      </div>
    </main>
  </div>
</template>

<script setup>
import AppHeader from './AppHeader.vue';
</script>

<style scoped>
.app-shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-shell__content {
  flex: 1;
  padding: var(--space-xl) 0;
}
</style>
