<script setup lang="ts">
import { useLayout } from '@/composables/useLayout';
import button from 'primevue/button';

const { toggleMenu } = useLayout();
</script>
<template>
  <div class="layout-topbar">
    <div class="layout-topbar-logo-container">
      <button class="layout-menu-button layout-topbar-action" @click="toggleMenu">
        <i class="pi pi-bars"></i>
      </button>
      <router-link to="/" class="layout-topbar-logo">로고</router-link>
    </div>
    <div class="layout-topbar-actions">액션</div>
  </div>
</template>
