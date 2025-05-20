'use client'

import { useEffect, useState } from 'react'
import RoleSelectionScreen from '@/components/onboarding/role-selection-screen'
import { initTelegramWebApp } from '@/lib/telegram'

export default function RolePage() {
  const [theme, setTheme] = useState({
    bg_color: '#ffffff',
    text_color: '#000000',
    hint_color: '#999999',
    button_color: '#FF0099',
    button_text_color: '#ffffff',
  })

  useEffect(() => {
    // Initialize Telegram Web App
    initTelegramWebApp()

    // Get theme from Telegram if available
    if (typeof window !== 'undefined' && window.Telegram && window.Telegram.WebApp) {
      const tg = window.Telegram.WebApp
      if (tg.themeParams) {
        setTheme({
          bg_color: tg.themeParams.bg_color || '#ffffff',
          text_color: tg.themeParams.text_color || '#000000',
          hint_color: tg.themeParams.hint_color || '#999999',
          button_color: '#FF0099', // Keep brand color for buttons
          button_text_color: '#ffffff',
        })
      }
    }
  }, [])

  return <RoleSelectionScreen theme={theme} />
} 