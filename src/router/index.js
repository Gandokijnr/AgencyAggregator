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
        },
        {
          path: 'agencies',
          name: 'agencies',
          component: () => import('@/views/AgenciesDirectory.vue')
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

  // Not authenticated
  if (requiresAuth && !authStore.isAuthenticated) {
    return next('/auth/login')
  }
  // Admin route, but not admin
  if (requiresAdmin && !authStore.isAdmin) {
    return next('/dashboard')
  }
  // Authenticated admin tries to access /dashboard (root), redirect to admin dashboard
  if (to.path === '/dashboard' && authStore.isAdmin) {
    return next('/dashboard/admin')
  }
  // Authenticated agency tries to access /dashboard/admin, redirect to agency dashboard
  if (to.path === '/dashboard/admin' && !authStore.isAdmin && authStore.isAuthenticated) {
    return next('/dashboard')
  }
  // Authenticated users trying to access auth pages
  if (to.path.startsWith('/auth') && authStore.isAuthenticated) {
    if (authStore.isAdmin) {
      return next('/dashboard/admin')
    } else {
      return next('/dashboard')
    }
  }
  return next()
})

export default router
