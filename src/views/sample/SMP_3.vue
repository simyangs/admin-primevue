<script setup lang="ts">
import type { Product } from '@/types/sample';
import { Button } from 'primevue';

// CommonModal에서 v-bind="data"로 넘겨준 데이터가 props로 들어옵니다.
const props = defineProps<Product>();

const emit = defineEmits(['close', 'callback']);

const callback = () => {
  const obj = {
    test: 1,
    test2: '2',
    test3: [3, 4],
    test4: { val: 4 },
  };
  emit('callback', obj);
};

console.log(props);
</script>

<template>
  <div>
    <div class="form-section-title">타이틀</div>
    <table class="form-table">
      <tr>
        <th>ID</th>
        <td>{{ id }}</td>
      </tr>
      <tr>
        <th>이름</th>
        <td>{{ name }}</td>
      </tr>
      <tr>
        <th>카테고리</th>
        <td>{{ category }}</td>
      </tr>
      <tr>
        <th>수량</th>
        <td>{{ quantity }}</td>
      </tr>
    </table>
    <div class="flex justify-end mt-6">
      <div class="flex gap-2">
        <Button class="btn" label="확인" @click="callback" />
      </div>
    </div>
  </div>
</template>
