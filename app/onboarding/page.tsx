"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { initTelegramWebApp, getTelegramUser, isTelegramWebApp } from '@/lib/telegram'
import { getProfileByTelegramId, upsertProfile } from '@/lib/supabase'
import WelcomeScreen from '@/components/onboarding/welcome-screen'
import { UserRole } from '@/types/database'

export default function OnboardingPage() {
  const router = useRouter()
  const [currentScreen, setCurrentScreen] = useState(0)
  const [loading, setLoading] = useState(true)
  const [theme, setTheme] = useState({
    bg_color: "#ffffff",
    text_color: "#000000",
    hint_color: "#999999",
    button_color: "#FF0099",
    button_text_color: "#ffffff",
  })
  const TOTAL_SCREENS = 1

  useEffect(() => {
    const init = async () => {
      try {
        // Initialize the Telegram Web App
        initTelegramWebApp()
        
        // Get Telegram theme if available
        if (typeof window !== 'undefined' && window.Telegram && window.Telegram.WebApp.themeParams) {
          const tg = window.Telegram.WebApp
          setTheme({
            bg_color: tg.themeParams.bg_color || '#ffffff',
            text_color: tg.themeParams.text_color || '#000000',
            hint_color: tg.themeParams.hint_color || '#999999',
            button_color: '#FF0099', // Keep brand color for buttons
            button_text_color: '#ffffff',
          })
        }
        
        // Get the Telegram user
        const telegramUser = getTelegramUser()
        
        if (telegramUser) {
          // Check if user already has a profile
          const profile = await getProfileByTelegramId(telegramUser.id)
          
          if (profile) {
            // If user has a role and completed onboarding, redirect to dashboard
            if (profile.role && profile.onboarding_complete) {
              router.push('/dashboard')
              return
            }
            
            // If user has a role but hasn't completed onboarding, redirect to their specific flow
            if (profile.role && !profile.onboarding_complete) {
              router.push(`/onboarding/${profile.role}/welcome`)
              return
            }
            
            // Otherwise, show the welcome screen
            setCurrentScreen(0)
          } else {
            // New user, create profile and start with welcome screen
            await upsertProfile(telegramUser, { onboarding_complete: false })
            setCurrentScreen(0)
          }
        } else if (!isTelegramWebApp()) {
          // Not running in Telegram WebApp, show a message
          console.log('Please open this app from Telegram')
        }
      } catch (error) {
        console.error('Error initializing onboarding:', error)
      } finally {
        setLoading(false)
      }
    }
    
    init()
  }, [router])

  const handleNext = () => {
    // After welcome, go to wallet connection page
    router.push('/auth/wallet')
  }

  // Only one screen now: Welcome
  const screens = [
    <WelcomeScreen 
      key="welcome" 
      theme={theme} 
      onGetStarted={handleNext}
    />
  ]
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF0099]"></div>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen bg-background">
      {screens[currentScreen]}
    </div>
  )
}
