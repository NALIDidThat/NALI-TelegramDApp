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
      const version = tg.version || "0.0"
      
      function isVersionAtLeast(current: string, required: string) {
        const c = current.split('.').map(Number)
        const r = required.split('.').map(Number)
        for (let i = 0; i < r.length; i++) {
          if ((c[i] || 0) > r[i]) return true
          if ((c[i] || 0) < r[i]) return false
        }
        return true
      }
      
      // Expand the WebApp to take the full screen
      tg.expand()
      
      // Set the header color to match our theme
      tg.setHeaderColor("#FF0099")

      if (isVersionAtLeast(version, "6.1") && typeof tg.showPopup === "function") {
        tg.showPopup({
          title: "Notice",
          message: "This is a popup message.",
          buttons: [{ id: "ok", type: "ok", text: "OK" }]
        });
      } else if (typeof tg.showAlert === "function") {
        tg.showAlert("Your Telegram app is outdated. Please update to use this feature.");
      }
    }
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-background">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold text-primary">404</h1>
        <p className="text-lg text-muted-foreground">
         Sorry bro, something happened lol.
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