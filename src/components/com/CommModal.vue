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
const handleCallback = (obj: T) => {
  emit('callback', obj);
  close();
};
</script>

<template>
  <div class="modal-container">
    <Dialog
      :visible="visible"
      @update:visible="(val: boolean) => emit('update:visible', val)"
      :header="header"
      :modal="true"
      :draggable="true"
      :style="{ width: width || '520px' }"
    >
      <template #header>
        <div class="p-dialog-title">
          {{ header }}
        </div>
      </template>

      <div class="modal-body-content" autofocus>
        <component
          v-if="component"
          :is="component"
          v-bind="data"
          @close="close"
          @callback="handleCallback"
        />
        <slot v-else />
      </div>
    </Dialog>
  </div>
</template>

<style scoped>
.modal-container .p-dialog {
  border-radius: 8px !important;
  overflow: hidden;
  box-shadow:
    0 20px 25px -5px rgb(0 0 0 / 0.1),
    0 8px 10px -6px rgb(0 0 0 / 0.1) !important;
}
.modal-container .p-dialog-header {
  background-color: var(--hv-dark) !important;
  color: white !important;
  padding: 1rem 1.5rem !important;
}
.p-dialog-title {
  font-size: 1.1rem !important;
  font-weight: 700 !important;
}
.p-dialog-header-icons .p-dialog-header-icon {
  color: white !important;
  transition: background-color 0.2s;
}
.p-dialog-header-icons .p-dialog-header-icon:hover {
  background-color: rgba(255, 255, 255, 0.1) !important;
}
</style>
