<template>
  <section class="stack">
    <div>
      <h1 class="page-title">About</h1>
      <p class="page-subtitle">A simple Vue 3 finance tracker built to keep you on budget.</p>
    </div>

    <BaseCard>
      <p>
        This project demonstrates a lightweight personal finance tracker built with Vue 3, Vite, and
        Vue Router. It stores data locally on your device and keeps your information private.
      </p>
      <ul>
        <li>Track income and expenses with detailed notes.</li>
        <li>Review totals and current month insights.</li>
        <li>Customize your currency and reset data anytime.</li>
      </ul>
    </BaseCard>
  </section>
</template>

<script setup>
import BaseCard from '../components/base/BaseCard.vue';
</script>

<style scoped>
.page-subtitle {
  margin: 0;
  color: var(--color-muted);
}

ul {
  margin: var(--space-md) 0 0;
  padding-left: 18px;
  color: var(--color-muted);
}
</style>
