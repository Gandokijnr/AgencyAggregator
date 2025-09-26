<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
    <div class="max-w-md w-full">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Agency Hub</h1>
        <p class="text-gray-600">Professional agency management platform</p>
      </div>
      <div class="bg-white rounded-2xl shadow-xl p-8">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>