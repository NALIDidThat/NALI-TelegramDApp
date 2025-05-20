export type UserRole = 'student' | 'teacher' | 'parent' | 'hub_manager'

export interface Profile {
  id: string
  created_at: string
  updated_at: string
  email: string
  full_name: string
  role: UserRole | null
  avatar_url?: string
  phone_number?: string
  school_id?: string
  class_id?: string
  local_hub_id?: string
  onboarding_complete?: boolean
}

export interface School {
  id: string
  created_at: string
  name: string
  address: string
  city: string
  country: string
  phone_number: string
  email: string
}

export interface Class {
  id: string
  created_at: string
  name: string
  school_id: string
  teacher_id: string
  grade_level: string
}

export interface StudentParent {
  id: string
  created_at: string
  student_id: string
  parent_id: string
}

export interface Experience {
  id: string
  created_at: string
  title: string
  description: string
  points: number
  category: string
  difficulty: 'easy' | 'medium' | 'hard'
  requirements: string[]
  rewards: string[]
}

export interface StudentExperience {
  id: string
  created_at: string
  student_id: string
  experience_id: string
  status: 'pending' | 'completed' | 'verified'
  completed_at?: string
  verified_by?: string
  notes?: string
}

export interface Reward {
  id: string
  created_at: string
  name: string
  description: string
  points_cost: number
  image_url?: string
  stock: number
  category: string
}

export interface StudentReward {
  id: string
  created_at: string
  student_id: string
  reward_id: string
  status: 'pending' | 'claimed' | 'delivered'
  claimed_at?: string
  delivered_at?: string
}

export interface LocalHub {
  id: string
  created_at: string
  name: string
  address: string
  city: string
  country: string
  phone_number: string
  email: string
  manager_id: string
  opening_hours: string
  capacity: number
}

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          email: string
          full_name: string
          role: UserRole | null
          avatar_url?: string
          phone_number?: string
          school_id?: string
          class_id?: string
          local_hub_id?: string
          onboarding_complete: boolean
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          email: string
          full_name: string
          role?: UserRole | null
          avatar_url?: string
          phone_number?: string
          school_id?: string
          class_id?: string
          local_hub_id?: string
          onboarding_complete?: boolean
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          email?: string
          full_name?: string
          role?: UserRole | null
          avatar_url?: string
          phone_number?: string
          school_id?: string
          class_id?: string
          local_hub_id?: string
          onboarding_complete?: boolean
        }
      }
      schools: {
        Row: {
          id: string
          created_at: string
          name: string
          address: string
          city: string
          country: string
          phone_number: string
          email: string
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          address: string
          city: string
          country: string
          phone_number: string
          email: string
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          address?: string
          city?: string
          country?: string
          phone_number?: string
          email?: string
        }
      }
      classes: {
        Row: {
          id: string
          created_at: string
          name: string
          school_id: string
          teacher_id: string
          grade_level: string
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          school_id: string
          teacher_id: string
          grade_level: string
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          school_id?: string
          teacher_id?: string
          grade_level?: string
        }
      }
      student_parents: {
        Row: {
          id: string
          created_at: string
          student_id: string
          parent_id: string
        }
        Insert: {
          id?: string
          created_at?: string
          student_id: string
          parent_id: string
        }
        Update: {
          id?: string
          created_at?: string
          student_id?: string
          parent_id?: string
        }
      }
      experiences: {
        Row: {
          id: string
          created_at: string
          title: string
          description: string
          points: number
          category: string
          difficulty: 'easy' | 'medium' | 'hard'
          requirements: string[]
          rewards: string[]
        }
        Insert: {
          id?: string
          created_at?: string
          title: string
          description: string
          points: number
          category: string
          difficulty: 'easy' | 'medium' | 'hard'
          requirements: string[]
          rewards: string[]
        }
        Update: {
          id?: string
          created_at?: string
          title?: string
          description?: string
          points?: number
          category?: string
          difficulty?: 'easy' | 'medium' | 'hard'
          requirements?: string[]
          rewards?: string[]
        }
      }
      student_experiences: {
        Row: {
          id: string
          created_at: string
          student_id: string
          experience_id: string
          status: 'pending' | 'completed' | 'verified'
          completed_at?: string
          verified_by?: string
          notes?: string
        }
        Insert: {
          id?: string
          created_at?: string
          student_id: string
          experience_id: string
          status: 'pending' | 'completed' | 'verified'
          completed_at?: string
          verified_by?: string
          notes?: string
        }
        Update: {
          id?: string
          created_at?: string
          student_id?: string
          experience_id?: string
          status?: 'pending' | 'completed' | 'verified'
          completed_at?: string
          verified_by?: string
          notes?: string
        }
      }
      rewards: {
        Row: {
          id: string
          created_at: string
          name: string
          description: string
          points_cost: number
          image_url?: string
          stock: number
          category: string
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          description: string
          points_cost: number
          image_url?: string
          stock: number
          category: string
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          description?: string
          points_cost?: number
          image_url?: string
          stock?: number
          category?: string
        }
      }
      student_rewards: {
        Row: {
          id: string
          created_at: string
          student_id: string
          reward_id: string
          status: 'pending' | 'claimed' | 'delivered'
          claimed_at?: string
          delivered_at?: string
        }
        Insert: {
          id?: string
          created_at?: string
          student_id: string
          reward_id: string
          status: 'pending' | 'claimed' | 'delivered'
          claimed_at?: string
          delivered_at?: string
        }
        Update: {
          id?: string
          created_at?: string
          student_id?: string
          reward_id?: string
          status?: 'pending' | 'claimed' | 'delivered'
          claimed_at?: string
          delivered_at?: string
        }
      }
      local_hubs: {
        Row: {
          id: string
          created_at: string
          name: string
          address: string
          city: string
          country: string
          phone_number: string
          email: string
          manager_id: string
          opening_hours: string
          capacity: number
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          address: string
          city: string
          country: string
          phone_number: string
          email: string
          manager_id: string
          opening_hours: string
          capacity: number
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          city?: string
          country?: string
          phone_number?: string
          email?: string
          manager_id?: string
          opening_hours?: string
          capacity?: number
        }
      }
    }
  }
} 