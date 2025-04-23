"use client"

import { useEffect, useState } from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import NavigationMenu from "@/components/navigation/menu"

const inter = Inter({ subsets: ["latin"] })

interface TelegramTheme {
  bg_color: string
  text_color: string
  hint_color: string
  button_color: string
  button_text_color: string
}

// Add Telegram WebApp interface
interface TelegramWebApp {
  expand: () => void
  themeParams: {
    bg_color?: string
    text_color?: string
    hint_color?: string
    button_color?: string
    button_text_color?: string
  }
  setHeaderColor: (color: string) => void
  enableClosingConfirmation: () => void
  onEvent: (eventType: string, eventHandler: () => void) => void
  HapticFeedback: {
    impactOccurred: (style: string) => void
    notificationOccurred: (type: string) => void
  }
}

// Add Telegram WebApp to Window interface
declare global {
  interface Window {
    Telegram?: {
      WebApp: TelegramWebApp
    }
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [telegramTheme, setTelegramTheme] = useState<TelegramTheme>({
    bg_color: "#ffffff",
    text_color: "#000000",
    hint_color: "#999999",
    button_color: "#FF0099",
    button_text_color: "#ffffff",
  })

  useEffect(() => {
    // Initialize Telegram WebApp
    if (typeof window !== "undefined" && window.Telegram && window.Telegram.WebApp) {
      const tg = window.Telegram.WebApp

      // Expand the WebApp to take the full screen
      tg.expand()

      // Get theme colors from Telegram
      if (tg.themeParams) {
        setTelegramTheme({
          bg_color: tg.themeParams.bg_color || "#ffffff",
          text_color: tg.themeParams.text_color || "#000000",
          hint_color: tg.themeParams.hint_color || "#999999",
          button_color: "#FF0099", // Keep our brand color for buttons
          button_text_color: "#ffffff",
        })
      }

      // Set the header color to match our theme
      tg.setHeaderColor("#FF0099")

      // Enable closing confirmation
      tg.enableClosingConfirmation()

      // Add event listener for theme changes
      tg.onEvent('themeChanged', () => {
        if (tg.themeParams) {
          setTelegramTheme({
            bg_color: tg.themeParams.bg_color || "#ffffff",
            text_color: tg.themeParams.text_color || "#000000",
            hint_color: tg.themeParams.hint_color || "#999999",
            button_color: "#FF0099",
            button_text_color: "#ffffff",
          })
        }
      })
    }
  }, [])

  return (
    <html lang="en">
      <body 
        className={inter.className}
        style={{
          backgroundColor: telegramTheme.bg_color,
          color: telegramTheme.text_color,
        }}
      >
        <div className="min-h-screen bg-background">
          {/* Navigation Header */}
          <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center justify-between">
              <div className="flex items-center space-x-4">
                {/* Add your logo or app name here */}
              </div>
              <NavigationMenu />
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
