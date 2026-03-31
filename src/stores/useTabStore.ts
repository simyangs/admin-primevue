import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { AppTab, TabId } from '@/types/layout';

export const useTabStore = defineStore('tabs', () => {
  const dashboardId = 'M000';
  const openTabs = ref<AppTab[]>([{ id: dashboardId, title: '대시보드', path: '/' }]);
  const activeIndex = ref<number>(0);
  const activeId = ref<string>(dashboardId);

  // 새로운 탭 추가
  const addTab = (tab: AppTab): void => {
    const existingIndex = openTabs.value.findIndex((t) => t.id === tab.id);

    if (existingIndex === -1) {
      openTabs.value.push(tab);
      activeIndex.value = openTabs.value.length - 1;
    } else {
      activeIndex.value = existingIndex;
    }
    activeId.value = tab.id;
    console.log('active', activeId.value);
  };

  // 탭 삭제
  const removeTab = (id: TabId): void => {
    const findIndex = openTabs.value.findIndex((t) => t.id === id);
    if (findIndex > -1) {
      openTabs.value.splice(findIndex, 1);
      if (findIndex === activeIndex.value) {
        activeIndex.value = activeIndex.value - 1;
        activeId.value = openTabs.value[activeIndex.value]?.id;
      }
    }
  };

  // 모든 탭 닫기 (대시보드 제외)
  const closeAllTabs = (): void => {
    openTabs.value = [{ id: dashboardId, title: '대시보드', path: '/' }];
    activeIndex.value = 0;
  };
  return { openTabs, activeIndex, activeId, addTab, removeTab, closeAllTabs };
});
