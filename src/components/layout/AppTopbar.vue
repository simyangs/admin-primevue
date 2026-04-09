<script setup lang="ts">
import { useLayout } from '@/composables/useLayout';

const { toggleMenu } = useLayout();
</script>
<template>
  <header
    class="flex items-center justify-between px-4 border-b z-50 flex-shrink-0 topbar"
    style="height: var(--hv-header-height)"
  >
    <div class="flex items-center space-x-3">
      <button
        @click="toggleMenu"
        class="p-2 text-orange-500 hover:bg-gray-100 rounded-md transition-colors flex items-center justify-center"
      >
        <i class="pi pi-bars text-lg"></i>
      </button>
      <div class="flex items-center topbar-title">
        <div class="w-6 h-6 rounded-full flex items-center justify-center mr-2">
          <span class="text-white font-bold text-xs italic">H</span>
        </div>
        <span class="text-lg font-bold tracking-tight"
          >CM마케팅
          <span class="font-light text-gray-400 ml-1 text-xs uppercase italic">Admin</span></span
        >
      </div>
    </div>

    <div class="flex items-center space-x-4">
      <div class="flex items-center space-x-2 text-sm text-gray-200">
        <span class="bg-gray-500 px-2 py-0.5 rounded font-medium border border-gray-200"
          >관리자</span
        >
        <span class="font-bold text-gray-100">김한화</span>
        <button
          class="ml-2 hover:text-hanwha-orange underline transition-colors underline-offset-4"
        >
          로그아웃
        </button>
      </div>
    </div>
  </header>
</template>
