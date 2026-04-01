<script setup lang="ts" generic="T extends Record<string, any>">
import { ref, computed } from 'vue';
import DataTable, { type DataTablePageEvent, type DataTableSortEvent } from 'primevue/datatable';
import MultiSelect from 'primevue/multiselect';
import Column from 'primevue/column';
import Button from 'primevue/button';
interface CommTableColumnProps<T> {
  field: keyof T | string;
  header: string;
  visible?: boolean;
}
const props = withDefaults(
  defineProps<{
    paginator?: boolean;
    rows?: number;
    rowsPerPageOptions?: number[];
    lazy?: boolean;
    totalRecords?: number;
    scrollable?: boolean;
    height?: string;
    onPage?: (event: DataTablePageEvent) => void;
    onSort?: (event: DataTableSortEvent) => void;

    data: T[];
    columns: CommTableColumnProps<T>[];
  }>(),
  {},
);
const selectedColumns = ref<CommTableColumnProps<T>[]>(
  props.columns.filter((col) => col.visible !== false),
);

defineSlots<{
  [K in keyof T | string]: (props: {
    data: T;
    index: number;
    column: any; // PrimeVue 내부 객체
    columnConfig: CommTableColumnProps<T>;
  }) => any;
}>();

const tableProps = computed(() => {
  const base = {
    value: props.data,
  };

  // 페이징 기능이 필요할 때만 관련 속성 추가
  const pagination = props.paginator
    ? {
        paginator: true,
        rows: props.rows || 10,
        rowsPerPageOptions: props.rowsPerPageOptions || [10, 20, 50],
        lazy: props.lazy,
        totalRecords: props.totalRecords,
        onPage: props.onPage,
        onSort: props.onSort,
      }
    : {};

  // 스크롤 기능이 필요할 때만 추가
  const scrolling = props.scrollable
    ? {
        scrollable: true,
        scrollHeight: props.height || '450px',
      }
    : {};

  return { ...base, ...pagination, ...scrolling };
});

const onToggle = (val: any) => {
  selectedColumns.value = props.columns.filter((col) => val.includes(col));
};
</script>
<template>
  <div class="hw_data_table">
    <DataTable v-bind="tableProps">
      <template #header>
        <div style="text-align: left">
          <MultiSelect
            class="custom-multiselect-button"
            :modelValue="selectedColumns"
            :options="props.columns"
            optionLabel="header"
            @update:modelValue="onToggle"
            :maxSelectedLabels="0"
          >
            <template #dropdownicon>
              <div>
                <i class="pi pi-filter">&nbsp;COLUMNS</i>
              </div>
            </template>
          </MultiSelect>
        </div>
      </template>
      <Column
        v-for="(col, index) of selectedColumns"
        :field="col.field as string"
        :header="col.header"
        :key="(col.field + index) as string"
      ></Column>
    </DataTable>
  </div>
</template>
<style scoped>
:deep(.custom-multiselect-button) {
  border: none;
  padding: 1rem 0.5rem;
  color: white;
  cursor: pointer;
  width: auto; /* 고정 너비 해제 */
  min-width: 0;
  transition: background 0.2s;
}

:deep(.p-multiselect-dropdown) {
  display: block;
}

:deep(.p-multiselect-label-container) {
  display: none;
}
:deep(.p-multiselect) {
  box-shadow: none;
}
</style>
