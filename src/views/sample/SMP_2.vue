<script setup lang="ts">
import CommCheckbox from '@/components/com/CommCheckbox.vue';
import CommInputGroup from '@/components/com/CommInputGroup.vue';
import CommRadio from '@/components/com/CommRadio.vue';
import CommRangeDatePicker from '@/components/com/CommRangeDatePicker.vue';
import { Button, InputText, Select } from 'primevue';
import { ref } from 'vue';

const detail = ref({
  cntrCd: 'L2408-00123',
  prdCd: 'L1234',
  prdNm: '(무)한화 수호천사 건강보험',
  cntrStCd: '01',
  cntrStdt: '20260101',
  cntrEddt: '20261231',
  rpPrDtCd: '03',
  posts: [],
});
const statusList = ref([
  { code: '01', name: '정상' },
  { code: '02', name: '실효' },
  { code: '03', name: '해지' },
]);
const rpPrDtList = ref([
  { code: '', name: '- 선택 -' },
  { code: '01', name: '월납' },
  { code: '02', name: '연납' },
  { code: '03', name: '일시납' },
]);

const postList = ref([
  { code: '01', name: '자택' },
  { code: '02', name: '직장' },
]);
</script>
<template>
  <div class="detail-section">
    <div class="form-section-title">기본 계약 정보</div>
    <table class="form-table">
      <tbody>
        <tr>
          <th class="required">증권번호</th>
          <td>
            <InputText v-model:modelValue="detail.cntrCd" />
          </td>
          <th class="required">상품명</th>
          <td>
            <CommInputGroup :inputValue="detail.prdNm" :readonly="true" width="300px" />
          </td>
        </tr>
        <tr>
          <th class="required">계약상태</th>
          <td>
            <div class="flex justify-start">
              <CommRadio
                :dataList="statusList"
                v-model:modelValue="detail.cntrStCd"
                inputLabel="name"
                inputValue="code"
                inputName="status"
                @update="() => console.log(detail)"
              />
            </div>
          </td>
          <th class="required">보험기간</th>
          <td>
            <div class="flex items-center space-x-2">
              <CommRangeDatePicker
                v-model:startValue="detail.cntrStdt"
                v-model:endValue="detail.cntrEddt"
                @update:startValue="console.log(detail)"
                @update:endValue="console.log(detail)"
              />
            </div>
          </td>
        </tr>
        <tr>
          <th>납입주기</th>
          <td>
            <Select
              v-model="detail.rpPrDtCd"
              :options="rpPrDtList"
              optionLabel="name"
              optionValue="code"
              @update:modelValue="console.log(detail)"
            />
          </td>
          <th>우편물 수령처</th>
          <td>
            <CommCheckbox
              :dataList="postList"
              v-model:modelValue="detail.posts"
              inputLabel="name"
              inputValue="code"
              inputName="status"
              @update="() => console.log(detail)"
            />
          </td>
        </tr>
      </tbody>
    </table>
    <div class="flex justify-between mt-6">
      <div class="flex gap-2"></div>
      <div class="flex gap-2">
        <Button class="btn" label="저장" @click="console.log(detail)" />
      </div>
    </div>
  </div>
</template>
