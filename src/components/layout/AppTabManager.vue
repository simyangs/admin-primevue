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

<style scoped>
/* 1. 전체 컨테이너와 탭 바 높이 설정 */
.p-tabs {
  background: #ffffff;
  border-bottom: 1px solid #e2e8f0;
}

/* 2. 탭 리스트 내부 (가로 스크롤 대응) */
:deep(.p-tablist-content) {
  /* margin: 0 10px; */
  overflow-x: auto;
  scroll-behavior: smooth;
}

/* 3. 개별 탭 스타일 */
:deep(.p-tab) {
  height: 3rem;
  min-width: 100px;
  padding: 0 16px;
  border: none;
  background: transparent;
  color: #64748b;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.2s;
}

/* 4. 활성화된 탭 (한화 오렌지) */
:deep(.p-tab-active) {
  color: #ff6600 !important;
  font-weight: 700;
}

/* 5. 탭 하단 오렌지색 인디케이터 바 */
:deep(.p-tablist-active-bar) {
  background: #ff6600 !important;
  height: 3px !important;
}

/* 6. 탭 내부 레이아웃 (라벨 + 닫기 아이콘) */
.tab-label {
  display: flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
}

.close-icon {
  font-size: 0.65rem;
  color: #94a3b8;
  padding: 3px;
  border-radius: 50%;
  transition: all 0.2s;
}

.close-icon:hover {
  background-color: #ff6600;
  color: #ffffff;
}

/* 7. 콘텐츠 영역 */
.tab-content-area {
  padding: 1rem;
  background-color: #f8fafc;
  min-height: calc(100vh - 9rem);

  display: flex;
  flex-direction: column;

  box-sizing: border-box;

  overflow: hidden; /* 전역 스크롤 방지 */
}
</style>
