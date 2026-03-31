import { reactive } from 'vue';

const layoutState = reactive({
  staticMenuInactive: false,
});

export function useLayout() {
  const toggleMenu = () => {
    layoutState.staticMenuInactive = !layoutState.staticMenuInactive;
  };

  return { layoutState, toggleMenu };
}
