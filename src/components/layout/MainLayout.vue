<script setup lang="ts">
import { computed } from 'vue';
import { useLayout } from '@/composables/useLayout';
import AppTopbar from './AppTopbar.vue';
import AppSidebar from './AppSidebar.vue';
import AppTabManager from './AppTabManager.vue';

/**
 * 레이아웃 구성:
 * 1. Left: AppSidebar (메뉴)
 * 2. Right Top: Header (로그인 정보 등)
 * 3. Right Bottom: AppTabManager (멀티탭 메인 화면)
 */
</script>

<template>
  <div class="main-layout">
    <AppTopbar />
    <div class="flex flex-1 overflow-hidden">
      <AppSidebar />

      <main class="flex-1 flex flex-col min-w-0 overflow-hidden">
        <AppTabManager />
      </main>
    </div>
  </div>
</template>
