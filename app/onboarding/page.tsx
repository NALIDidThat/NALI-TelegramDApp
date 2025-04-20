"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import OnboardingFlow from "@/components/onboarding-flow"

export default function OnboardingPage() {
  const router = useRouter()

  // Set up onboarding completion tracking
  useEffect(() => {
    // Check if this is the user's first visit
    const isFirstVisit = localStorage.getItem("onboardingCompleted") === null

    // If not the first visit and not explicitly navigated to onboarding, redirect to home
    if (!isFirstVisit && window.location.pathname === "/onboarding") {
      // Allow users to revisit onboarding if they explicitly navigate to it
      // But mark that they've seen it before
      localStorage.setItem("onboardingViewed", "true")
    }
  }, [router])

  // Function to complete onboarding and redirect to home
  const completeOnboarding = () => {
    localStorage.setItem("onboardingCompleted", "true")
    router.push("/home")
  }

  return (
    <div className="min-h-screen">
      <OnboardingFlow onComplete={completeOnboarding} />
    </div>
  )
}
