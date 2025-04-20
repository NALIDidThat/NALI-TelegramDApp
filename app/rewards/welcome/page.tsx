"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Trophy, ChevronRight, Star, Gift } from "lucide-react"
import { Button } from "@/components/ui/button"
import AppLayout from "@/components/layout/app-layout"

export default function RewardsWelcomePage() {
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
    if (typeof window !== "undefined" && window.Telegram && window.Telegram.WebApp) {
      const tg = window.Telegram.WebApp
      if (tg.themeParams) {
        setTelegramTheme({
          bg_color: tg.themeParams.bg_color || "#ffffff",
          text_color: tg.themeParams.text_color || "#000000",
          hint_color: tg.themeParams.hint_color || "#999999",
          button_color: "#FF0099", // Keep our brand color for buttons
          button_text_color: "#ffffff",
        })
      }
    }
  }, [])

  return (
    <AppLayout>
      <div className="max-w-md mx-auto pb-20 bg-amber-50">
        <div className="p-4 relative">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <div className="bg-amber-100 rounded-full p-1.5">
                <Trophy className="h-4 w-4 text-amber-600" />
              </div>
              <span className="ml-2 font-medium">FAQ</span>
            </div>
            <button className="p-1">
              <span className="sr-only">Close</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <div className="text-center mb-4">
            <h2 className="text-lg font-medium">Welcome to</h2>
            <h1 className="text-2xl font-bold">Plus Rewards</h1>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
            <h3 className="text-center font-medium mb-4">Signup now and join our rewards program!</h3>

            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center">
                  <Trophy className="h-12 w-12 text-amber-500" />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-amber-500 rounded-full p-1.5">
                  <Star className="h-4 w-4 text-white" />
                </div>
              </div>
            </div>

            <Button
              className="w-full bg-amber-400 hover:bg-amber-500 text-black font-medium"
              onClick={() => router.push("/rewards/dashboard")}
            >
              Join Now
            </Button>

            <div className="text-center mt-3 text-sm text-gray-500">
              Already have an account?{" "}
              <a href="#" className="text-amber-500 font-medium">
                Sign in
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div
              className="bg-white rounded-xl p-4 shadow-sm flex flex-col items-center cursor-pointer"
              onClick={() => router.push("/rewards/earn")}
            >
              <div className="bg-blue-100 rounded-full p-2 mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5 text-blue-600"
                >
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
              </div>
              <span className="font-medium">Earn</span>
              <ChevronRight className="h-4 w-4 text-gray-400 mt-2" />
            </div>

            <div
              className="bg-white rounded-xl p-4 shadow-sm flex flex-col items-center cursor-pointer"
              onClick={() => router.push("/rewards/redeem")}
            >
              <div className="bg-pink-100 rounded-full p-2 mb-2">
                <Gift className="h-5 w-5 text-[#FF0099]" />
              </div>
              <span className="font-medium">Redeem</span>
              <ChevronRight className="h-4 w-4 text-gray-400 mt-2" />
            </div>
          </div>

          <div
            className="bg-white rounded-xl p-4 shadow-sm cursor-pointer"
            onClick={() => router.push("/rewards/levels")}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-amber-100 rounded-full p-2 mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 text-amber-600"
                  >
                    <path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium">Levels</h3>
                  <p className="text-sm text-gray-500">Collect discount points and level up!</p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </div>
            <div className="mt-2 text-xs text-gray-400 flex items-center">
              Powered by <span className="font-medium ml-1">Carrotbolt</span>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
