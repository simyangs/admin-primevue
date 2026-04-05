<script setup lang="ts">
import { ref, watch, nextTick, computed } from 'vue';
import { useTabStore } from '@/stores/useTabStore';
import { storeToRefs } from 'pinia';
import { useRoute, useRouter } from 'vue-router';
import { Tabs, TabList, Tab, ContextMenu } from 'primevue';

const tabStore = useTabStore();
const route = useRoute();
const router = useRouter();
const { openTabs, activeId } = storeToRefs(tabStore);
const tabViewRef = ref<HTMLElement | null>(null);

const scrollToActiveTab = async (path: string) => {
  await nextTick();

  if (tabViewRef.value) {
    const activeTabElement = tabViewRef.value?.querySelector(`[data-path="${path}"]`);

    if (activeTabElement) {
      activeTabElement.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }
};

watch(
  () => route.path,
  async (path) => {
    console.log('addtab', path);
    tabStore.addTab({
      title: String(route.name),
      to: path,
    });
    await scrollToActiveTab(path);
  },
);

const handleClose = (id: string) => {
  tabStore.removeTab(id);
};

const handleCloseAll = () => {
  console.log('close all');
  tabStore.closeAllTabs();
};

const handleChangedTab = (value: string | number) => {
  const isExist = openTabs.value.some((t) => t.to === value);
  if (isExist && route.path !== value) {
    router.push(String(value));
  }
};

const showContext = ref();
const selectedTab = ref(null);
const contextMenu = [
  { label: '닫기', icon: 'pi pi-copy', command: () => handleClose(selectedTab?.value?.to) },
  { label: '모두닫기', icon: 'pi pi-file-edit', command: handleCloseAll },
];

const filteredContextMenu = computed(() => {
  return contextMenu.filter((t) => {
    console.log(selectedTab?.value?.to);
    if ('/' == selectedTab?.value?.to && t.label == '닫기') return false;
    return true;
  });
});

const onRightClick = (event, tab) => {
  selectedTab.value = tab;
  console.log(tab);
  showContext.value.show(event);
};
</script>

<template>
  <div ref="tabViewRef" class="tab-manager bg-white flex-shrink-0">
    <ContextMenu ref="showContext" :model="filteredContextMenu" />
    <Tabs :value="activeId" @update:value="handleChangedTab">
      <TabList
        :key="openTabs.map((t) => t.to).join(',')"
        :scrollable="true"
        :showNavigators="false"
      >
        <Tab
          v-for="tab in openTabs"
          :key="tab.to"
          :value="tab.to"
          :data-path="tab.to"
          @contextmenu.stop.prevent="onRightClick($event, tab)"
        >
          <div class="tab-label">
            <i v-if="tab.to === '/'" class="pi pi-home"></i>
            <span v-else>{{ tab.title }}</span>
            <i
              v-if="tab.to !== '/'"
              class="pi pi-times close-icon"
              @click.stop="() => handleClose(tab.to)"
            />
          </div>
        </Tab>
      </TabList>
    </Tabs>
  </div>
  <div class="p-4 flex-1 flex flex-col space-y-3 overflow-hidden">
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" :key="$route.fullPath" />
      </keep-alive>
    </router-view>
  </div>
</template>
