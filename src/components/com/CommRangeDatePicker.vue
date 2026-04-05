<script setup lang="ts">
import { computed } from 'vue';
import DatePicker from 'primevue/datepicker';
import { stringToDate, toNumericStr } from '@/utils/date';
import { formatNumericToDateString } from '@/utils/formatter';

interface RangeDatePickerProps {
  startValue: string | null | undefined;
  endValue: string | null | undefined;
  width?: string | number;
}

const props = withDefaults(defineProps<RangeDatePickerProps>(), {
  startValue: null,
  endValue: null,
  width: '120px',
});

const emit = defineEmits(['update:startValue', 'update:endValue']);

// Computed Setter를 활용해 v-model 연결
const startDate = computed({
  get: () => {
    if (!props.startValue) return null;
    return stringToDate(props.startValue);
  },
  set: (val) => {
    if (!val) {
      emit('update:startValue', val);
      return;
    }

    emit('update:startValue', toNumericStr(val));
  },
});

const endDate = computed({
  get: () => {
    if (!props.endValue) return null;
    return stringToDate(props.endValue);
  },
  set: (val) => {
    if (!val) {
      emit('update:endValue', val);
      return;
    }

    emit('update:endValue', toNumericStr(val));
  },
});

const withStyle = computed(() => {
  if (!props.width) return '';
  return (
    'width: ' + (typeof props.width === 'number' ? props.width + 'px' : props.width) + ' !important'
  );
});
const onInput = (event: Event) => {
  const input = event.target as HTMLInputElement;
  input.value = formatNumericToDateString(input.value);
};
</script>
<template>
  <div class="flex items-center gap-2">
    <div class="flex flex-col gap-1">
      <DatePicker
        v-model="startDate"
        :max-date="endDate || undefined"
        :style="withStyle"
        placeholder="시작일 선택"
        showIcon
        iconDisplay="input"
        @input="onInput"
      />
    </div>

    <span class="text-gray-500">~</span>

    <div class="flex flex-col gap-1">
      <DatePicker
        v-model="endDate"
        :min-date="startDate || undefined"
        :style="withStyle"
        placeholder="종료일 선택"
        showIcon
        iconDisplay="input"
        @input="onInput"
      />
    </div>
  </div>
</template>
