<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Mobile-First Responsive Navigation -->
    <nav class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Left side - Logo and Desktop Nav -->
          <div class="flex items-center">
            <h1 class="text-lg sm:text-xl font-semibold text-gray-900">Agency Hub</h1>
            
            <!-- Desktop Navigation -->
            <div class="hidden md:ml-8 md:flex md:space-x-4">
              <RouterLink
                to="/dashboard"
                class="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 rounded-md hover:bg-gray-100 transition-colors"
                :class="{ 'text-blue-600 bg-blue-50': $route.name === 'dashboard' }"
              >
                Dashboard
              </RouterLink>
              <RouterLink
                to="/dashboard/agencies"
                class="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 rounded-md hover:bg-gray-100 transition-colors"
                :class="{ 'text-blue-600 bg-blue-50': $route.name === 'agencies' }"
              >
                Agencies Directory
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
          
          <!-- Right side - User info and Mobile menu -->
          <div class="flex items-center space-x-2 sm:space-x-4">
            <!-- User Info - Hidden on small screens -->
            <div class="hidden sm:block text-sm text-gray-600">
              <div class="text-right">
                <div class="truncate max-w-[150px] lg:max-w-none">{{ authStore.user?.email }}</div>
                <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mt-1">
                  {{ authStore.isAdmin ? 'Admin' : 'Agency' }}
                </span>
              </div>
            </div>
            
            <!-- Mobile User Badge -->
            <div class="sm:hidden">
              <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {{ authStore.isAdmin ? 'Admin' : 'Agency' }}
              </span>
            </div>
            
            <!-- Sign Out Button -->
            <button
              @click="handleSignOut"
              class="text-xs sm:text-sm text-gray-500 hover:text-gray-700 transition-colors px-2 py-1 rounded"
            >
              <span class="hidden sm:inline">Sign Out</span>
              <span class="sm:hidden">Out</span>
            </button>
            
            <!-- Mobile Menu Button -->
            <button
              @click="mobileMenuOpen = !mobileMenuOpen"
              class="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 transition-colors"
            >
              <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        
        <!-- Mobile Navigation Menu -->
        <div v-if="mobileMenuOpen" class="md:hidden border-t border-gray-200 py-3">
          <div class="space-y-1">
            <!-- Mobile User Info -->
            <div class="px-3 py-2 text-sm text-gray-600 border-b border-gray-100 mb-2">
              <div class="font-medium truncate">{{ authStore.user?.email }}</div>
            </div>
            
            <!-- Mobile Navigation Links -->
            <RouterLink
              to="/dashboard"
              @click="mobileMenuOpen = false"
              class="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
              :class="{ 'text-blue-600 bg-blue-50': $route.name === 'dashboard' }"
            >
              Dashboard
            </RouterLink>
            <RouterLink
              to="/dashboard/agencies"
              @click="mobileMenuOpen = false"
              class="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
              :class="{ 'text-blue-600 bg-blue-50': $route.name === 'agencies' }"
            >
              Agencies Directory
            </RouterLink>
            <RouterLink
              v-if="authStore.isAdmin"
              to="/dashboard/admin"
              @click="mobileMenuOpen = false"
              class="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
              :class="{ 'text-blue-600 bg-blue-50': $route.name === 'admin' }"
            >
              Admin Panel
            </RouterLink>
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

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()
const mobileMenuOpen = ref(false)

const handleSignOut = async () => {
  await authStore.signOut()
  router.push('/auth/login')
}
</script>