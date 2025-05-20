"use client"

import { useEffect, useState } from "react"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

interface TelegramTheme {
  bg_color: string
  text_color: string
  hint_color: string
  button_color: string
  button_text_color: string
}

interface TelegramWebApp {
  initData: string
  initDataUnsafe: any
  version: string
  platform: string
  themeParams: TelegramTheme | null
  expand: () => void
  setHeaderColor: (color: string) => void
  enableClosingConfirmation: () => void
  onEvent: (eventName: string, callback: () => void) => void
  HapticFeedback: {
    impactOccurred: (style: string) => void
  }
}

// Extend the Window interface
declare global {
  interface Window {
    Telegram?: {
      WebApp: any
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
      const tg = window.Telegram.WebApp as TelegramWebApp
      console.log('Telegram WebApp initialized:', {
        initData: tg.initData,
        initDataUnsafe: tg.initDataUnsafe,
        version: tg.version,
        platform: tg.platform,
        themeParams: tg.themeParams
      })

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
        console.log('Theme changed:', tg.themeParams)
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
    } else {
      console.log('Telegram WebApp not detected, running in standalone mode')
    }
  }, [])

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#FF0099" />
      </head>
      <body 
        className={inter.className}
        style={{
          backgroundColor: telegramTheme.bg_color,
          color: telegramTheme.text_color
        }}
        suppressHydrationWarning
      >
        <main className="max-w-md mx-auto min-h-screen overflow-x-hidden">
          {children}
        </main>
      </body>
    </html>
  )
}
