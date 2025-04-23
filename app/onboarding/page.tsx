"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import WelcomeScreen from "@/components/onboarding/welcome-screen"
import IntroScreen from "@/components/onboarding/intro-screen"
import JourneysScreen from "@/components/onboarding/journeys-screen"
import ControlScreen from "@/components/onboarding/control-screen"
import NameRegistryScreen from "@/components/onboarding/name-registry-screen"
import CreateScreen from "@/components/onboarding/create-screen"
import { AnimatePresence, motion } from "framer-motion"

const TOTAL_SCREENS = 6

export default function OnboardingPage() {
  const [currentScreen, setCurrentScreen] = useState(0)
  const router = useRouter()
  const [telegramTheme, setTelegramTheme] = useState({
    bg_color: "#ffffff",
    text_color: "#000000",
    hint_color: "#999999",
    button_color: "#FF0099",
    button_text_color: "#ffffff",
  })

  // Initialize Telegram WebApp
  useEffect(() => {
    // Check if we're in Telegram environment
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
    }
  }, [])

  const screens = [
    <WelcomeScreen key="welcome" theme={telegramTheme} />,
    <IntroScreen key="intro" theme={telegramTheme} />,
    <JourneysScreen key="journeys" theme={telegramTheme} />,
    <ControlScreen key="control" theme={telegramTheme} />,
    <NameRegistryScreen 
      key="name-registry" 
      theme={telegramTheme} 
      onNameSubmit={() => setCurrentScreen(currentScreen + 1)}
    />,
    <CreateScreen key="create" theme={telegramTheme} />,
  ]

  const nextScreen = () => {
    if (currentScreen < TOTAL_SCREENS - 1) {
      setCurrentScreen(currentScreen + 1)

      // Haptic feedback if in Telegram
      if (typeof window !== "undefined" && window.Telegram && window.Telegram.WebApp) {
        window.Telegram.WebApp.HapticFeedback.impactOccurred("light")
      }
    }
  }

  const skipToEnd = () => {
    setCurrentScreen(TOTAL_SCREENS - 1)

    // Haptic feedback if in Telegram
    if (typeof window !== "undefined" && window.Telegram && window.Telegram.WebApp) {
      window.Telegram.WebApp.HapticFeedback.impactOccurred("medium")
    }
  }

  const getStarted = () => {
    // Haptic feedback if in Telegram
    if (typeof window !== "undefined" && window.Telegram && window.Telegram.WebApp) {
      window.Telegram.WebApp.HapticFeedback.notificationOccurred("success")
    }

    // Mark onboarding as completed
    localStorage.setItem("onboardingCompleted", "true")
    router.push("/home")
  }

  return (
    <div className="w-full h-screen max-w-md mx-auto" style={{ backgroundColor: telegramTheme.bg_color }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentScreen}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="h-full w-full"
        >
          {screens[currentScreen]}
        </motion.div>
      </AnimatePresence>

      <div className="absolute top-6 right-6 flex items-center gap-4">
        {currentScreen > 0 && currentScreen !== TOTAL_SCREENS - 2 && (
          <button
            onClick={skipToEnd}
            className="text-sm hover:opacity-80 transition-opacity"
            style={{ color: telegramTheme.hint_color }}
          >
            Skip
          </button>
        )}
      </div>

      <div className="absolute bottom-32 left-0 right-0 flex justify-center gap-2">
        {Array.from({ length: TOTAL_SCREENS }).map((_, index) => (
          <div
            key={index}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentScreen ? "w-8 bg-[#FF0099]" : "w-2 bg-gray-300"
            }`}
            style={{
              backgroundColor: index === currentScreen ? "#FF0099" : telegramTheme.hint_color + "40",
            }}
          />
        ))}
      </div>

      {currentScreen !== TOTAL_SCREENS - 2 && (
        <div className="absolute bottom-16 left-0 right-0 flex justify-center px-6">
          {currentScreen === 0 ? (
            <button
              onClick={nextScreen}
              className="bg-white text-[#FF0099] font-medium rounded-full px-8 py-3 w-full max-w-xs hover:opacity-90 transition-opacity"
            >
              Get started
            </button>
          ) : currentScreen === TOTAL_SCREENS - 1 ? (
            <button
              onClick={getStarted}
              className="bg-[#FF0099] text-white font-medium rounded-full px-8 py-3 w-full max-w-xs hover:opacity-90 transition-opacity"
              style={{
                backgroundColor: telegramTheme.button_color,
                color: telegramTheme.button_text_color,
              }}
            >
              Get Started
            </button>
          ) : (
            <button
              onClick={nextScreen}
              className="bg-[#FF0099] text-white font-medium rounded-full px-8 py-3 w-full max-w-xs hover:opacity-90 transition-opacity"
              style={{
                backgroundColor: telegramTheme.button_color,
                color: telegramTheme.button_text_color,
              }}
            >
              {currentScreen < TOTAL_SCREENS - 2 ? "Next" : "Continue"}
            </button>
          )}
        </div>
      )}
    </div>
  )
}
