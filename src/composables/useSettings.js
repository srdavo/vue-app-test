import { ref, watch } from 'vue';
import { KEYS, read, write, remove } from '../services/storage';

const defaultSettings = {
  currency: '$'
};

const settings = ref(read(KEYS.settings, defaultSettings));

const updateCurrency = (currency) => {
  settings.value = { ...settings.value, currency };
};

const resetSettings = () => {
  settings.value = { ...defaultSettings };
  remove(KEYS.settings);
};

watch(
  settings,
  (value) => {
    write(KEYS.settings, value);
  },
  { deep: true }
);

export function useSettings() {
  return {
    settings,
    updateCurrency,
    resetSettings
  };
}
