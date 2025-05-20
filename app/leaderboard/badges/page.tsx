"use client"

import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const badges = [
  { id: 1, icon: "👑", name: "Champion", unlocked: true, description: "Reached #1 on leaderboard" },
  { id: 2, icon: "💎", name: "Diamond", unlocked: true, description: "Completed 50 quests" },
  { id: 3, icon: "⚔️", name: "Warrior", unlocked: true, description: "7-day streak achieved" },
  { id: 4, icon: "🏆", name: "Trophy", unlocked: true, description: "Won weekly challenge" },
  { id: 5, icon: "✨", name: "Star", unlocked: true, description: "Earned 10,000 points" },
  { id: 6, icon: "🎓", name: "Graduate", unlocked: true, description: "Mastered all basics" },
  { id: 7, icon: "🐱", name: "Explorer", unlocked: true, description: "Visited 10 locations" },
  { id: 8, icon: "🎯", name: "Target", unlocked: false, description: "Complete all daily goals" },
  { id: 9, icon: "🌊", name: "Wave", unlocked: false, description: "Join 5 group activities" },
  { id: 10, icon: "🏃", name: "Runner", unlocked: false, description: "30-day streak" },
  { id: 11, icon: "🌟", name: "Achievement", unlocked: false, description: "Reach level 50" },
  { id: 12, icon: "❤️", name: "Heart", unlocked: false, description: "Help 20 other users" },
]

export default function BadgesPage() {
  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-md mx-auto bg-gradient-to-b from-[#6805f2]/10 to-[#f20789]/5 min-h-screen backdrop-blur-sm">
        {/* Header */}
        <div className="p-4 flex items-center justify-between relative">
          <Link href="/leaderboard" className="absolute left-2">
            <ChevronLeft className="h-6 w-6 text-white" />
          </Link>
          <h1 className="text-xl font-bold text-white text-center flex-1">Badges</h1>
        </div>

        {/* User Profile */}
        <div className="px-4 py-8 flex flex-col items-center relative">
          {/* Decorative elements */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#f20789]/20 rounded-full blur-3xl"></div>
            <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-[#6805f2]/20 rounded-full blur-2xl"></div>
          </div>
          
          <div className="relative z-10">
            <Avatar className="h-24 w-24 border-4 border-[#f20789] ring-4 ring-[#f20789]/20">
              <AvatarImage src="/placeholder.svg?height=96&width=96" />
              <AvatarFallback>SH</AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-2 -right-2 bg-[#f20789] rounded-full px-3 py-1 text-white text-sm font-medium shadow-lg shadow-[#f20789]/20">
              8122 pts
            </div>
          </div>
          <h2 className="mt-4 text-xl font-semibold text-white">Sheryl Higgins</h2>
          <p className="text-white/80">@sher234</p>
          <div className="mt-4 text-center">
            <p className="text-white/60 text-sm">Badges Collected</p>
            <p className="text-2xl font-bold text-white">
              <span className="text-[#f20789]">7</span> / 12
            </p>
          </div>
        </div>

        {/* Badges Grid */}
        <div className="px-4 py-6">
          <div className="grid grid-cols-3 gap-6">
            {badges.map((badge) => (
              <div
                key={badge.id}
                className={`aspect-square rounded-2xl flex flex-col items-center justify-center relative group cursor-pointer ${
                  badge.unlocked
                    ? "bg-gradient-to-br from-[#f20789] to-[#6805f2] text-white shadow-lg shadow-[#f20789]/20"
                    : "bg-white/5 text-white/30"
                }`}
              >
                <span className="text-2xl mb-1">{badge.icon}</span>
                <span className="text-xs font-medium">{badge.name}</span>
                
                {/* Tooltip */}
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-black/90 text-white text-xs py-2 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  {badge.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 