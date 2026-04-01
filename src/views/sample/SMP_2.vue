<script setup lang="ts">
import { ref, onMounted } from 'vue';
import CommTable from '@/components/com/CommTable.vue';
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

onMounted(() => {
  selectProducts();
});

const columns = [
  { field: 'id', header: 'ID', visible: true },
  { field: 'name', header: '이름', visible: true },
  { field: 'category', header: '카테고리', visible: true },
  { field: 'quantity', header: '수량', visible: true },
];
</script>
<template>
  <div>샘플페이지2</div>
  <CommTable :data="products" :columns="columns"></CommTable>
</template>
