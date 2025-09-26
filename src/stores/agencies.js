import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '@/lib/supabase'

export const useAgenciesStore = defineStore('agencies', () => {
  const agencies = ref([])
  const currentAgency = ref(null)
  const projects = ref([])
  const loading = ref(false)

  const fetchAgencies = async () => {
    loading.value = true
    try {
      const { data, error } = await supabase
        .from('agencies')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Supabase error:', error)
        throw error
      }
      
      agencies.value = data || []

    } catch (error) {
      console.error('❌ Error fetching agencies:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  const fetchMyAgency = async (userId) => {
    console.log('🔍 fetchMyAgency called with userId:', userId)
    loading.value = true
    
    try {
      console.log('🔍 Making Supabase query for user_id:', userId)
      const { data, error } = await supabase
        .from('agencies')
        .select('*')
        .eq('user_id', userId)
        .single()

      console.log('🔍 Supabase response:', { data, error })
      
      if (error && error.code !== 'PGRST116') {
        console.error('🔍 Supabase error (not PGRST116):', error)
        throw error
      }
      
      if (error && error.code === 'PGRST116') {
        console.log('🔍 No agency found for this user (PGRST116 - no rows returned)')
      }
      
      currentAgency.value = data
      console.log('✅ My Agency profile set to:', currentAgency.value)
      
    } catch (error) {
      console.error('❌ Error fetching agency:', error)
      throw error
    } finally {
      loading.value = false
      console.log('🔍 fetchMyAgency completed')
    }
  }

  const createAgency = async (agencyData) => {
    const { data, error } = await supabase
      .from('agencies')
      .insert(agencyData)
      .select()
      .single()

    if (error) throw error
    currentAgency.value = data
    return data
  }

  const updateAgency = async (id, updates) => {
    const { data, error } = await supabase
      .from('agencies')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    if (currentAgency.value && currentAgency.value.id === id) {
      currentAgency.value = data
    }

    const index = agencies.value.findIndex(a => a.id === id)
    if (index !== -1) {
      agencies.value[index] = data
    }

    return data
  }

  const fetchProjects = async (agencyId) => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('agency_id', agencyId)
      .order('created_at', { ascending: false })

    if (error) throw error
    projects.value = data || []
    return data
  }

  const createProject = async (projectData) => {
    const { data, error } = await supabase
      .from('projects')
      .insert(projectData)
      .select()
      .single()

    if (error) throw error
    projects.value.unshift(data)
    return data
  }

  return {
    agencies,
    currentAgency,
    projects,
    loading,
    fetchAgencies,
    fetchMyAgency,
    createAgency,
    updateAgency,
    fetchProjects,
    createProject
  }
})
