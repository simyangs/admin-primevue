<script setup lang="ts">
import { ref, markRaw } from 'vue'; // 컴포넌트 객체는 markRaw로 감싸는 것이 성능상 좋음
import InputText from 'primevue/inputtext';
import Select from 'primevue/select';
import DatePicker from 'primevue/datepicker';
import CommDetailTable from '@/components/com/CommDetailTable.vue';
import Button from 'primevue/button';

const productSchema = [
  {
    label: '상품코드',
    field: 'code',
    component: markRaw(InputText),
    props: { placeholder: '자동생성' },
  },
  {
    label: '판매상태',
    field: 'status',
    component: markRaw(Select),
    props: { options: ['판매중', '품절', '중단'] },
  },
  { label: '출시일', field: 'releaseDate', component: markRaw(DatePicker) },
  { label: '특수로직', field: 'special_logic', span: 3 },
  { label: '상품설명', field: 'desc', span: 3, component: markRaw(InputText) }, // 2열 차지
];

const productData = ref({ code: 'P001', status: '판매중', releaseDate: null, desc: '' });
</script>

<template>
  <CommDetailTable v-model:data="productData" :schema="productSchema" mode="edit" :columnCount="3">
    <template #special_logic="{ data }">
      <div class="flex items-center gap-2">
        <Button label="중복체크" size="small" severity="secondary" class="h-fit" />
        <span class="text-sm">현재 상태: {{ data.status }}</span>
      </div>
    </template>
  </CommDetailTable>
</template>
