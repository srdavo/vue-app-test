<template>
  <AppShell>
    <router-view />
  </AppShell>
  <ModalHost />
</template>

<script setup>
import AppShell from './components/layout/AppShell.vue';
import ModalHost from './components/layout/ModalHost.vue';
import { provideModal } from './composables/useModal';

provideModal();
</script>
