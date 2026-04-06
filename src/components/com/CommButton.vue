<script setup lang="ts">
import { Button } from 'primevue';
import { computed } from 'vue';

interface CommButtonProps {
  label: string;
  type: 'search' | 'init' | 'action' | 'go' | 'excel' | 'print';
  disabled?: boolean;
}

const props = defineProps<CommButtonProps>();
const emit = defineEmits(['click']);

const getIcon = () => {
  if (props.type === 'excel') return 'pi pi-file-excel';
  if (props.type === 'print') return 'pi pi-print';
  return '';
};
const buttonProps = computed(() => {
  const _base = { label: props.label };
  const _class = { class: `btn-base btn-${props.type}` };
  const _icon = { icon: getIcon() };
  const _disabled = props.disabled ? { disabled: props.disabled } : {};

  return { ..._base, ..._class, ..._icon, ..._disabled };
});
</script>
<template>
  <Button v-bind="buttonProps" @click="emit('click')" />
</template>
