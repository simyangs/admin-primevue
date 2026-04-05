<script setup lang="ts">
import { InputGroup, InputText, InputGroupAddon, Button } from 'primevue';
import { computed } from 'vue';
const props = withDefaults(
  defineProps<{
    inputValue: string | null;
    width?: string | number;
    readonly?: boolean;
  }>(),
  { inputValue: null, readonly: true },
);

const emit = defineEmits(['click']);

const withStyle = computed(() => {
  if (!props.width) return '';
  return (
    'width: ' + (typeof props.width === 'number' ? props.width + 'px' : props.width) + ' !important'
  );
});
</script>
<template>
  <InputGroup :style="withStyle">
    <InputText :readonly="readonly" :modelValue="inputValue" />
    <InputGroupAddon>
      <Button
        class="btn-addon"
        icon="pi pi-search"
        severity="secondary"
        variant="text"
        @click="emit('click')"
      />
    </InputGroupAddon>
  </InputGroup>
</template>
