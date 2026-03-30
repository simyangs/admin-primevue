import { createRouter, createWebHistory } from 'vue-router';
import SMP_000 from '@/views/sample/SMP_000.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: SMP_000,
    },
    {
      path: '/SMP0001',
      name: 'sample1',
      component: () => import('@/views/sample/SMP_001.vue'),
    },
    {
      path: '/SMP0002',
      name: 'sample2',
      component: () => import('@/views/sample/SMP_002.vue'),
    },
  ],
});

export default router;
