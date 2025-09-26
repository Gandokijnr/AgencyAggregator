<template>
  <div>
    <h2 class="text-2xl font-bold text-gray-900 mb-6 text-center">Sign In</h2>
    
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
          Email Address
        </label>
        <input
          id="email"
          v-model="form.email"
          type="email"
          required
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          placeholder="Enter your email"
        />
      </div>
      
      <div>
        <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
          Password
        </label>
        <input
          id="password"
          v-model="form.password"
          type="password"
          required
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          placeholder="Enter your password"
        />
      </div>
      
      <div v-if="error" class="p-4 bg-red-50 border border-red-200 rounded-lg">
        <p class="text-red-600 text-sm">{{ error }}</p>
      </div>
      
      <button
        type="submit"
        :disabled="loading"
        class="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-3 px-4 rounded-lg transition-colors"
      >
        {{ loading ? 'Signing In...' : 'Sign In' }}
      </button>
    </form>
    
    <div class="mt-6 text-center">
      <p class="text-gray-600">
        Don't have an account?
        <RouterLink to="/auth/register" class="text-blue-600 hover:text-blue-800 font-medium">
          Sign up
        </RouterLink>
      </p>
    </div>

    <div class="mt-8 p-4 bg-gray-50 rounded-lg">
      <p class="text-sm text-gray-600 mb-2 font-medium">Demo Accounts:</p>
      <div class="space-y-1 text-xs text-gray-500">
        <p><strong>Admin:</strong> admin@demo.com / admin123</p>
        <p><strong>Agency:</strong> agency@demo.com / agency123</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const form = ref({
  email: '',
  password: ''
})

const loading = ref(false)
const error = ref('')

const handleSubmit = async () => {
  loading.value = true
  error.value = ''
  
  try {
    await authStore.signIn(form.value.email, form.value.password)
    router.push('/dashboard')
  } catch (err: any) {
    error.value = err.message || 'Failed to sign in'
  } finally {
    loading.value = false
  }
}
</script>