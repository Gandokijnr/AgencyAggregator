import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      agencies: {
        Row: {
          id: string
          user_id: string
          name: string
          address: string | null
          phone: string | null
          email: string | null
          website: string | null
          description: string | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          address?: string | null
          phone?: string | null
          email?: string | null
          website?: string | null
          description?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          address?: string | null
          phone?: string | null
          email?: string | null
          website?: string | null
          description?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      projects: {
        Row: {
          id: string
          agency_id: string
          name: string
          status: string
          value: number
          created_at: string
        }
        Insert: {
          id?: string
          agency_id: string
          name: string
          status?: string
          value?: number
          created_at?: string
        }
        Update: {
          id?: string
          agency_id?: string
          name?: string
          status?: string
          value?: number
          created_at?: string
        }
      }
    }
  }
}