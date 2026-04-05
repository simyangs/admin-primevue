<script setup lang="ts">
import { useLayout } from '@/composables/useLayout';

const { toggleMenu } = useLayout();
</script>
<template>
  <header
    class="flex items-center justify-between px-4 bg-white border-b border-gray-200 z-50 flex-shrink-0"
    style="height: var(--hv-header-height)"
  >
    <div class="flex items-center space-x-3">
      <button
        @click="toggleMenu"
        class="p-2 text-gray-500 hover:bg-gray-100 rounded-md transition-colors flex items-center justify-center"
      >
        <i class="pi pi-bars text-lg"></i>
      </button>
      <div class="flex items-center">
        <div class="w-6 h-6 rounded-full flex items-center justify-center mr-2">
          <span class="text-white font-bold text-xs italic">H</span>
        </div>
        <span class="text-lg font-bold tracking-tight text-gray-800"
          >CM마케팅
          <span class="font-light text-gray-400 ml-1 text-xs uppercase italic">Admin</span></span
        >
      </div>
    </div>

    <div class="flex items-center space-x-4">
      <div class="flex items-center space-x-2 text-xs text-gray-600">
        <span class="bg-gray-100 px-2 py-0.5 rounded font-medium border border-gray-200"
          >영업지원파트</span
        >
        <span class="font-bold text-gray-800">김한화 차장님</span>
        <button
          class="ml-2 hover:text-hanwha-orange underline transition-colors underline-offset-4"
        >
          로그아웃
        </button>
      </div>
    </div>
  </header>
</template>
