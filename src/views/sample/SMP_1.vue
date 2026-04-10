<script setup lang="ts" generic="T extends Record<string, any>">
import { ref, onMounted, shallowRef, reactive } from 'vue';
import type { DataTablePageEvent, DataTableRowDoubleClickEvent } from 'primevue/datatable';
import CommGrid from '@/components/com/CommGrid.vue';
import CommModal from '@/components/com/CommModal.vue';
import CommDrawer from '@/components/com/CommDrawer.vue';
import CommSearchPanel from '@/components/com/CommSearchPanel.vue';
import CommDatePicker from '@/components/com/CommDatePicker.vue';
import SMP_3 from '@/views/sample/SMP_3.vue';
import type { Product } from '@/types/sample';
import { InputText, InputNumber, Select } from 'primevue';
import CommInputGroup from '@/components/com/CommInputGroup.vue';
import CommRangeDatePicker from '@/components/com/CommRangeDatePicker.vue';
import CommButton from '@/components/com/CommButton.vue';
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

// const isOpenDetail = ref(false);
const isOpenModal = ref(false);
const selectedItem = ref<Product | null>(null);

const modalComp = shallowRef(SMP_3);
// const drawerComp = shallowRef(SMP_P1);

const onPage = (event: DataTablePageEvent) => {
  selectInfo.value.page = event.page;
  selectInfo.value.rows = event.rows;
  selectProducts();
};

const openDetailModal = (data: Product) => {
  selectedItem.value = data;
  isOpenModal.value = true;
};

const callbackDetail = (data: Record<string, unknown>) => {
  console.log('callback', data);
};

const onDblClick = (data: DataTableRowDoubleClickEvent) => {
  console.log(data.index, data.data);
  openDetailModal(data.data);
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
  },
  {
    field: 'category',
    header: '카테고리',
    visible: true,
  },
  { field: 'quantity', header: '수량', visible: true },
];

const name = ref<string>('');
const quantity = ref<number>();
const date = ref('20260401');
const codeInfo = reactive({
  code: '',
  name: '',
});

const searchDs = ref({ code: '', date: '', startDate: undefined, endDate: undefined });

const isVisibleModal3 = ref(false);
const selectedCity = ref();
const cities = ref([
  { name: 'New York', code: 'NY' },
  { name: 'Rome', code: 'RM' },
  { name: 'London', code: 'LDN' },
  { name: 'Istanbul', code: 'IST' },
  { name: 'Paris', code: 'PRS' },
]);
const handleInputGroup3 = () => {
  isVisibleModal3.value = true;
};
const handleCallbackModal3 = () => {
  codeInfo.name = selectedCity.value.name;
  isVisibleModal3.value = false;
};
</script>
<template>
  <CommSearchPanel collapsed>
    <div class="search-item">
      <label>이름</label>
      <div class="search-input-wrap">
        <InputText v-model="name" />
      </div>
    </div>
    <div class="search-item">
      <label>조회일자</label>
      <div class="search-input-wrap">
        <CommDatePicker :date="date" @update:modelValue="(val: any) => console.log(val)" />
      </div>
    </div>
    <div class="search-item">
      <label>조회기간</label>
      <div class="search-input-wrap">
        <CommRangeDatePicker
          v-model:startValue="searchDs.startDate"
          v-model:endValue="searchDs.endDate"
          @update:startValue="console.log(searchDs)"
          @update:endValue="console.log(searchDs)"
        />
      </div>
    </div>
    <div class="search-item">
      <label>코드</label>
      <div class="search-input-wrap">
        <CommInputGroup
          :inputValue="codeInfo.name"
          :readonly="true"
          width="150px"
          @click="handleInputGroup3"
        />
      </div>
    </div>
    <div class="search-item">
      <label>숫자</label>
      <div class="search-input-wrap">
        <InputNumber v-model="quantity" />
      </div>
    </div>
    <div class="search-item">
      <label>조회일자</label>
      <div class="search-input-wrap">
        <CommDatePicker :date="date" @update:modelValue="(val: any) => console.log(val)" />
      </div>
    </div>
    <template #actions>
      <CommButton label="초기화" type="init" @click="console.log('init')" />
      <CommButton label="조회" type="search" @click="console.log('search')" />
      <CommButton label="처리" type="action" @click="console.log('action')" />
      <CommButton label="팝업" type="go" @click="console.log('go')" />
      <CommButton label="엑셀다운" type="excel" @click="console.log('excel')" />
      <CommButton label="출력" type="print" @click="console.log('print')" />
    </template>
  </CommSearchPanel>
  <section class="data-section">
    <CommGrid
      :paginator="true"
      :data="products"
      :columns="columns"
      :onPage="onPage"
      :totalRecords="totalCount"
      :onClick="onDblClick"
    >
      <template #name="slotProps">
        <span>#{{ slotProps.data.name }}</span>
      </template>

      <template #category="slotProps">
        <span>##{{ slotProps.data.category }}</span>
      </template>
    </CommGrid>
  </section>
  <CommModal
    v-if="selectedItem"
    v-model:visible="isOpenModal"
    header="상품상세"
    :component="modalComp"
    :data="selectedItem"
    width="800px"
    @callback="callbackDetail"
  ></CommModal>
  <!-- <CommDrawer
    v-model:visible="isOpenDetail"
    header="상세 정보"
    :component="drawerComp"
    :data="selectedItem || undefined"
    mode="edit"
    width="1024px"
    @save="callbackDetail"
  /> -->
  <CommModal v-model:visible="isVisibleModal3" header="선택">
    <Select
      v-model="selectedCity"
      :options="cities"
      optionLabel="name"
      placeholder="Select a City"
      class="w-full md:w-56"
    />
    <CommButton label="선택" type="action" @click="handleCallbackModal3" />
  </CommModal>
</template>
