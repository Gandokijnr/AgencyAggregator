import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '@/lib/supabase'
import type { Database } from '@/lib/supabase'

type Agency = Database['public']['Tables']['agencies']['Row']
type Project = Database['public']['Tables']['projects']['Row']

export const useAgenciesStore = defineStore('agencies', () => {
  const agencies = ref<Agency[]>([])
  const currentAgency = ref<Agency | null>(null)
  const projects = ref<Project[]>([])
  const loading = ref(false)

  const fetchAgencies = async () => {
    loading.value = true
    try {
      const { data, error } = await supabase
        .from('agencies')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      agencies.value = data || []
    } catch (error) {
      console.error('Error fetching agencies:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  const fetchMyAgency = async (userId: string) => {
    loading.value = true
    try {
      const { data, error } = await supabase
        .from('agencies')
        .select('*')
        .eq('user_id', userId)
        .single()

      if (error && error.code !== 'PGRST116') throw error
      currentAgency.value = data
    } catch (error) {
      console.error('Error fetching agency:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  const createAgency = async (agencyData: Database['public']['Tables']['agencies']['Insert']) => {
    const { data, error } = await supabase
      .from('agencies')
      .insert(agencyData)
      .select()
      .single()

    if (error) throw error
    currentAgency.value = data
    return data
  }

  const updateAgency = async (id: string, updates: Database['public']['Tables']['agencies']['Update']) => {
    const { data, error } = await supabase
      .from('agencies')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    
    if (currentAgency.value?.id === id) {
      currentAgency.value = data
    }
    
    const index = agencies.value.findIndex(a => a.id === id)
    if (index !== -1) {
      agencies.value[index] = data
    }
    
    return data
  }

  const fetchProjects = async (agencyId: string) => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('agency_id', agencyId)
      .order('created_at', { ascending: false })

    if (error) throw error
    projects.value = data || []
    return data
  }

  const createProject = async (projectData: Database['public']['Tables']['projects']['Insert']) => {
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