<script setup lang="ts">
import { Checkbox } from 'primevue';
import { computed } from 'vue';

interface CommRadioProps {
  dataList: Record<string, string>[];
  inputValue: string;
  inputLabel: string;
  inputName: string;
}
const props = defineProps<CommRadioProps>();
const model = defineModel<String[]>({ required: true });
const emit = defineEmits(['update']);
const cmpName = computed(() => {
  return `chk-${props.inputName}`;
});
</script>
<template>
  <div class="flex flex-wrap gap-4">
    <div v-for="(data, index) in dataList" :key="index" class="flex item-center gap-2">
      <Checkbox
        :name="cmpName"
        v-model="model"
        :value="data[inputValue]"
        :inputId="`${cmpName}-${data[inputValue]}`"
        @update:model-value="(val) => emit('update', val)"
      />
      <label :for="`${cmpName}-${data[inputValue]}`">{{ data[inputLabel] }}</label>
    </div>
  </div>
</template>
