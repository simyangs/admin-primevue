<script setup lang="ts">
import CommEditor from '@/components/com/CommEditor.vue';
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
  <div style="width: 100%; overflow-y: auto">
    <CommEditor v-model:model-value="content" height="600px" />
    <button @click="print">내용</button>
  </div>
</template>
