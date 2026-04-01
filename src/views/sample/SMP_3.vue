<script setup lang="ts">
import type { Product } from '@/types/sample';
import { Button } from 'primevue';

// CommonModal에서 v-bind="data"로 넘겨준 데이터가 props로 들어옵니다.
const props = defineProps<Product>();

const emit = defineEmits(['close', 'callback']);

const callback = () => {
  const obj = {
    test: 1,
    test2: '2',
    test3: [3, 4],
    test4: { val: 4 },
  };
  emit('callback', obj);
};

console.log(props);
</script>

<template>
  <div class="detail-container">
    <div class="info-table">
      <div class="info-row">
        <div class="info-label">ID</div>
        <div class="info-value">{{ id }}</div>
      </div>
      <div class="info-row">
        <div class="info-label">이름</div>
        <div class="info-value">{{ name }}</div>
      </div>
      <div class="info-row">
        <div class="info-label">카테고리</div>
        <div class="info-value">{{ category }}</div>
      </div>
      <div class="info-row">
        <div class="info-label">수량</div>
        <div class="info-value font-semibold text-orange-500">
          {{ quantity }}
        </div>
      </div>
    </div>

    <div class="footer-actions">
      <Button
        label="취소"
        severity="secondary"
        variant="outlined"
        @click="$emit('close')"
        class="action-btn"
      />
      <Button label="수정하기" @click="callback" class="action-btn primary-btn" />
    </div>
  </div>
</template>

<style scoped>
.detail-container {
  padding: 2rem;
}

.info-table {
  /* 이미지의 테이블 헤더 느낌을 본떠 상단 라인 강조 */
  border-top: 1px solid var(--p-surface-300);
  margin-bottom: 2rem;
}

.info-row {
  display: flex;
  border-bottom: 1px solid var(--p-surface-200);
}

.info-label {
  flex: 0 0 120px;
  background: var(--p-surface-50);
  padding: 0.8rem 1rem;
  font-weight: 500;
  color: var(--p-surface-600);
  display: flex;
  align-items: center;
}

.info-value {
  flex: 1;
  padding: 0.8rem 1rem;
  color: var(--p-surface-900);
  display: flex;
  align-items: center;
}

.footer-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}

.action-btn {
  font-size: 14px;
  padding: 0.5rem 1.5rem;
}

.primary-btn {
  /* 한화 오렌지 적용 */
  background: var(--p-primary-500);
  border: none;
}
</style>
