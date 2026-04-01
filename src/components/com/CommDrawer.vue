<script setup lang="ts" generic="T extends Record<string, unknown>">
import { computed, type Component } from 'vue';
import Drawer from 'primevue/drawer';

// Props 정의
const props = defineProps<{
  visible: boolean;
  header: string;
  component?: Component; // 안에 렌더링할 실제 컴포넌트 파일
  data?: T; // 컴포넌트에 전달할 상세 데이터
  mode?: 'view' | 'edit' | 'create'; // 조회/수정/등록 모드 구분
  full?: boolean;
  width?: string; // 드로어 너비 (기본값 제공 가능)
}>();

// Emit 정의
const emit = defineEmits<{
  (e: 'update:visible', value: boolean): void;
  (e: 'save', value: T): void;
  (e: 'close'): void;
}>();
const drawerPosition = computed(() => (props.full ? 'full' : 'right'));
const drawerStyle = computed(() => {
  if (props.full) return { width: '100vw' };
  return { width: props.width || '35rem' };
});

const handleClose = () => {
  emit('update:visible', false);
  emit('close');
};
</script>

<template>
  <Drawer
    :visible="visible"
    @update:visible="(val) => emit('update:visible', val)"
    :position="drawerPosition"
    :style="drawerStyle"
    class="hw-common-drawer"
    :class="{ 'is-full': full }"
    :modal="true"
    :dismissable="false"
  >
    <template #header>
      <div class="hw-drawer-header">
        <h2 class="hw-drawer-title">{{ header }}</h2>
        <div class="hw-title-bar"></div>
      </div>
    </template>

    <div class="hw-drawer-body">
      <component
        v-if="component"
        :is="component"
        v-bind="data"
        :mode="mode"
        :is-full="full"
        @close="handleClose"
        @save="(val: T) => emit('save', val)"
      />
      <slot v-else></slot>
    </div>
  </Drawer>
</template>

<style scoped>
/* PrimeVue v4 Design Tokens 활용 */
:deep(.p-drawer) {
  font-size: 14px;
  border-left: 1px solid var(--p-surface-200);
  box-shadow: -5px 0 15px rgba(0, 0, 0, 0.05);
}

:deep(.p-drawer-header) {
  padding: 1.5rem 2rem;
  align-items: flex-start;
}

.hw-drawer-header {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.hw-drawer-title {
  font-size: 1.25rem;
  font-weight: 500;
  color: var(--p-surface-900);
  margin: 0;
}

/* 한화 오렌지 시그니처 바 */
.hw-title-bar {
  width: 24px;
  height: 4px;
  background-color: var(--p-primary-500);
  border-radius: 2px;
}

.hw-drawer-body {
  height: 100%;
  display: flex;
  flex-direction: column;
}

:deep(.p-drawer-content) {
  padding: 0; /* 내부 컴포넌트에서 자유롭게 패딩 조절 */
  overflow-y: auto;
}

:deep(.p-drawer-close-button) {
  margin-top: 0.5rem;
}
</style>
