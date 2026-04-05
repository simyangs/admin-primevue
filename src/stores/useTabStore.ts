import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { AppTab, TabId } from '@/types/layout';
import { useRouter, useRoute } from 'vue-router';

export const useTabStore = defineStore('tabs', () => {
  const dashboardTo = '/';
  const openTabs = ref<AppTab[]>([{ title: '대시보드', to: dashboardTo }]);
  const activeId = ref<string>(dashboardTo);
  const router = useRouter();
  const route = useRoute();

  // 새로운 탭 추가
  const addTab = (tab: AppTab): void => {
    const existingIndex = openTabs.value.findIndex((t) => t.to === tab.to);

    if (existingIndex === -1) {
      openTabs.value.push(tab);
    }
    if (activeId.value != tab.to) activeId.value = tab.to;
    console.log('active', activeId.value);
  };

  // 탭 삭제
  const removeTab = (id: string) => {
    console.log('remove', id);
    //openTabs.value = openTabs.value.filter((t) => t.to !== id);
    const index = openTabs.value.findIndex((t) => t.to === id);
    if (index === -1) return;
    openTabs.value.splice(index, 1);
    const isClosingActiveTab = route.path === id;

    if (isClosingActiveTab) {
      let newPath = '/';
      if (openTabs.value.length > 0) {
        newPath = openTabs.value[index + 1]?.to || openTabs.value[index - 1]?.to || dashboardTo;
      }
      console.log('remove newpath', newPath);
      activeId.value = newPath;
      router.push(newPath);
    }
  };

  // 모든 탭 닫기 (대시보드 제외)
  const closeAllTabs = (): void => {
    //openTabs.value = [{ title: '대시보드', to: dashboardTo }];
    openTabs.value.splice(1);
    activeId.value = dashboardTo;
    router.push(dashboardTo);
  };
  return { openTabs, activeId, addTab, removeTab, closeAllTabs };
});
