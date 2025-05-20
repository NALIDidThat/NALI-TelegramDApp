import { useEffect, useState } from 'react'
import { getTelegramUser } from '@/lib/telegram'
import { getProfileByTelegramId, upsertProfile } from '@/lib/supabase'

export function useAuth() {
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadTelegramUser = async () => {
      try {
        // Get the Telegram user from the window object
        const telegramUser = getTelegramUser()
        
        if (telegramUser) {
          // Set the user state
          setUser(telegramUser)
          
          // Get or create a profile for this user
          const userProfile = await getProfileByTelegramId(telegramUser.id)
          
          if (!userProfile) {
            // Create a new profile if one doesn't exist
            const newProfile = await upsertProfile(telegramUser)
            setProfile(newProfile?.[0] || null)
          } else {
            setProfile(userProfile)
          }
        }
      } catch (error) {
        console.error('Error loading Telegram user:', error)
      } finally {
        setLoading(false)
      }
    }

    loadTelegramUser()
  }, [])

  return { user, profile, loading }
} 