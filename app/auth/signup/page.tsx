'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function SignUp() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to onboarding page as we're using Telegram authentication only
    router.push('/onboarding')
  }, [router])

  return null
} 