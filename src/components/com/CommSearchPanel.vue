<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

interface CommSearchPanelProps {
  collapsed?: boolean;
}
defineProps<CommSearchPanelProps>();
const isExpanded = ref(false);
const isOverflowing = ref(false);
const innerContent = ref<HTMLElement | null>(null);

const checkOverflow = () => {
  if (innerContent.value) {
    isOverflowing.value = innerContent.value.scrollHeight > 82;

    if (!isOverflowing.value) isExpanded.value = false;
  }
};

onMounted(() => {
  checkOverflow();
  const observer = new ResizeObserver((entries: ResizeObserverEntry[]) => {
    checkOverflow();
  });
  if (innerContent.value) {
    observer.observe(innerContent.value);
  }

  onUnmounted(() => {
    if (observer) observer.disconnect();
  });
});
</script>
<template>
  <div class="search-container">
    <div class="search-top-row">
      <div class="search-fields-area">
        <template v-if="collapsed">
          <div :class="['search-expand-grid', isExpanded ? 'expanded' : '']">
            <div class="search-expand-inner" ref="innerContent">
              <slot />
            </div>
          </div>
        </template>

        <div v-else><slot /></div>
      </div>
      <div class="search-buttons-area">
        <slot name="actions" />
      </div>
    </div>
    <div v-if="collapsed && isOverflowing" class="search-toggle-row">
      <button @click="isExpanded = !isExpanded" class="btn-toggle shadow-sm">
        <i
          :class="['pi mr-1.5', isExpanded ? 'pi-chevron-up' : 'pi-chevron-down']"
          style="font-size: 9px"
        ></i>
        <span v-if="isExpanded">조회 조건 접기</span>
        <span v-else>더 많은 조건 보기</span>
      </button>
    </div>
  </div>

  <!-- <section v-if="collapsed" class="search-section-collapsed">
    <div :class="['search-flow-wrapper', isExpanded ? 'expanded' : 'collapsed']">
      <div class="search-fields-area">
        <slot />
      </div>
      <div class="search-buttons-area">
        <slot name="actions" />
      </div>
    </div>

    <div class="search-actions-collapsed">
      <button @click="isExpanded = !isExpanded" class="btn-toggle shadow-sm">
        <i
          :class="['pi mr-1.5', isExpanded ? 'pi-chevron-up' : 'pi-chevron-down']"
          style="font-size: 8px"
        ></i>
        <span v-if="isExpanded">접기</span>
        <span v-else>더보기</span>
      </button>
    </div>
  </section>
  <section v-else class="search-content">
    <div class="search-fields-area">
      <slot />
    </div>
    <div class="search-buttons-area">
      <slot name="actions" />
    </div>
  </section> -->
</template>
<style scoped>
/* --- 조회 영역 컨테이너 --- */
.search-container {
  background-color: white;
  border: 1px solid var(--hv-border);
  border-radius: 8px;
  padding: 1.25rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  position: relative;
  display: flex;
  flex-direction: column;
}

/* --- 상단 레이아웃 (항목 + 조회버튼) --- */
.search-top-row {
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;
  width: 100%;
}

/* --- 조회 항목 영역 (왼쪽) --- */
.search-fields-area {
  flex: 1;
  min-width: 0;
}

/* --- 2줄 제한 및 접기/펴기 애니메이션 --- */
.search-expand-grid {
  display: grid;
  /* 접혔을 때 2줄 높이(36px * 2 + gap 8px = 80px) */
  grid-template-rows: 80px;
  transition: grid-template-rows 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.search-expand-grid.expanded {
  grid-template-rows: 1fr;
}

.search-expand-inner {
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 2rem;
  align-content: flex-start;
}

/* --- 버튼 그룹 영역 (오른쪽 상단 고정) --- */
.search-buttons-area {
  flex-shrink: 0;
  display: flex;
  gap: 0.5rem;
  padding-top: 4px; /* 입력창과 높이 정렬 */
}

/* --- 개별 항목 스타일 --- */

/* 하단 중앙 더보기/접기 버튼 */
.search-toggle-row {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 16px;
  margin-top: 8px;
  position: relative;
}

.btn-toggle {
  position: relative;
  z-index: 2;
  font-size: 10px;
  font-weight: 700;
  color: var(--hv-text-muted);
  background: white;
  padding: 0 12px;
  height: 20px;
  border-radius: 10px;
  border: 1px solid var(--hv-border);
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
}
.btn-toggle:hover {
  border-color: var(--hv-primary);
  color: var(--hv-primary);
}
</style>
