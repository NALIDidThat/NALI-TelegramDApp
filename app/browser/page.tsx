"use client"

import { useEffect, useState } from "react"
import InAppBrowser from "@/components/browser/in-app-browser"
import Header from "@/components/layout/header"
import BottomNav from "@/components/layout/bottom-nav"

// Extend the TelegramWebApp type
declare global {
  interface TelegramWebApp {
    bg_color?: string
    text_color?: string
    hint_color?: string
    button_color?: string
    button_text_color?: string
  }
}

export default function BrowserPage() {
  const [theme, setTheme] = useState({
    bg_color: "#ffffff",
    text_color: "#000000",
    hint_color: "#999999",
    button_color: "#FF0099",
    button_text_color: "#ffffff"
  })

  // Load theme from Telegram
  useEffect(() => {
    if (window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp
      setTheme({
        bg_color: tg.bg_color || theme.bg_color,
        text_color: tg.text_color || theme.text_color,
        hint_color: tg.hint_color || theme.hint_color,
        button_color: tg.button_color || theme.button_color,
        button_text_color: tg.button_text_color || theme.button_text_color
      })
    }
  }, [])

  return (
    <div className="flex flex-col h-screen">
      <Header theme={theme} />
      <main className="flex-1 overflow-hidden pt-16 pb-16">
        <InAppBrowser />
      </main>
      <BottomNav theme={theme} />
    </div>
  )
} 