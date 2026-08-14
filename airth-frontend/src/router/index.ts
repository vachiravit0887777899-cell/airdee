import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      // lazy-load หน้า Home เพื่อลดขนาด bundle แรกที่โหลด
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/province/:id',
      name: 'province-detail',
      component: () => import('../views/ProvinceDetailView.vue'),
    },
  ],
})

export default router