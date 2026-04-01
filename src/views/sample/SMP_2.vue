<script setup lang="ts" generic="T extends Record<string, any>">
import { ref, onMounted, shallowRef } from 'vue';
import type { DataTablePageEvent } from 'primevue/datatable';
import CommTable from '@/components/com/CommTable.vue';
import CommModal from '@/components/com/CommModal.vue';
import CommDrawer from '@/components/com/CommDrawer.vue';
import SMP_4 from '@/views/sample/SMP_4.vue';
import type { Product } from '@/types/sample';

interface SelectInfo {
  page: number;
  rows: number;
  sortField: string | null;
  sortOrder: number | null;
}
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

const products = ref<Product[]>([]);
const selectInfo = ref<SelectInfo>({
  page: 0,
  rows: 10,
  sortField: null,
  sortOrder: null,
});

const totalCount = ref<number>(0);

const isOpenDetail = ref(false);
const selectedItem = ref<Product | null>(null);
const detailComponent = shallowRef(SMP_4);

const onPage = (event: DataTablePageEvent) => {
  selectInfo.value.page = event.page;
  selectInfo.value.rows = event.rows;
  selectProducts();
};

const openDetail = (data: Product) => {
  selectedItem.value = data;
  isOpenDetail.value = true;
};

const callbackDetail = (data: Record<string, unknown>) => {
  console.log('callback', data);
  isOpenDetail.value = false;
};
onMounted(() => {
  selectProducts();
});

const columns = [
  { field: 'id', header: 'ID', visible: true, width: '50px' },
  {
    field: 'name',
    header: '이름',
    visible: true,
    width: '150px',
    sortable: true,
    onCellClick: (data: Product) => {
      openDetail(data);
    },
  },
  { field: 'category', header: '카테고리', visible: true },
  { field: 'quantity', header: '수량', visible: true },
];
</script>
<template>
  <div>샘플페이지2</div>
  <CommTable
    :paginator="false"
    :lazy="true"
    :data="products"
    :columns="columns"
    :onPage="onPage"
    :totalRecords="totalCount"
  >
    <template #name="slotProps">
      <span>#{{ slotProps.data.name }}</span>
    </template>

    <template #category="slotProps">
      <span>##{{ slotProps.data.category }}</span>
    </template>
  </CommTable>
  <!-- <CommModal
    v-if="selectedItem"
    v-model:visible="isModalVisible"
    header="상품상세"
    :component="modalComponent"
    :data="selectedItem"
    @callback="callbackDetail"
  ></CommModal> -->
  <CommDrawer
    v-model:visible="isOpenDetail"
    header="상세 정보"
    :component="detailComponent"
    :data="selectedItem || undefined"
    mode="edit"
    width="1024px"
    @save="callbackDetail"
  />
</template>
