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
const { layoutState } = useLayout();
const containerClass = computed(() => {
  return {
    'layout-static-inactive': layoutState.staticMenuInactive,
  };
});
</script>

<template>
  <div class="layout-wrapper layout-static" :class="containerClass">
    <AppTopbar />
    <AppSidebar />

    <div class="layout-main-container">
      <main class="layout-content">
        <AppTabManager />
      </main>
    </div>
  </div>
</template>
