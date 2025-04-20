"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Copy, Gift } from "lucide-react"
import { Button } from "@/components/ui/button"
import AppLayout from "@/components/layout/app-layout"

export default function ReferralPage() {
  const router = useRouter()
  const [copied, setCopied] = useState(false)
  const [telegramTheme, setTelegramTheme] = useState({
    bg_color: "#ffffff",
    text_color: "#000000",
    hint_color: "#999999",
    button_color: "#FF0099",
    button_text_color: "#ffffff",
  })

  const referralLink = "https://nali.getmini.app/?ref=u123456"

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

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)

    // Add haptic feedback if available
    if (window.Telegram?.WebApp?.HapticFeedback) {
      window.Telegram.WebApp.HapticFeedback.notificationOccurred("success")
    }
  }

  return (
    <AppLayout>
      <div className="max-w-md mx-auto pb-20 bg-white">
        <div className="p-4">
          <div className="flex items-center mb-6">
            <button className="p-1 mr-2" onClick={() => router.back()}>
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h1 className="text-xl font-medium">Referral</h1>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-medium mb-1">We value friendship</h2>
            <p className="text-gray-500">Follow the steps below and get rewarded</p>
          </div>

          <div className="space-y-6 mb-8">
            <div className="flex">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#FF0099] text-white flex items-center justify-center mr-4">
                1
              </div>
              <div>
                <h3 className="font-medium">Share your link</h3>
                <div className="flex items-center mt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 mr-1"
                  >
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                  </svg>
                </div>
              </div>
            </div>

            <div className="flex">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#FF0099] text-white flex items-center justify-center mr-4">
                2
              </div>
              <div>
                <h3 className="font-medium">Your friend signup using your link</h3>
              </div>
            </div>

            <div className="flex">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#FF0099] text-white flex items-center justify-center mr-4">
                3
              </div>
              <div>
                <h3 className="font-medium">Your friend places an order</h3>
              </div>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center mr-3">
                <Gift className="h-4 w-4 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">You get</p>
                <p className="font-medium">50 Score | 10 Points (10 EGP)</p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                <Gift className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">They get</p>
                <p className="font-medium">Discount coupon (10%)</p>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-medium mb-2">Refer 5 friends and get extra rewards</h3>
            <div className="flex items-center bg-gray-50 p-3 rounded-lg">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
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
                  className="h-4 w-4 text-green-600"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <p className="font-medium">Free shipping</p>
            </div>
          </div>

          <div className="relative mb-4">
            <input
              type="text"
              value={referralLink}
              readOnly
              className="w-full p-3 pr-16 bg-gray-50 rounded-lg text-sm"
            />
            <Button
              className="absolute right-1 top-1 bg-amber-400 hover:bg-amber-500 text-black h-8 px-3"
              onClick={handleCopy}
            >
              <Copy className="h-4 w-4 mr-1" />
              {copied ? "Copied!" : "Copy"}
            </Button>
          </div>

          <div className="text-xs text-center text-gray-400 flex items-center justify-center">
            Powered by <span className="font-medium ml-1">Carrotbolt</span>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
