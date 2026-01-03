import { inject, provide, reactive, readonly } from 'vue';

const modalSymbol = Symbol('modal');

export function provideModal() {
  const state = reactive({
    isOpen: false,
    name: '',
    payload: null,
    options: { closeOnOverlay: true }
  });

  const open = (name, payload = null, options = {}) => {
    state.isOpen = true;
    state.name = name;
    state.payload = payload;
    state.options = { closeOnOverlay: true, ...options };
  };

  const close = () => {
    state.isOpen = false;
    state.name = '';
    state.payload = null;
    state.options = { closeOnOverlay: true };
  };

  provide(modalSymbol, { state: readonly(state), open, close });

  return { state, open, close };
}

export function useModal() {
  const modal = inject(modalSymbol);
  if (!modal) {
    throw new Error('Modal provider is missing.');
  }
  return modal;
}
