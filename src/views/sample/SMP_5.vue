<script setup lang="ts">
import CommEditor2 from '@/components/com/CommEditor2.vue';
import { ref } from 'vue';

const content = ref('');
const print = () => {
  console.log(content.value);
};
const setContent = () => {
  content.value = 'test!!!!!';
};
</script>
<template>
  <div style="width: 1000px">
    <CommEditor2 v-model:model-value="content" />
    <button @click="print">내용</button>
    <button @click="setContent">입력</button>
  </div>
</template>
