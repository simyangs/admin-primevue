import { defineAsyncComponent } from 'vue';
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import SMP_000 from '@/views/sample/SMP_0.vue';

const arrRoute: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'dashboard',
    component: SMP_000,
  },
];

for (let i = 1; i < 13; i++) {
  arrRoute.push({
    path: `/SMP${i}`,
    name: `sample${i}`,
    component: () => import(`@/views/sample/SMP_${i}.vue`),
  });
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: arrRoute,
});

export default router;
