"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function NotFound() {
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
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-background">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold text-primary">404</h1>
        <p className="text-lg text-muted-foreground">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Button
          onClick={() => router.push("/")}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          Return Home
        </Button>
      </div>
    </div>
  )
} 