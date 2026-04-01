<script setup lang="ts">
import { ref, watch, nextTick } from 'vue';
import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import { useTabStore } from '@/stores/useTabStore';
import { storeToRefs } from 'pinia';
import { useRoute, useRouter } from 'vue-router';

const tabStore = useTabStore();
const route = useRoute();
const router = useRouter();
const { openTabs, activeId } = storeToRefs(tabStore);
const tabViewRef = ref<HTMLElement | null>(null);

const scrollToActiveTab = async (path: string) => {
  // DOM이 업데이트될 때까지 기다림
  await nextTick();

  if (tabViewRef.value) {
    const activeTabElement = tabViewRef.value?.querySelector(`[data-path="${path}"]`);

    if (activeTabElement) {
      // 3. 해당 요소로 부드럽게 스크롤 이동
      activeTabElement.scrollIntoView({
        behavior: 'smooth', // 부드러운 이동
        block: 'nearest', // 수직 위치는 최대한 유지
        inline: 'center', // 수평 위치는 중앙으로 (가장 보기 좋음)
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
  <div ref="tabViewRef">
    <Tabs :value="activeId" @update:value="handleChangedTab">
      <TabList :key="openTabs.length">
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
        <transition name="fade" mode="out-in">
          <keep-alive>
            <component :is="Component" :key="$route.fullPath" />
          </keep-alive>
        </transition>
      </router-view>
    </div>
  </div>
  <!-- <div class="tab-manager-root">
    <div class="tab-view-wrapper">
      <TabView v-model:activeIndex="activeIndex" :scrollable="true">
        <TabPanel v-for="(tab, index) in openTabs" :key="tab.id">
          <template #header>
            <span class="tab-title">{{ tab.title }}</span>
            <i
              v-if="index !== 0"
              class="pi pi-times ml-2 cursor-pointer"
              @click.stop="handleClose(index)"
            ></i>
          </template>
          <section class="tab-content-area">
            <router-view v-slot="{ Component }">
              <transition name="fade" mode="out-in">
                <keep-alive>
                  <component :is="Component" :key="$route.fullPath" />
                </keep-alive>
              </transition>
            </router-view>
          </section>
        </TabPanel>
      </TabView>

      <div class="tab-utils">
        <Button
          icon="pi pi-times-circle"
          class="p-button-text p-button-secondary utils-btn"
          v-tooltip.bottom="'전체 닫기'"
          @click="tabStore.closeAllTabs"
        />
      </div>
    </div>
  </div> -->
</template>

<style scoped>
.p_tabview_nav {
  height: 38px;
}
.tab-manager-root {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.tab-view-wrapper {
  position: relative; /* 버튼 배치를 위한 기준점 */
  height: 100%;
  display: flex;
  flex-direction: column;
}

.tab-utils {
  position: absolute;
  top: 0;
  right: 0;
  height: 38px; /* 헤더 높이와 반드시 일치시킴 */
  display: flex;
  align-items: center;
  padding: 0 8px;
  background-color: #ffffff;
  border-left: 1px solid #f1f5f9;
  border-bottom: 1px solid #e5e7eb;
  z-index: 10; /* 탭 버튼보다 위에 표시 */
}

.utils-btn {
  width: 26px !important;
  height: 26px !important;
}

.tab-content-area {
  padding: 0;
  height: 100%;
}

/* 탭 영역 전체 높이 조절 */
:deep(.p-tabview) {
  display: flex;
  flex-direction: column;
  height: 100%;
}

:deep(.p-tabview-panels) {
  flex: 1;
  overflow-y: auto;
}
</style>
