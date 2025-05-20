'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Progress } from '@/components/ui/progress'

interface TelegramTheme {
  bg_color: string
  text_color: string
  hint_color: string
  button_color: string
  button_text_color: string
}

export function LoadingScreen() {
  const router = useRouter()
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState('Initializing...')
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

    const checkUserProfile = async () => {
      try {
        // Check if onboarding is already completed
        const onboardingCompleted = localStorage.getItem('onboardingCompleted')
        if (onboardingCompleted === 'true') {
          router.push('/home')
          return
        }

        setProgress(30)
        setStatus('Checking your profile...')

        const { data: { session } } = await supabase.auth.getSession()
        if (!session?.user) {
          setProgress(100)
          router.push('/auth/signin')
          return
        }

        setProgress(60)
        setStatus('Loading your profile...')

        // Check if user has a profile
        const { data: profile } = await supabase
          .from('profiles')
          .select('role, onboarding_complete')
          .eq('id', session.user.id)
          .single()

        setProgress(90)
        setStatus('Preparing your experience...')

        if (!profile) {
          // Start the Telegram onboarding flow
          setProgress(100)
          router.push('/onboarding')
          return
        }

        if (profile.onboarding_complete) {
          router.push('/home')
          return
        }

        // Start the Telegram onboarding flow
        router.push('/onboarding')
        setProgress(100)

      } catch (error) {
        console.error('Error checking profile:', error)
        setProgress(100)
        router.push('/auth/signin')
      }
    }

    checkUserProfile()
  }, [router])

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center"
      style={{ backgroundColor: theme.bg_color }}
    >
      <div className="w-full max-w-md p-8 space-y-6">
        <h1 
          className="text-2xl font-bold text-center"
          style={{ color: theme.text_color }}
        >
          Welcome to NALI
        </h1>
        <p 
          className="text-center"
          style={{ color: theme.hint_color }}
        >
          {status}
        </p>
        <Progress 
          value={progress} 
          className="h-2"
          style={{
            '--progress-background': theme.hint_color + '40',
            '--progress-foreground': theme.button_color,
          } as any}
        />
      </div>
    </div>
  )
}
 