<script setup lang="ts" generic="T extends Record<string, any>">
import { type Component } from 'vue';
import Dialog from 'primevue/dialog';

defineProps<{
  visible: boolean;
  header: string;
  component?: Component;
  data?: T;
  width?: string;
}>();

const emit = defineEmits<{
  (e: 'update:visible', value: boolean): void;
  (e: 'callback', value: T): void;
  (e: 'close'): void;
}>();

const close = () => emit('update:visible', false);
</script>

<template>
  <Dialog
    :visible="visible"
    @update:visible="(val: boolean) => emit('update:visible', val)"
    :header="header"
    :modal="true"
    class="hw-modal"
    :draggable="false"
    :style="{ width: width || '520px' }"
  >
    <template #header>
      <div class="cmm-modal-header">
        <div class="title">
          {{ header }}
        </div>
      </div>
    </template>

    <div class="modal-body-content" autofocus>
      <component
        v-if="component"
        :is="component"
        v-bind="data"
        @close="close"
        @callback="(obj: T) => emit('callback', obj)"
      />
    </div>
  </Dialog>
</template>

<style scoped>
:deep(.p-dialog) {
  font-size: 14px;
  border-radius: 4px; /* 대시보드 이미지처럼 각진 느낌을 살린 미세한 라운드 */
  box-shadow:
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

:deep(.p-dialog-header) {
  padding: 1.5rem 2rem 1rem 2rem;

  background: #fff;
}

.modal-header-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.modal-title {
  font-size: 1.1rem; /* 14px보다 살짝 큰 15~16px 느낌 */
  font-weight: 400;
  color: var(--p-surface-900);
  margin: 0;
}

.title-underline {
  width: 30px;
  height: 2px;
  background: var(--p-primary-500); /* 한화 오렌지 */
}

:deep(.p-dialog-content) {
  padding: 0;
}

:deep(.p-dialog-header-icons) {
  padding-top: 1rem;
}
</style>
