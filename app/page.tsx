"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    // Initialize Telegram WebApp
    if (typeof window !== "undefined" && window.Telegram && window.Telegram.WebApp) {
      const tg = window.Telegram.WebApp
      
      // Expand the WebApp to take the full screen
      tg.expand()
      
      // Set the header color to match our theme
      tg.setHeaderColor("#FF0099")
    }

    // Check if onboarding has been completed
    const onboardingCompleted = localStorage.getItem("onboardingCompleted")

    // If onboarding has not been completed, redirect to onboarding
    if (!onboardingCompleted) {
      router.push("/onboarding")
    } else {
      // Otherwise, redirect to home
      router.push("/home")
    }
  }, [router])

  // Return null as this page will redirect
  return null
}
