<script setup lang="ts">
import AppSidebar from './AppSidebar.vue';
import AppTabManager from './AppTabManager.vue';
import Button from 'primevue/button';
import '@/assets/styles/layout.css';

/**
 * 레이아웃 구성:
 * 1. Left: AppSidebar (메뉴)
 * 2. Right Top: Header (로그인 정보 등)
 * 3. Right Bottom: AppTabManager (멀티탭 메인 화면)
 */
</script>

<template>
  <div class="admin-layout">
    <aside class="layout-sidebar">
      <AppSidebar />
    </aside>

    <div class="layout-main-wrapper">
      <header class="layout-topbar">
        <div class="topbar-left"></div>

        <div class="topbar-right">
          <div class="user-profile">
            <span class="user-name">홍길동 차장 (디지털개발팀)</span>
            <Button
              icon="pi pi-sign-out"
              label="로그아웃"
              class="p-button-sm p-button-text p-button-secondary"
            />
          </div>
        </div>
      </header>

      <main class="layout-content">
        <AppTabManager />
      </main>
    </div>
  </div>
</template>
