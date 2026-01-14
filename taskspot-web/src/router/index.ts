import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import CustomLayout from '@/layouts/CustomLayout.vue'
import { authRoutes } from '@/modules/auth/authRoutes'
import { taskRoutes } from '@/modules/task/taskRoutes'
import { useAuthStore } from '@/modules/auth/authStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: DefaultLayout,
      meta: { requiresAuth: true },
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
router.beforeEach((to) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return '/auth/login'
  }

  if (to.path === '/auth/login' && authStore.isAuthenticated) {
    return '/'
  }
})
export default router
