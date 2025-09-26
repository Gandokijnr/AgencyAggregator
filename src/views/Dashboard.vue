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
    <div v-if="!authStore.isAdmin" class="bg-white rounded-xl shadow-sm border border-gray-200">
      <div class="p-6">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-lg font-semibold text-gray-900">Agency Profile</h3>
          <button
            v-if="currentAgency"
            @click="showEditModal = true"
            class="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            <PencilIcon class="h-4 w-4 mr-2" />
            Edit Profile
          </button>
        </div>

        <!-- Agency Info -->
        <div v-if="currentAgency" class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-500 mb-1">Company Name</label>
              <p class="text-gray-900 font-medium">{{ currentAgency.name }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-500 mb-1">Email</label>
              <p class="text-gray-900">{{ currentAgency.email || 'Not provided' }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-500 mb-1">Phone</label>
              <p class="text-gray-900">{{ currentAgency.phone || 'Not provided' }}</p>
            </div>
          </div>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-500 mb-1">Address</label>
              <p class="text-gray-900">{{ currentAgency.address || 'Not provided' }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-500 mb-1">Website</label>
              <p class="text-gray-900">{{ currentAgency.website || 'Not provided' }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-500 mb-1">Status</label>
              <span :class="currentAgency.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'"
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium">
                {{ currentAgency.is_active ? 'Active' : 'Inactive' }}
              </span>
            </div>
          </div>
          <div v-if="currentAgency.description" class="md:col-span-2">
            <label class="block text-sm font-medium text-gray-500 mb-1">Description</label>
            <p class="text-gray-900">{{ currentAgency.description }}</p>
          </div>
        </div>

        <!-- Create Profile -->
        <div v-else class="text-center py-8">
          <BuildingOfficeIcon class="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 class="text-lg font-medium text-gray-900 mb-2">Complete Your Profile</h3>
          <p class="text-gray-600 mb-4">Create your agency profile to get started</p>
          <button
            @click="showCreateModal = true"
            class="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            <PlusIcon class="h-4 w-4 mr-2" />
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

    <!-- Modals -->
    <AgencyModal
      v-if="showCreateModal"
      :show="showCreateModal"
      @close="showCreateModal = false"
      @save="handleCreateAgency"
    />

    <AgencyModal
      v-if="showEditModal && currentAgency"
      :show="showEditModal"
      :agency="currentAgency"
      @close="showEditModal = false"
      @save="handleEditAgency"
    />

    <ProjectModal
      v-if="showProjectModal"
      :show="showProjectModal"
      :agency-id="currentAgency?.id"
      @close="showProjectModal = false"
      @save="handleCreateProject"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
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

const showCreateModal = ref(false)
const showEditModal = ref(false)
const showProjectModal = ref(false)

const { currentAgency, projects } = agenciesStore

const activeProjects = computed(() => {
  return projects.filter(p => p.status === 'active').length
})

const totalValue = computed(() => {
  return projects.reduce((sum, project) => sum + project.value, 0)
})

onMounted(async () => {
  if (!authStore.isAdmin && authStore.user) {
    await agenciesStore.fetchMyAgency(authStore.user.id)
    if (currentAgency.value) {
      await agenciesStore.fetchProjects(currentAgency.value.id)
    }
  }
})

const handleCreateAgency = async (agencyData: any) => {
  if (authStore.user) {
    await agenciesStore.createAgency({
      ...agencyData,
      user_id: authStore.user.id
    })
    await agenciesStore.fetchProjects(currentAgency.value!.id)
  }
  showCreateModal.value = false
}

const handleEditAgency = async (agencyData: any) => {
  if (currentAgency.value) {
    await agenciesStore.updateAgency(currentAgency.value.id, agencyData)
  }
  showEditModal.value = false
}

const handleCreateProject = async (projectData: any) => {
  await agenciesStore.createProject(projectData)
  showProjectModal.value = false
}
</script>