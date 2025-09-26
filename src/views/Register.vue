<template>
  <div>
    <h2 class="text-2xl font-bold text-gray-900 mb-6 text-center">Create Account</h2>
    
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
          minlength="6"
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          placeholder="Enter your password"
        />
      </div>
      
      <div>
        <label for="role" class="block text-sm font-medium text-gray-700 mb-2">
          Account Type
        </label>
        <select
          id="role"
          v-model="form.role"
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
        >
          <option value="agency">Agency</option>
          <option value="admin">Administrator</option>
        </select>
      </div>
      
      <div v-if="error" class="p-4 bg-red-50 border border-red-200 rounded-lg">
        <p class="text-red-600 text-sm">{{ error }}</p>
      </div>
      
      <div v-if="success" class="p-4 bg-green-50 border border-green-200 rounded-lg">
        <p class="text-green-600 text-sm">{{ success }}</p>
      </div>
      
      <button
        type="submit"
        :disabled="loading"
        class="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-3 px-4 rounded-lg transition-colors"
      >
        {{ loading ? 'Creating Account...' : 'Create Account' }}
      </button>
    </form>
    
    <div class="mt-6 text-center">
      <p class="text-gray-600">
        Already have an account?
        <RouterLink to="/auth/login" class="text-blue-600 hover:text-blue-800 font-medium">
          Sign in
        </RouterLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const form = ref({
  email: '',
  password: '',
  role: 'agency'
})

const loading = ref(false)
const error = ref('')
const success = ref('')

const handleSubmit = async () => {
  loading.value = true
  error.value = ''
  success.value = ''
  
  try {
    await authStore.signUp(form.value.email, form.value.password, form.value.role)
    success.value = 'Account created successfully! Please check your email to confirm your account.'
    form.value = { email: '', password: '', role: 'agency' }
  } catch (err: any) {
    error.value = err.message || 'Failed to create account'
  } finally {
    loading.value = false
  }
}
</script>