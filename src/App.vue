<script setup lang="ts">
// 1. 필요한 레이아웃 및 PrimeVue 컴포넌트 임포트
import MainLayout from '@/components/layout/MainLayout.vue';
import Toast from 'primevue/toast';
import ConfirmDialog from 'primevue/confirmdialog';
import DynamicDialog from 'primevue/dynamicdialog';

/**
 * App.vue는 애플리케이션의 뼈대입니다.
 * 현재는 관리자 메인 레이아웃을 바로 보여주도록 설정합니다.
 * 추후 로그인 여부에 따라 <router-view />를 사용해
 * 로그인 페이지와 메인 레이아웃을 전환할 수 있습니다.
 */
</script>

<template>
  <Toast position="top-right" />

  <ConfirmDialog />

  <DynamicDialog />

  <MainLayout />
</template>
