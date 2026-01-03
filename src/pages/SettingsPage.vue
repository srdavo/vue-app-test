<template>
  <section class="stack">
    <div>
      <h1 class="page-title">Settings</h1>
      <p class="page-subtitle">Personalize your tracker and manage stored data.</p>
    </div>

    <BaseCard class="stack">
      <BaseSelect v-model="currency" label="Currency symbol">
        <option value="$">$ (USD)</option>
        <option value="MXN$">MXN$ (Peso)</option>
        <option value="€">€ (EUR)</option>
        <option value="£">£ (GBP)</option>
      </BaseSelect>
    </BaseCard>

    <BaseCard class="stack">
      <div>
        <h3>Reset data</h3>
        <p class="page-subtitle">Clear all transactions and settings from local storage.</p>
      </div>
      <BaseButton variant="danger" @click="confirmReset">Reset all data</BaseButton>
    </BaseCard>
  </section>
</template>

<script setup>
import { computed } from 'vue';
import BaseButton from '../components/base/BaseButton.vue';
import BaseCard from '../components/base/BaseCard.vue';
import BaseSelect from '../components/base/BaseSelect.vue';
import { useModal } from '../composables/useModal';
import { useSettings } from '../composables/useSettings';

const modal = useModal();
const { settings, updateCurrency } = useSettings();

const currency = computed({
  get: () => settings.value.currency,
  set: (value) => updateCurrency(value)
});

const confirmReset = () => {
  modal.open(
    'confirm-action',
    {
      title: 'Reset all data',
      message: 'This will remove all transactions and reset settings to defaults.',
      confirmText: 'Reset',
      action: 'reset'
    },
    { closeOnOverlay: false }
  );
};
</script>

<style scoped>
.page-subtitle {
  margin: 0;
  color: var(--color-muted);
}
</style>
