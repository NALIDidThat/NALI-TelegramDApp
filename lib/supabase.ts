import { createClient } from '@supabase/supabase-js'

// Define types for our database schema
export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          telegram_id: string
          first_name: string | null
          last_name: string | null
          username: string | null
          status: 'active' | 'inactive' | 'suspended'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          telegram_id: string
          first_name?: string | null
          last_name?: string | null
          username?: string | null
          status?: 'active' | 'inactive' | 'suspended'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          telegram_id?: string
          first_name?: string | null
          last_name?: string | null
          username?: string | null
          status?: 'active' | 'inactive' | 'suspended'
          created_at?: string
          updated_at?: string
        }
      }
      onboarding_progress: {
        Row: {
          id: string
          user_id: string
          current_step: 'welcome' | 'intro' | 'journeys' | 'control' | 'name_registry' | 'create' | 'completed'
          is_completed: boolean
          started_at: string
          completed_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          current_step: 'welcome' | 'intro' | 'journeys' | 'control' | 'name_registry' | 'create' | 'completed'
          is_completed?: boolean
          started_at?: string
          completed_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          current_step?: 'welcome' | 'intro' | 'journeys' | 'control' | 'name_registry' | 'create' | 'completed'
          is_completed?: boolean
          started_at?: string
          completed_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      user_preferences: {
        Row: {
          id: string
          user_id: string
          theme_preference: string
          notifications_enabled: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          theme_preference?: string
          notifications_enabled?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          theme_preference?: string
          notifications_enabled?: boolean
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}

// Initialize the Supabase client
const supabaseUrl = 'https://osmzvphvuetchqqgfqxa.supabase.co'
const SUPABASE_KEY = 'SUPABASE_CLIENT_API_KEY'

if (!supabaseUrl || !SUPABASE_KEY) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, SUPABASE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
})

// Helper functions for common operations
export const getUserByTelegramId = async (telegramId: string) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('telegram_id', telegramId)
    .single()

  if (error) throw error
  return data
}

export const createUser = async (telegramId: string, username?: string) => {
  const { data, error } = await supabase
    .from('users')
    .insert([
      {
        telegram_id: telegramId,
        username: username,
        status: 'active'
      }
    ])
    .select()
    .single()

  if (error) throw error
  return data
}

export const updateOnboardingProgress = async (
  userId: string,
  currentStep: 'welcome' | 'intro' | 'journeys' | 'control' | 'name_registry' | 'create' | 'completed',
  isCompleted: boolean = false
) => {
  const { data, error } = await supabase
    .from('onboarding_progress')
    .upsert({
      user_id: userId,
      current_step: currentStep,
      is_completed: isCompleted,
      completed_at: isCompleted ? new Date().toISOString() : null
    })
    .select()
    .single()

  if (error) throw error
  return data
}

export const getUserPreferences = async (userId: string) => {
  const { data, error } = await supabase
    .from('user_preferences')
    .select('*')
    .eq('user_id', userId)
    .single()

  if (error) throw error
  return data
}

export const updateUserPreferences = async (
  userId: string,
  preferences: {
    theme_preference?: 'light' | 'dark' | 'system'
    notifications_enabled?: boolean
  }
) => {
  const { data, error } = await supabase
    .from('user_preferences')
    .upsert({
      user_id: userId,
      ...preferences
    })
    .select()
    .single()

  if (error) throw error
  return data
} 