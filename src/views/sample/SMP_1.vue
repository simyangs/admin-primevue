<script setup lang="ts">
import { ref, onMounted } from 'vue';
import DataTable, { type DataTablePageEvent, type DataTableSortEvent } from 'primevue/datatable';
import MultiSelect from 'primevue/multiselect';

import Column from 'primevue/column';
import Button from 'primevue/button';

interface Product {
  id: number;
  name: string;
  category: string;
  quantity: number;
}

interface SelectInfo {
  page: number;
  rows: number;
  sortField: string | null;
  sortOrder: number | null;
}

const columns = ref([
  { field: 'name', header: 'Name' },
  { field: 'category', header: 'Category' },
  { field: 'quantity', header: 'Quantity' },
]);
const selectedColumns = ref(columns.value);

const products = ref<Product[]>([]);
const selectInfo = ref<SelectInfo>({
  page: 0,
  rows: 10,
  sortField: null,
  sortOrder: null,
});

const totalCount = ref<number>(0);
const onPage = (event: DataTablePageEvent) => {
  selectInfo.value.page = event.page;
  selectInfo.value.rows = event.rows;
  selectProducts();
};

const onSort = (event: DataTableSortEvent) => {
  selectInfo.value.sortField = event.sortField as string;
  selectInfo.value.sortOrder = event.sortOrder!;
  selectProducts();
};

const onToggle = (val: any) => {
  selectedColumns.value = columns.value.filter((col) => val.includes(col));
};

const selectProducts = () => {
  const total = 1345;
  const list = [];

  const start = selectInfo.value.page * selectInfo.value.rows + 1;
  const end = Math.min(start + selectInfo.value.rows, total);
  for (let i = start; i < end; i++) {
    list.push({
      id: i,
      name: 'product_' + i,
      category: 'aaa',
      quantity: i,
    });
  }
  if (selectInfo.value.sortOrder === -1) list.reverse();
  products.value = list;
  totalCount.value = total;
};

const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    // 성공 시 토스트 알림
  } catch (err) {}
};

onMounted(() => {
  selectProducts();
});
</script>
<template>
  <div class="hw_data_table">
    <DataTable
      :value="products"
      scrollable
      scrollHeight="450px"
      removableSort
      lazy
      paginator
      :rows="10"
      :rowsPerPageOptions="[10, 20, 50, 100, 500]"
      :totalRecords="totalCount"
      @page="onPage"
      @sort="onSort"
    >
      <template #header>
        <div style="text-align: left">
          <MultiSelect
            class="custom-multiselect-button"
            :modelValue="selectedColumns"
            :options="columns"
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
      <Column field="id" header="ID" />
      <Column
        v-for="(col, index) of selectedColumns"
        :field="col.field"
        :header="col.header"
        :key="col.field + '_' + index"
        sortable
        copyable="true"
      >
        <template #body="slotProps">
          <div class="flex items-center gap-2">
            <span>{{ slotProps.data[col.field] }}</span>
            <Button
              v-if="slotProps.column.props.copyable"
              icon="pi pi-copy"
              class="p-button-text p-button-sm p-0 w-8 h-8"
              @click="copyToClipboard(slotProps.data[col.field])"
              v-tooltip.top="'복사하기'"
            />
          </div>
        </template>
      </Column>
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
