"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Trophy, ChevronRight, Star, Gift, Clock, Bell, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import AppLayout from "@/components/layout/app-layout"

export default function RewardsDashboardPage() {
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
            <div className="flex items-center">
              <button className="p-1 mr-1">
                <Clock className="h-5 w-5" />
              </button>
              <button className="p-1">
                <Bell className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="text-center mb-4">
            <h2 className="text-lg font-medium">Welcome to</h2>
            <h1 className="text-2xl font-bold">Plus Rewards</h1>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Star className="h-5 w-5 text-amber-500 mr-2" />
                <span className="font-medium">Points</span>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">2,000</div>
                <div className="text-sm text-gray-500">Equals $250</div>
              </div>
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

          <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <div className="bg-amber-100 rounded-full p-1.5 mr-2">
                  <Trophy className="h-4 w-4 text-amber-600" />
                </div>
                <span className="font-medium">Gold</span>
                <span className="ml-2 text-xs text-gray-500">(Level 3)</span>
              </div>
            </div>

            <div className="mb-2 text-sm text-gray-500">1,030 Points to Gold</div>
            <Progress value={65} className="h-2 bg-amber-100" indicatorClassName="bg-amber-500" />
          </div>

          <div
            className="bg-white rounded-xl p-4 shadow-sm mb-6 cursor-pointer"
            onClick={() => router.push("/rewards/referral")}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Refer Your Friends</h3>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex items-center">
                <div className="w-1 h-1 bg-gray-400 rounded-full mr-2"></div>
                <p className="text-sm text-gray-500">
                  You get <span className="text-[#FF0099] font-medium">$20 Coupon</span>
                </p>
              </div>
              <div className="flex items-center">
                <div className="w-1 h-1 bg-gray-400 rounded-full mr-2"></div>
                <p className="text-sm text-gray-500">
                  They get <span className="text-[#FF0099] font-medium">Free Shipping Coupon</span>
                </p>
              </div>
            </div>

            <div className="mt-4 relative">
              <input
                type="text"
                value="https://nali.getmini.app/?ref=u123456"
                readOnly
                className="w-full p-2 pr-16 bg-gray-50 rounded-lg text-xs"
              />
              <Button
                className="absolute right-1 top-1 bg-amber-400 hover:bg-amber-500 text-black h-6 px-3 text-xs"
                onClick={() => {
                  navigator.clipboard.writeText("https://nali.getmini.app/?ref=u123456")
                  if (window.Telegram?.WebApp?.HapticFeedback) {
                    window.Telegram.WebApp.HapticFeedback.notificationOccurred("success")
                  }
                }}
              >
                <Copy className="h-3 w-3 mr-1" />
                Copy
              </Button>
            </div>

            <div className="mt-4 flex justify-center space-x-4">
              <button className="p-2 bg-blue-100 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#1877F2">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </button>
              <button className="p-2 bg-blue-100 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#1DA1F2">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </button>
            </div>

            <div className="mt-4 text-xs text-center text-gray-400">You have referred 0 friends</div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
