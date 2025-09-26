<template>
  <div class="space-y-8">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-2xl font-bold text-gray-900">Admin Dashboard</h2>
        <p class="text-gray-600 mt-1">Manage all agencies and their data</p>
      </div>
      <div class="text-sm text-gray-600">
        Total Agencies: {{ agencies.length }}
      </div>
    </div>

    <!-- Stats Overview -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div class="flex items-center">
          <div class="p-2 bg-blue-100 rounded-lg">
            <BuildingOfficeIcon class="h-6 w-6 text-blue-600" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">Total Agencies</p>
            <p class="text-2xl font-bold text-gray-900">{{ agencies.length }}</p>
          </div>
        </div>
      </div>
      
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div class="flex items-center">
          <div class="p-2 bg-green-100 rounded-lg">
            <CheckCircleIcon class="h-6 w-6 text-green-600" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">Active Agencies</p>
            <p class="text-2xl font-bold text-gray-900">{{ activeAgencies }}</p>
          </div>
        </div>
      </div>
      
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div class="flex items-center">
          <div class="p-2 bg-red-100 rounded-lg">
            <XCircleIcon class="h-6 w-6 text-red-600" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">Inactive Agencies</p>
            <p class="text-2xl font-bold text-gray-900">{{ inactiveAgencies }}</p>
          </div>
        </div>
      </div>
      
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div class="flex items-center">
          <div class="p-2 bg-indigo-100 rounded-lg">
            <CalendarIcon class="h-6 w-6 text-indigo-600" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">This Month</p>
            <p class="text-2xl font-bold text-gray-900">{{ thisMonthAgencies }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Agencies List -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-200">
      <div class="p-6 border-b border-gray-200">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold text-gray-900">All Agencies</h3>
          <div class="flex space-x-4">
            <select
              v-model="statusFilter"
              class="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Agency
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="agency in filteredAgencies" :key="agency.id" class="hover:bg-gray-50">
              <td class="px-6 py-4">
                <div>
                  <div class="text-sm font-medium text-gray-900">{{ agency.name }}</div>
                  <div v-if="agency.description" class="text-sm text-gray-500 truncate max-w-xs">
                    {{ agency.description }}
                  </div>
                </div>
              </td>
              <td class="px-6 py-4">
                <div class="text-sm text-gray-900">{{ agency.email || 'No email' }}</div>
                <div class="text-sm text-gray-500">{{ agency.phone || 'No phone' }}</div>
              </td>
              <td class="px-6 py-4">
                <span :class="agency.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'"
                      class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium">
                  {{ agency.is_active ? 'Active' : 'Inactive' }}
                </span>
              </td>
              <td class="px-6 py-4 text-sm text-gray-500">
                {{ new Date(agency.created_at).toLocaleDateString() }}
              </td>
              <td class="px-6 py-4">
                <div class="flex space-x-2">
                  <button
                    @click="editAgency(agency)"
                    class="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Edit
                  </button>
                  <button
                    @click="toggleAgencyStatus(agency)"
                    :class="agency.is_active ? 'text-red-600 hover:text-red-800' : 'text-green-600 hover:text-green-800'"
                    class="text-sm font-medium"
                  >
                    {{ agency.is_active ? 'Deactivate' : 'Activate' }}
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <div v-if="filteredAgencies.length === 0" class="text-center py-12">
          <BuildingOfficeIcon class="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p class="text-gray-500">No agencies found</p>
        </div>
      </div>
    </div>

    <!-- Edit Modal -->
    <AgencyModal
      v-if="showEditModal && selectedAgency"
      :show="showEditModal"
      :agency="selectedAgency"
      @close="showEditModal = false"
      @save="handleEditAgency"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useAgenciesStore } from '@/stores/agencies'
import AgencyModal from '@/components/AgencyModal.vue'
import type { Database } from '@/lib/supabase'

import {
  BuildingOfficeIcon,
  CheckCircleIcon,
  XCircleIcon,
  CalendarIcon
} from '@heroicons/vue/24/outline'

type Agency = Database['public']['Tables']['agencies']['Row']

const agenciesStore = useAgenciesStore()

const statusFilter = ref('')
const showEditModal = ref(false)
const selectedAgency = ref<Agency | null>(null)

const { agencies } = agenciesStore

const activeAgencies = computed(() => {
  return agencies.filter(a => a.is_active).length
})

const inactiveAgencies = computed(() => {
  return agencies.filter(a => !a.is_active).length
})

const thisMonthAgencies = computed(() => {
  const thisMonth = new Date()
  thisMonth.setDate(1)
  return agencies.filter(a => new Date(a.created_at) >= thisMonth).length
})

const filteredAgencies = computed(() => {
  if (!statusFilter.value) return agencies
  
  const isActive = statusFilter.value === 'active'
  return agencies.filter(agency => agency.is_active === isActive)
})

onMounted(async () => {
  await agenciesStore.fetchAgencies()
})

const editAgency = (agency: Agency) => {
  selectedAgency.value = agency
  showEditModal.value = true
}

const toggleAgencyStatus = async (agency: Agency) => {
  await agenciesStore.updateAgency(agency.id, {
    is_active: !agency.is_active
  })
}

const handleEditAgency = async (agencyData: any) => {
  if (selectedAgency.value) {
    await agenciesStore.updateAgency(selectedAgency.value.id, agencyData)
  }
  showEditModal.value = false
  selectedAgency.value = null
}
</script>