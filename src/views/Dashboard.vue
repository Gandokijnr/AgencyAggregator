<template>
  <div class="space-y-8">
    <!-- Header -->
    <div>
      <h2 class="text-2xl font-bold text-gray-900">
        {{ authStore.isAdmin ? 'Admin Dashboard' : 'Agency Dashboard' }}
      </h2>
      <p class="text-gray-600 mt-1">
        {{ authStore.isAdmin ? 'Manage all agencies in the platform' : 'Manage your agency profile and track performance' }}
      </p>
    </div>

    <!-- Agency Profile Section -->
    <div v-if="!authStore.isAdmin" class="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl shadow-lg border border-blue-200">
      <div class="p-8">
        <!-- Profile Header -->
        <div v-if="currentAgency" class="text-center mb-8">
          <div class="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full mx-auto mb-4 flex items-center justify-center">
            <BuildingOfficeIcon class="h-12 w-12 text-white" />
          </div>
          <h2 class="text-2xl font-bold text-gray-900 mb-2">{{ currentAgency.name }}</h2>
          <div class="flex items-center justify-center space-x-4">
            <span :class="currentAgency.is_active ? 'bg-green-100 text-green-800 border-green-200' : 'bg-red-100 text-red-800 border-red-200'"
                  class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border">
              <div :class="currentAgency.is_active ? 'bg-green-400' : 'bg-red-400'" class="w-2 h-2 rounded-full mr-2"></div>
              {{ currentAgency.is_active ? 'Active' : 'Inactive' }}
            </span>
            <button
              @click="showEditModal = true"
              class="inline-flex items-center px-4 py-2 bg-white text-blue-600 text-sm font-medium rounded-lg hover:bg-blue-50 transition-colors border border-blue-200 shadow-sm"
            >
              <PencilIcon class="h-4 w-4 mr-2" />
              Edit Profile
            </button>
          </div>
        </div>

        <!-- Profile Details Cards -->
        <div v-if="currentAgency" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- Contact Information Card -->
          <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </div>
              Contact Info
            </h3>
            <div class="space-y-3">
              <div>
                <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Email</label>
                <p class="text-gray-900 font-medium">{{ currentAgency.email || 'Not provided' }}</p>
              </div>
              <div>
                <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Phone</label>
                <p class="text-gray-900 font-medium">{{ currentAgency.phone || 'Not provided' }}</p>
              </div>
              <div>
                <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Website</label>
                <p class="text-gray-900 font-medium break-all">{{ currentAgency.website || 'Not provided' }}</p>
              </div>
            </div>
          </div>

          <!-- Location Card -->
          <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <div class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
              </div>
              Location
            </h3>
            <div>
              <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Address</label>
              <p class="text-gray-900 font-medium leading-relaxed">{{ currentAgency.address || 'Not provided' }}</p>
            </div>
          </div>

          <!-- About Card -->
          <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100 md:col-span-2 lg:col-span-1">
            <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <div class="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                <svg class="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              About
            </h3>
            <div>
              <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Description</label>
              <p class="text-gray-900 leading-relaxed">{{ currentAgency.description || 'No description provided' }}</p>
            </div>
          </div>
        </div>

        <!-- Create Profile -->
        <div v-else class="text-center py-12">
          <div class="w-24 h-24 bg-gray-100 rounded-full mx-auto mb-6 flex items-center justify-center">
            <BuildingOfficeIcon class="h-12 w-12 text-gray-400" />
          </div>
          <h3 class="text-2xl font-bold text-gray-900 mb-3">Complete Your Profile</h3>
          <p class="text-gray-600 mb-6 max-w-md mx-auto">Create your agency profile to get started and showcase your business to potential clients</p>
          <button
            @click="showCreateModal = true"
            class="inline-flex items-center px-6 py-3 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
          >
            <PlusIcon class="h-5 w-5 mr-2" />
            Create Profile
          </button>
        </div>
      </div>
    </div>

    <!-- Performance Overview -->
    <div v-if="currentAgency && !authStore.isAdmin" class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div class="flex items-center">
          <div class="p-2 bg-blue-100 rounded-lg">
            <BriefcaseIcon class="h-6 w-6 text-blue-600" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">Total Projects</p>
            <p class="text-2xl font-bold text-gray-900">{{ projects.length }}</p>
          </div>
        </div>
      </div>
      
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div class="flex items-center">
          <div class="p-2 bg-green-100 rounded-lg">
            <CheckCircleIcon class="h-6 w-6 text-green-600" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">Active Projects</p>
            <p class="text-2xl font-bold text-gray-900">{{ activeProjects }}</p>
          </div>
        </div>
      </div>
      
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div class="flex items-center">
          <div class="p-2 bg-indigo-100 rounded-lg">
            <CurrencyDollarIcon class="h-6 w-6 text-indigo-600" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">Total Value</p>
            <p class="text-2xl font-bold text-gray-900">${{ totalValue.toLocaleString() }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Projects Section -->
    <div v-if="currentAgency && !authStore.isAdmin" class="bg-white rounded-xl shadow-sm border border-gray-200">
      <div class="p-6">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-lg font-semibold text-gray-900">Projects</h3>
          <button
            @click="showProjectModal = true"
            class="inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors"
          >
            <PlusIcon class="h-4 w-4 mr-2" />
            Add Project
          </button>
        </div>

        <div v-if="projects.length > 0" class="space-y-4">
          <div v-for="project in projects" :key="project.id" 
               class="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
            <div class="flex items-center justify-between">
              <div>
                <h4 class="font-medium text-gray-900">{{ project.name }}</h4>
                <p class="text-sm text-gray-600">${{ project.value.toLocaleString() }}</p>
              </div>
              <span :class="project.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'"
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium">
                {{ project.status }}
              </span>
            </div>
          </div>
        </div>
        
        <div v-else class="text-center py-8">
          <BriefcaseIcon class="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p class="text-gray-500">No projects yet. Add your first project to get started.</p>
        </div>
      </div>
    </div>

    <!-- Admin redirect for agency users -->
    <div v-if="authStore.isAdmin" class="bg-blue-50 border border-blue-200 rounded-xl p-6 text-center">
      <UserGroupIcon class="h-12 w-12 text-blue-600 mx-auto mb-4" />
      <h3 class="text-lg font-semibold text-blue-900 mb-2">Welcome, Administrator</h3>
      <p class="text-blue-700 mb-4">Access the admin panel to manage all agencies</p>
      <RouterLink
        to="/dashboard/admin"
        class="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
      >
        Go to Admin Panel
        <ArrowRightIcon class="h-4 w-4 ml-2" />
      </RouterLink>
    </div>

    <!-- Edit Modal -->
    <AgencyModal
      v-if="showEditModal && currentAgency"
      :show="showEditModal"
      :agency="currentAgency"
      @save="handleEditAgency"
      @close="showEditModal = false"
    />

    <!-- Create Modal -->
    <AgencyModal
      v-if="showCreateModal"
      :show="showCreateModal"
      @save="handleCreateAgency"
      @close="showCreateModal = false"
    />

    <!-- Project Modal -->
    <ProjectModal
      v-if="showProjectModal && currentAgency"
      :show="showProjectModal"
      :agency-id="currentAgency.id"
      @save="handleCreateProject"
      @close="showProjectModal = false"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import { useAgenciesStore } from '@/stores/agencies'
import AgencyModal from '@/components/AgencyModal.vue'
import ProjectModal from '@/components/ProjectModal.vue'

import {
  BuildingOfficeIcon,
  BriefcaseIcon,
  CheckCircleIcon,
  CurrencyDollarIcon,
  PencilIcon,
  PlusIcon,
  UserGroupIcon,
  ArrowRightIcon
} from '@heroicons/vue/24/outline'

const authStore = useAuthStore()
const agenciesStore = useAgenciesStore()
const { currentAgency, projects } = storeToRefs(agenciesStore)

const showCreateModal = ref(false)
const showEditModal = ref(false)
const showProjectModal = ref(false)

const agencyProfileName = computed(() => {
  if (currentAgency && currentAgency.value && currentAgency.value.name) {
    return currentAgency.value.name;
  }
  return 'Agency Profile';
});

const activeProjects = computed(() => {
  return (projects.value || []).filter(p => p.status === 'active').length
})

const totalValue = computed(() => {
  return (projects.value || []).reduce((sum, project) => sum + project.value, 0)
})

onMounted(async () => {
  console.log('🔍 Dashboard onMounted - isAdmin:', authStore.isAdmin, 'user:', authStore.user)
  
  if (!authStore.isAdmin && authStore.user) {
    console.log('🔍 Calling fetchMyAgency with user.id:', authStore.user.id)
    
    try {
      await agenciesStore.fetchMyAgency(authStore.user.id)
      
      if (currentAgency.value) {
        console.log("✅ Agency profile loaded:", currentAgency.value)
        await agenciesStore.fetchProjects(currentAgency.value.id)
      } else {
        console.log("⚠️ Agency profile: not found or not loaded")
      }
    } catch (error) {
      console.error('❌ Error in Dashboard onMounted:', error)
    }
  } else {
    console.log('🔍 Skipping fetchMyAgency - either admin or no user')
  }
});


const handleCreateAgency = async (agencyData) => {
  if (authStore.user) {
    const newAgency = await agenciesStore.createAgency({
      ...agencyData,
      user_id: authStore.user.id
    })
    if (newAgency && newAgency.id) {
      await agenciesStore.fetchProjects(newAgency.id)
    }
  }
  showCreateModal.value = false
  showEditModal.value = false;
}

const handleEditAgency = async (agencyData) => {
  if (currentAgency.value) {
    await agenciesStore.updateAgency(currentAgency.value.id, agencyData)
  }
  showEditModal.value = false
}

const handleCreateProject = async (projectData) => {
  await agenciesStore.createProject(projectData)
  showProjectModal.value = false
}
</script>