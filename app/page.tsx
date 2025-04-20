"use client"

import { useEffect } from "react"

export default function Home() {
  useEffect(() => {
    // Check if onboarding has been completed
    const onboardingCompleted = localStorage.getItem("onboardingCompleted")

    // If onboarding has not been completed, redirect to onboarding
    if (!onboardingCompleted) {
      window.location.href = "/onboarding"
    } else {
      // Otherwise, redirect to home
      window.location.href = "/home"
    }
  }, [])

  // Return null as this page will redirect
  return null
}
