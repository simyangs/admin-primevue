<script setup lang="ts">
import { ref, watch, nextTick } from 'vue';
import { useTabStore } from '@/stores/useTabStore';
import { storeToRefs } from 'pinia';
import { useRoute, useRouter } from 'vue-router';
import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';

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

const handleChangedTab = (value: string | number) => {
  const isExist = openTabs.value.some((t) => t.to === value);
  if (isExist && route.path !== value) {
    router.push(String(value));
  }
};
</script>

<template>
  <div ref="tabViewRef" class="tab-manager">
    <Tabs :value="activeId" @update:value="handleChangedTab">
      <TabList
        :key="openTabs.map((t) => t.to).join(',')"
        :scrollable="true"
        :showNavigators="false"
      >
        <Tab v-for="tab in openTabs" :key="tab.to" :value="tab.to" :data-path="tab.to">
          <div class="tab-label">
            <span>{{ tab.title }}</span>
            <i
              v-if="tab.to !== '/'"
              class="pi pi-times close-icon"
              @click.stop="() => handleClose(tab.to)"
            />
          </div>
        </Tab>
      </TabList>
    </Tabs>
    <div class="tab-content-area">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" :key="$route.fullPath" />
        </keep-alive>
      </router-view>
    </div>
  </div>
</template>
