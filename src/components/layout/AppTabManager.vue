<script setup lang="ts">
import { ref, watch, nextTick } from 'vue';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import Button from 'primevue/button';
import { useTabStore } from '@/stores/useTabStore';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

const tabStore = useTabStore();
const router = useRouter();

const { openTabs, activeIndex } = storeToRefs(tabStore);
const tabViewRef = ref<{ $el: HTMLElement } | null>(null);

const scrollToActiveTab = async () => {
  // DOM이 업데이트될 때까지 기다림
  await nextTick();

  setTimeout(() => {
    if (!tabViewRef.value) return;

    const el = tabViewRef.value.$el;
    // 1. 스크롤이 실제로 일어나는 컨테이너
    const container = el.querySelector('.p-tabview-nav-content') as HTMLElement;
    // 2. 활성화된 탭 (li 태그)
    const activeTab = el.querySelector('.p-tabview-nav li.p-highlight') as HTMLElement;

    if (container && activeTab) {
      // 3. 중앙 정렬을 위한 좌표 계산
      const scrollLeft =
        activeTab.offsetLeft - container.clientWidth / 2 + activeTab.clientWidth / 2;

      container.scrollTo({
        left: scrollLeft,
        behavior: 'smooth',
      });
    }
  }, 100);
};

watch(
  activeIndex,
  (newIndex) => {
    const tab = openTabs.value[newIndex];
    if (tab) {
      console.log('111');
      scrollToActiveTab();
      router.push(tab.path);
    }
  },
  { flush: 'post' },
);

watch(
  () => openTabs.value.length,
  () => {
    scrollToActiveTab();
  },
  { flush: 'post' },
);

const handleClose = (index: number): void => {
  const tab = openTabs.value[index];
  if (tab) tabStore.removeTab(tab.id);
};
</script>

<template>
  <div class="tab-manager-root">
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
  </div>
</template>

<style scoped>
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
