"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function SignIn() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to wallet connection page
    router.push('/auth/wallet')
  }, [router])

  return null
} 