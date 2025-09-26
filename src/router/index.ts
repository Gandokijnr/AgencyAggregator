import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/auth/login'
    },
    {
      path: '/auth',
      component: () => import('@/views/AuthLayout.vue'),
      children: [
        {
          path: 'login',
          name: 'login',
          component: () => import('@/views/Login.vue')
        },
        {
          path: 'register',
          name: 'register', 
          component: () => import('@/views/Register.vue')
        }
      ]
    },
    {
      path: '/dashboard',
      component: () => import('@/views/DashboardLayout.vue'),
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'dashboard',
          component: () => import('@/views/Dashboard.vue')
        },
        {
          path: 'admin',
          name: 'admin',
          component: () => import('@/views/AdminDashboard.vue'),
          meta: { requiresAdmin: true }
        }
      ]
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  
  // Initialize auth if not already done
  if (authStore.loading) {
    await authStore.initialize()
  }

  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const requiresAdmin = to.matched.some(record => record.meta.requiresAdmin)

  if (requiresAuth && !authStore.isAuthenticated) {
    next('/auth/login')
  } else if (requiresAdmin && !authStore.isAdmin) {
    next('/dashboard')
  } else if (to.path.startsWith('/auth') && authStore.isAuthenticated) {
    next('/dashboard')
  } else {
    next()
  }
})

export default router