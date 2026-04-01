<script setup lang="ts" generic="T extends Record<string, any>">
import { type Component } from 'vue';

export interface DetailSchema<T> {
  label: string;
  field: keyof T | string;
  span?: number;
  // ⭐️ 항목별로 사용할 컴포넌트 (InputText, Select, 직접 만든 컴포넌트 등)
  component?: Component;
  // ⭐️ 해당 컴포넌트에 넘길 Props (placeholder, options, min/max 등)
  props?: Record<string, unknown>;
  render?: (val: any, data: T) => string;
}

const props = defineProps<{
  data: T;
  schema: DetailSchema<T>[];
  columnCount?: number;
  mode?: 'view' | 'edit' | 'create'; // 모드에 따라 전역 제어 가능
}>();

const emit = defineEmits<{
  (e: 'update:data', value: T): void;
}>();

// 데이터 수정 핸들러 (v-model 연결용)
const updateValue = (field: keyof T | string, value: any) => {
  const newData = { ...props.data, [field]: value };
  emit('update:data', newData);
};

console.log(props.mode);
</script>

<template>
  <div class="hw-detail-grid" :style="{ '--cols': columnCount || 2 }">
    <div
      v-for="item in schema"
      :key="String(item.field)"
      class="hw-detail-item"
      :style="{ 'grid-column': `span ${item.span || 1}` }"
    >
      <div class="hw-label">{{ item.label }}</div>

      <div class="hw-value">
        <slot
          v-if="$slots[String(item.field)]"
          :name="String(item.field)"
          :data="data"
          :field="item.field"
        />

        <component
          v-else-if="item.component"
          :is="item.component"
          :model-value="data[item.field]"
          @update:model-value="(val: any) => updateValue(item.field, val)"
          v-bind="item.props"
          :readonly="mode === 'view'"
          :disabled="mode === 'view'"
          fluid
        />

        <template v-else>
          {{ item.render ? item.render(data[item.field], data) : (data[item.field] ?? '-') }}
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 이전 스타일 유지 (14px, Hanwha Color Tokens) */
.hw-detail-grid {
  display: grid;
  grid-template-columns: repeat(var(--cols), 1fr);
  border-top: 1px solid var(--p-surface-900);
  border-left: 1px solid var(--p-surface-200);
}
.hw-detail-item {
  display: flex;
  border-bottom: 1px solid var(--p-surface-200);
  border-right: 1px solid var(--p-surface-200);
}
.hw-label {
  flex: 0 0 140px;
  background: var(--p-surface-50);
  padding: 0.75rem 1rem;
  font-weight: 500;
  color: var(--p-surface-700);
  font-size: 14px;
}
.hw-value {
  flex: 1;
  padding: 0.5rem 1rem;
  background: #fff;
  min-height: 48px;
  display: flex;
  align-items: center; /* 세로 중앙 */
  gap: 0.5rem;
}

/* 1. 슬롯의 최상위 루트(주로 div)는 100%가 되어야 span: 2를 다 씁니다. */
.hw-value > :deep(*) {
  width: 100%;
}

/* 2. ⭐️ 중요: 하지만 그 안에 들어있는 버튼(p-button)은 너비를 auto로 강제합니다. */
/* !important를 붙여서 내부의 너비 계산 로직을 덮어씁니다. */
.hw-value :deep(.p-button) {
  width: auto !important;
  flex-shrink: 0; /* 공간이 부족해도 찌그러지지 않게 함 */
  white-space: nowrap; /* 글자가 줄바꿈되지 않게 함 */
}

/* 3. 인풋이나 셀렉트 같은 애들은 여전히 100%(fluid)여야 예쁩니다. */
.hw-value :deep(.p-inputtext),
.hw-value :deep(.p-select) {
  width: 100%;
}
.hw-value :deep(.p-component) {
  width: 100%;
  border-color: var(--p-surface-200);
  background-color: #fff;
  transition: all 0.2s;
}

/* ⭐️ 조회 모드(view) 스타일: 입력창 느낌을 완전히 지우고 텍스트처럼 보임 */
.hw-value :deep(.p-disabled),
.hw-value :deep(.p-readonly),
.hw-value :deep(.p-inputtext[readonly]) {
  background-color: transparent !important;
  border-color: transparent !important;
  color: var(--p-surface-900) !important;
  padding-left: 0; /* 라벨과 수직 정렬을 맞추기 위해 좌측 패딩 제거 */
  opacity: 1; /* disabled여도 흐리게 보이지 않도록 설정 */
  cursor: default;
}

/* ⭐️ 수정 모드(edit/create) 스타일: 입력 가능하다는 것을 강조 */
.hw-value :deep(.p-inputtext:not([readonly])) {
  background-color: var(--p-surface-0);
  border: 1px solid var(--p-surface-300);
}

.hw-value :deep(.p-inputtext:not([readonly]):hover) {
  border-color: var(--p-primary-400);
}
</style>
