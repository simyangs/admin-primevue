<template>
  <section class="search-section">
    <div class="search-grid">
      <slot />
    </div>
    <div class="search-actions">
      <slot name="actions" />
    </div>
  </section>
</template>

<style scoped>
.search-section {
  display: flex;
  align-items: flex-end;
  background-color: #ffffff;
  padding: 1.25rem;

  border: 1px solid #e2e8f0;

  border-radius: 0;
  margin-bottom: 1rem;
  flex-shrink: 0;
}

.search-grid {
  display: flex;
  flex-wrap: wrap; /* 공간 부족 시 자동으로 다음 줄로 */
  flex: 1;
  gap: 1rem 2rem; /* 세로 간격 1rem, 가로 간격 2rem */
}

.search-actions {
  display: flex;
  align-items: flex-end; /* 버튼들을 바닥에 맞춤 */
  gap: 0.5rem;
  margin-left: 2rem;
  padding-bottom: 2px; /* 인풋박스 높이와 시각적 균형 */
}

/* 깊은 선택자로 자식 컴포넌트(form-group) 스타일 제어 */
:deep(.form-group) {
  display: flex;
  align-items: center;
  gap: 10px;
}

:deep(.form-group label) {
  font-size: 0.85rem;
  font-weight: 700;
  color: #4a5568;
  width: 80px; /* ★ 라벨 너비 고정 (중요) ★ */
  text-align: right; /* 라벨 오른쪽 정렬로 인풋박스와 밀착 */
  white-space: nowrap;
}

/* :deep(.form-group .p-inputtext),
:deep(.form-group .p-datepicker),
:deep(.form-group .p-select) {
  width: 180px;
} */
</style>
