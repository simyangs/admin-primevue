<script setup lang="ts">
import { computed } from 'vue';
import DatePicker from 'primevue/datepicker';
interface DatePickerProps {
  date?: string | string[] | null;
  isRange?: boolean;
}

const props = withDefaults(defineProps<DatePickerProps>(), {
  date: null,
  isRange: false,
});

const emit = defineEmits(['update:modelValue']);

const stringToDate = (str: string | null) => {
  if (!str) return null;
  str = str.replace(/[^0-9]/g, '');
  if (str.length !== 8) return null;

  const y = str.substring(0, 4);
  const m = str.substring(4, 6);
  const d = str.substring(6, 8);

  return new Date(`${y}-${m}-${d}`);
};

const toNumericStr = (d: Date) => {
  if (!d) return '';
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}${month}${day}`;
};

const internalValue = computed({
  get: () => {
    console.log(props.date);
    if (!props.date) return null;
    if (Array.isArray(props.date)) {
      console.log(props.date.map((v) => stringToDate(v)));
      return props.date.map((v) => stringToDate(v));
    } else {
      return stringToDate(props.date);
    }
  },
  set: (val: Date | Date[] | null) => {
    if (!val) {
      emit('update:modelValue', null);
      return;
    }

    if (Array.isArray(val)) {
      emit('update:modelValue', val.map(toNumericStr));
    } else {
      emit('update:modelValue', toNumericStr(val));
    }
  },
});
</script>

<template>
  <DatePicker v-model="internalValue" :selectionMode="isRange ? 'range' : 'single'" />
</template>
