import { ref } from 'vue';

const isSidebarCollapsed = ref(false);

export function useLayout() {
  const toggleMenu = () => {
    isSidebarCollapsed.value = !isSidebarCollapsed.value;
  };

  return { isSidebarCollapsed, toggleMenu };
}
