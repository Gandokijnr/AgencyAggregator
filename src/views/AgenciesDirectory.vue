<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Mobile-First Container -->
    <div class="w-full">
      <!-- Header Section - Mobile Optimized -->
      <div class="bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          <div class="text-center">
            <h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
              Agencies Directory
            </h1>
            <p class="text-base sm:text-lg lg:text-xl text-blue-100 max-w-2xl mx-auto px-4">
              Discover and connect with professional agencies in our network
            </p>
          </div>
        </div>
      </div>

      <!-- Main Content Container -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <!-- Search and Filter Section - Mobile First -->
        <div class="mb-6 sm:mb-8">
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
            <!-- Mobile Stack, Desktop Row -->
            <div class="space-y-4 sm:space-y-0 sm:flex sm:gap-4">
              <!-- Search Input -->
              <div class="flex-1">
                <div class="relative">
                  <MagnifyingGlassIcon class="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    v-model="searchQuery"
                    type="text"
                    placeholder="Search agencies..."
                    class="w-full pl-10 pr-4 py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  />
                </div>
              </div>
              
              <!-- Filter Controls - Mobile Stack -->
              <div class="flex flex-col sm:flex-row gap-3 sm:gap-2">
                <select
                  v-model="statusFilter"
                  class="px-3 sm:px-4 py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-0 sm:min-w-[140px]"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active Only</option>
                  <option value="inactive">Inactive Only</option>
                </select>
                <button
                  @click="clearFilters"
                  class="px-4 py-3 text-sm sm:text-base bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors whitespace-nowrap"
                >
                  <span class="sm:hidden">Clear Filters</span>
                  <span class="hidden sm:inline">Clear</span>
                </button>
              </div>
            </div>
            
            <!-- Results Count - Mobile Friendly -->
            <div class="mt-4 pt-4 border-t border-gray-100">
              <p class="text-sm text-gray-600 text-center sm:text-left">
                <span class="font-medium">{{ filteredAgencies.length }}</span> 
                {{ filteredAgencies.length === 1 ? 'agency' : 'agencies' }} found
                <span v-if="searchQuery || statusFilter !== 'all'" class="text-blue-600">
                  (filtered)
                </span>
              </p>
            </div>
          </div>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="text-center py-12">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p class="text-gray-500">Loading agencies...</p>
        </div>

        <!-- Agencies Grid - Mobile First Responsive -->
        <div v-else-if="filteredAgencies.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          <div
            v-for="agency in filteredAgencies"
            :key="agency.id"
            class="bg-white rounded-xl sm:rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group"
          >
            <!-- Agency Header - Mobile Optimized -->
            <div class="relative bg-gradient-to-br from-blue-500 to-indigo-600 p-4 sm:p-6 text-white">
              <div class="absolute top-3 right-3 sm:top-4 sm:right-4">
                <span
                  :class="agency.is_active ? 'bg-green-400 text-green-900' : 'bg-red-400 text-red-900'"
                  class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
                >
                  <div
                    :class="agency.is_active ? 'bg-green-600' : 'bg-red-600'"
                    class="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full mr-1 sm:mr-1.5"
                  ></div>
                  <span class="hidden sm:inline">{{ agency.is_active ? 'Active' : 'Inactive' }}</span>
                  <span class="sm:hidden">{{ agency.is_active ? 'A' : 'I' }}</span>
                </span>
              </div>
              
              <div class="flex items-center">
                <div class="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 rounded-full flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
                  <BuildingOfficeIcon class="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                </div>
                <div class="min-w-0 flex-1">
                  <h3 class="text-lg sm:text-xl font-bold truncate">{{ agency.name }}</h3>
                  <p class="text-blue-100 text-xs sm:text-sm">
                    Since {{ new Date(agency.created_at).getFullYear() }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Agency Content - Mobile Optimized -->
            <div class="p-4 sm:p-6">
              <!-- Description -->
              <div class="mb-4">
                <p class="text-gray-600 text-sm leading-relaxed line-clamp-2 sm:line-clamp-3">
                  {{ agency.description || 'No description available.' }}
                </p>
              </div>

              <!-- Contact Information - Mobile Stack -->
              <div class="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                <div v-if="agency.email" class="flex items-center text-xs sm:text-sm text-gray-600">
                  <EnvelopeIcon class="h-3 w-3 sm:h-4 sm:w-4 mr-2 sm:mr-3 text-gray-400 flex-shrink-0" />
                  <span class="truncate">{{ agency.email }}</span>
                </div>
                <div v-if="agency.phone" class="flex items-center text-xs sm:text-sm text-gray-600">
                  <PhoneIcon class="h-3 w-3 sm:h-4 sm:w-4 mr-2 sm:mr-3 text-gray-400 flex-shrink-0" />
                  <span>{{ agency.phone }}</span>
                </div>
                <div v-if="agency.address" class="flex items-center text-xs sm:text-sm text-gray-600">
                  <MapPinIcon class="h-3 w-3 sm:h-4 sm:w-4 mr-2 sm:mr-3 text-gray-400 flex-shrink-0" />
                  <span class="truncate">{{ agency.address }}</span>
                </div>
                <div v-if="agency.website" class="flex items-center text-xs sm:text-sm text-gray-600">
                  <GlobeAltIcon class="h-3 w-3 sm:h-4 sm:w-4 mr-2 sm:mr-3 text-gray-400 flex-shrink-0" />
                  <a
                    :href="agency.website"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-blue-600 hover:text-blue-800 truncate"
                  >
                    {{ agency.website }}
                  </a>
                </div>
              </div>

              <!-- Action Buttons - Mobile Stack -->
              <div class="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <button
                  v-if="canEdit(agency)"
                  @click="editAgency(agency)"
                  class="flex-1 bg-blue-600 text-white px-3 sm:px-4 py-2.5 rounded-lg hover:bg-blue-700 transition-colors font-medium text-xs sm:text-sm flex items-center justify-center"
                >
                  <PencilIcon class="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
                  <span class="hidden sm:inline">Edit Profile</span>
                  <span class="sm:hidden">Edit</span>
                </button>
                <button
                  v-else
                  class="flex-1 bg-gray-100 text-gray-600 px-3 sm:px-4 py-2.5 rounded-lg font-medium text-xs sm:text-sm flex items-center justify-center cursor-default"
                >
                  <EyeIcon class="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
                  <span class="hidden sm:inline">View Only</span>
                  <span class="sm:hidden">View</span>
                </button>
                <button
                  v-if="agency.website"
                  @click="visitWebsite(agency.website)"
                  class="bg-green-100 text-green-700 px-3 sm:px-4 py-2.5 rounded-lg hover:bg-green-200 transition-colors flex items-center justify-center sm:justify-start"
                >
                  <ArrowTopRightOnSquareIcon class="h-3 w-3 sm:h-4 sm:w-4" />
                  <span class="ml-1.5 sm:hidden text-xs">Visit</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State - Mobile Optimized -->
        <div v-else class="text-center py-12 sm:py-16 px-4">
          <BuildingOfficeIcon class="h-12 w-12 sm:h-16 sm:w-16 text-gray-300 mx-auto mb-4" />
          <h3 class="text-lg sm:text-xl font-medium text-gray-900 mb-2">No agencies found</h3>
          <p class="text-sm sm:text-base text-gray-500 mb-6 max-w-md mx-auto">
            {{ searchQuery || statusFilter !== 'all' ? 'Try adjusting your search criteria.' : 'No agencies have been registered yet.' }}
          </p>
          <button
            v-if="searchQuery || statusFilter !== 'all'"
            @click="clearFilters"
            class="inline-flex items-center px-4 py-2 text-sm sm:text-base bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      </div>
    </div>

    <!-- Edit Modal -->
    <AgencyModal
      v-if="showEditModal && selectedAgency"
      :show="showEditModal"
      :agency="selectedAgency"
      @save="handleEditAgency"
      @close="showEditModal = false"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useAgenciesStore } from '@/stores/agencies'
import { useAuthStore } from '@/stores/auth'
import AgencyModal from '@/components/AgencyModal.vue'

import {
  BuildingOfficeIcon,
  MagnifyingGlassIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  GlobeAltIcon,
  PencilIcon,
  EyeIcon,
  ArrowTopRightOnSquareIcon
} from '@heroicons/vue/24/outline'

const agenciesStore = useAgenciesStore()
const authStore = useAuthStore()
const { agencies, loading } = storeToRefs(agenciesStore)

const searchQuery = ref('')
const statusFilter = ref('all')
const showEditModal = ref(false)
const selectedAgency = ref(null)

// Computed property for filtered agencies
const filteredAgencies = computed(() => {
  let filtered = agencies.value || []

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(agency =>
      agency.name?.toLowerCase().includes(query) ||
      agency.description?.toLowerCase().includes(query) ||
      agency.address?.toLowerCase().includes(query) ||
      agency.email?.toLowerCase().includes(query)
    )
  }

  // Filter by status
  if (statusFilter.value !== 'all') {
    filtered = filtered.filter(agency => {
      if (statusFilter.value === 'active') return agency.is_active
      if (statusFilter.value === 'inactive') return !agency.is_active
      return true
    })
  }

  return filtered
})

// Check if current user can edit this agency
const canEdit = (agency) => {
  return authStore.user && agency.user_id === authStore.user.id
}

// Clear all filters
const clearFilters = () => {
  searchQuery.value = ''
  statusFilter.value = 'all'
}

// Edit agency (only if user owns it)
const editAgency = (agency) => {
  if (canEdit(agency)) {
    selectedAgency.value = agency
    showEditModal.value = true
  }
}

// Visit agency website
const visitWebsite = (website) => {
  let url = website
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    url = 'https://' + url
  }
  window.open(url, '_blank', 'noopener,noreferrer')
}

// Handle agency edit
const handleEditAgency = async (agencyData) => {
  if (selectedAgency.value) {
    await agenciesStore.updateAgency(selectedAgency.value.id, agencyData)
  }
  showEditModal.value = false
  selectedAgency.value = null
}

// Load agencies on mount
onMounted(async () => {
  try {
    await agenciesStore.fetchAgencies()
  } catch (error) {
    console.error('Failed to load agencies:', error)
  }
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Mobile-first responsive utilities */
@media (max-width: 640px) {
  .line-clamp-2 {
    -webkit-line-clamp: 2;
    line-clamp: 2;
  }
}

@media (min-width: 640px) {
  .sm\:line-clamp-3 {
    -webkit-line-clamp: 3;
    line-clamp: 3;
  }
}
</style>
