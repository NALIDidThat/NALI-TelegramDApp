'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

interface TelegramTheme {
  bg_color: string
  text_color: string
  hint_color: string
  button_color: string
  button_text_color: string
}

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(true)
  const [theme, setTheme] = useState<TelegramTheme>({
    bg_color: '#ffffff',
    text_color: '#000000',
    hint_color: '#999999',
    button_color: '#FF0099',
    button_text_color: '#ffffff',
  })

  useEffect(() => {
    // Initialize Telegram WebApp
    if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp
      tg.expand()

      // Get theme colors from Telegram
      if (tg.themeParams) {
        setTheme({
          bg_color: tg.themeParams.bg_color || '#ffffff',
          text_color: tg.themeParams.text_color || '#000000',
          hint_color: tg.themeParams.hint_color || '#999999',
          button_color: '#FF0099', // Keep brand color
          button_text_color: '#ffffff',
        })
      }

      // Set header color
      tg.setHeaderColor('#FF0099')
    }

    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  // Don't show loading animation for child routes
  if (!isLoading || pathname !== '/onboarding') {
    return <>{children}</>
  }

  return (
    <div 
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: theme.bg_color }}
    >
      <div className="w-full max-w-md p-8 space-y-4">
        <div className="animate-pulse space-y-4">
          <div 
            className="h-8 rounded w-3/4 mx-auto"
            style={{ backgroundColor: theme.hint_color + '40' }}
          />
          <div 
            className="h-4 rounded w-1/2 mx-auto"
            style={{ backgroundColor: theme.hint_color + '40' }}
          />
          <div 
            className="h-2 rounded"
            style={{ backgroundColor: theme.hint_color + '40' }}
          />
        </div>
      </div>
    </div>
  )
} 