import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import CustomLayout from '@/layouts/CustomLayout.vue'
import { authRoutes } from '@/modules/auth/authRoutes'
import { taskRoutes } from '@/modules/task/taskRoutes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: DefaultLayout,
      children: [
        ...taskRoutes
        /* {
          path: '',
          name: 'home',
          component: HomeView,
        },
        {
          path: 'about',
          name: 'about',
          component: () => import('../views/AboutView.vue'),
        }, */
      ],
    },
    {
      path: '/auth',
      component: CustomLayout,
      children: [...authRoutes],
    },
  ],
})

export default router
