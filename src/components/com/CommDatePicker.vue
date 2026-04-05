<script setup lang="ts">
import { computed } from 'vue';
import DatePicker from 'primevue/datepicker';
import { formatNumericToDateString } from '@/utils/formatter';
import { stringToDate, toNumericStr } from '@/utils/date';
interface DatePickerProps {
  date?: string | null;
  width?: string | number;
}

const props = withDefaults(defineProps<DatePickerProps>(), {
  date: null,
  width: '120px',
});

const emit = defineEmits(['update:modelValue']);

const onInput = (event: Event) => {
  const input = event.target as HTMLInputElement;
  input.value = formatNumericToDateString(input.value);
};

const internalValue = computed({
  get: () => {
    console.log(props.date);
    if (!props.date) return null;

    return stringToDate(props.date);
  },
  set: (val) => {
    if (!val) {
      emit('update:modelValue', null);
      return;
    }

    emit('update:modelValue', toNumericStr(val));
  },
});

const withStyle = computed(() => {
  if (!props.width) return '';
  return (
    'width: ' + (typeof props.width === 'number' ? props.width + 'px' : props.width) + ' !important'
  );
});
</script>

<template>
  <DatePicker
    v-model="internalValue"
    :manualInput="false"
    showIcon
    showButtonBar
    iconDisplay="input"
    :style="withStyle"
    @input="onInput"
  />
</template>
