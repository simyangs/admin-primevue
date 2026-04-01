<script setup lang="ts" generic="T extends Record<string, any>">
import { ref, computed } from 'vue';
import DataTable, { type DataTablePageEvent, type DataTableSortEvent } from 'primevue/datatable';
import MultiSelect from 'primevue/multiselect';
import Column from 'primevue/column';

interface CommTableColumnProps<T> {
  field: keyof T | string;
  header: string;
  visible?: boolean;
  width?: string;
  sortable?: boolean;
  onCellClick?: (data: T) => void;
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
    columnFilter?: boolean;
    onPage?: (event: DataTablePageEvent) => void;
    onSort?: (event: DataTableSortEvent) => void;

    data: T[];
    columns: CommTableColumnProps<T>[];
  }>(),
  {
    paginator: false,
    rows: 10,
    rowsPerPageOptions: () => [10, 20, 50, 100],
    lazy: false,
    totalRecords: 0,
    scrollable: true,
    height: '450px',
    columnFilter: true,
  },
);
const selectedColumns = ref<CommTableColumnProps<T>[]>(
  props.columns.filter((col) => col.visible !== false),
);

const tableProps = computed(() => {
  const base = {
    value: props.data,
    removableSort: true,
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

const columnProps = (field: string) => {
  const colProp: Record<string, string | number | boolean | object> = {};

  for (const col of props.columns) {
    if (col.field === field) {
      if (col.sortable) colProp.sortable = true;
      const colStyle: Record<string, string | number> = {};
      if (col.width) colStyle.width = col.width;
      colProp.style = colStyle;
      break;
    }
  }
  return colProp;
};

const onToggle = (val: CommTableColumnProps<T>[]) => {
  selectedColumns.value = props.columns.filter((col) => val.some((t) => t.field === col.field));
};

console.log(props.columns);
console.log(selectedColumns.value);
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
        :key="(col.field as string) + index"
        v-bind="columnProps(col.field as string)"
      >
        <template #body="slotProps">
          <div
            @click.stop="col.onCellClick ? col.onCellClick(slotProps.data) : null"
            :class="{ 'cursor-pointer': col.onCellClick }"
          >
            <template v-if="$slots[col.field as string]">
              <slot :name="col.field as string" v-bind="slotProps"></slot>
            </template>
            <template v-else>
              {{ slotProps.data[col.field] }}
            </template>
          </div>
        </template>
      </Column>
    </DataTable>
  </div>
</template>
