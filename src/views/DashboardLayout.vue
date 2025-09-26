<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Navigation -->
    <nav class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center">
            <h1 class="text-xl font-semibold text-gray-900">Agency Hub</h1>
            <div class="ml-8 flex space-x-4">
              <RouterLink
                to="/dashboard"
                class="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 rounded-md hover:bg-gray-100 transition-colors"
                :class="{ 'text-blue-600 bg-blue-50': $route.name === 'dashboard' }"
              >
                Dashboard
              </RouterLink>
              <RouterLink
                v-if="authStore.isAdmin"
                to="/dashboard/admin"
                class="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 rounded-md hover:bg-gray-100 transition-colors"
                :class="{ 'text-blue-600 bg-blue-50': $route.name === 'admin' }"
              >
                Admin Panel
              </RouterLink>
            </div>
          </div>
          
          <div class="flex items-center space-x-4">
            <div class="text-sm text-gray-600">
              {{ authStore.user?.email }}
              <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 ml-2">
                {{ authStore.isAdmin ? 'Admin' : 'Agency' }}
              </span>
            </div>
            <button
              @click="handleSignOut"
              class="text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </nav>
    
    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const handleSignOut = async () => {
  await authStore.signOut()
  router.push('/auth/login')
}
</script>