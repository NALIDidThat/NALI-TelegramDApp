"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowUp, ArrowDown, ChevronLeft, Crown } from "lucide-react"
import Link from "next/link"

export default function LeaderboardPage() {
  const [filter, setFilter] = useState("friend")

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFECB3] to-[#FFD54F] pb-24">
      <div className="max-w-md mx-auto bg-white/80 min-h-screen rounded-t-3xl shadow-lg overflow-hidden backdrop-blur-sm">
        {/* Animated confetti elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 h-3 w-2 bg-green-300 rotate-45 animate-float"></div>
          <div className="absolute top-20 left-20 h-4 w-2 bg-pink-300 -rotate-12 animate-float-delayed"></div>
          <div className="absolute top-15 right-12 h-3 w-2 bg-blue-300 rotate-45 animate-float"></div>
          <div className="absolute top-30 right-24 h-4 w-2 bg-yellow-300 -rotate-12 animate-float-delayed"></div>
          <div className="absolute top-25 left-32 h-3 w-2 bg-purple-300 rotate-30 animate-float"></div>
          <div className="absolute top-8 right-32 h-3 w-2 bg-green-300 -rotate-20 animate-float-delayed"></div>
        </div>

        {/* Achievement notification popup */}
        <div className="absolute top-16 left-1/2 transform -translate-x-1/2 bg-[#FF0099] text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg flex items-center gap-2 animate-bounce-in z-50">
          <span>🎉</span>
          <span>You moved up 5 spots today!</span>
        </div>

        {/* Milestone indicator */}
        <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 bg-white px-4 py-2 rounded-full text-sm font-medium shadow-lg border border-[#FF0099] flex items-center gap-2 z-50">
          <span>🎯</span>
          <span>You're 3 quests away from Top 10!</span>
        </div>
        {/* Header */}
        <div className="p-4 flex items-center justify-center relative">
          <Link href="/dashboard" className="absolute left-2">
            <ChevronLeft className="h-6 w-6 text-gray-600" />
          </Link>
          <h1 className="text-xl font-bold text-gray-800">Leaderboard</h1>
        </div>

        {/* Filters */}
        <div className="px-4 mb-6">
          <div className="flex rounded-full bg-gray-100 p-1">
            <Button
              variant={filter === "friend" ? "default" : "ghost"}
              size="sm"
              onClick={() => setFilter("friend")}
              className={`flex-1 rounded-full ${
                filter === "friend" ? "bg-[#FF0099] hover:bg-[#FF0099]/90" : "hover:bg-gray-200"
              }`}
            >
              Friend
            </Button>
            <Button
              variant={filter === "local" ? "default" : "ghost"}
              size="sm"
              onClick={() => setFilter("local")}
              className={`flex-1 rounded-full ${
                filter === "local" ? "bg-[#FF0099] hover:bg-[#FF0099]/90" : "hover:bg-gray-200"
              }`}
            >
              Local
            </Button>
            <Button
              variant={filter === "world" ? "default" : "ghost"}
              size="sm"
              onClick={() => setFilter("world")}
              className={`flex-1 rounded-full ${
                filter === "world" ? "bg-[#FF0099] hover:bg-[#FF0099]/90" : "hover:bg-gray-200"
              }`}
            >
              World
            </Button>
          </div>
        </div>

        {/* Top 3 Podium */}
        <div className="px-4 mb-8 relative">
          {/* Confetti-like decorations */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-5 left-10 h-3 w-2 bg-green-300 rotate-45"></div>
            <div className="absolute top-12 left-20 h-4 w-2 bg-pink-300 -rotate-12"></div>
            <div className="absolute top-8 right-12 h-3 w-2 bg-blue-300 rotate-45"></div>
            <div className="absolute top-20 right-24 h-4 w-2 bg-yellow-300 -rotate-12"></div>
            <div className="absolute top-16 left-32 h-3 w-2 bg-purple-300 rotate-30"></div>
            <div className="absolute top-4 right-32 h-3 w-2 bg-green-300 -rotate-20"></div>
          </div>

          <div className="flex justify-between items-end relative z-10">
            {/* 2nd Place */}
            <div className="flex flex-col items-center w-1/3">
              <div className="relative">
                <Crown className="absolute -top-6 left-1/2 transform -translate-x-1/2 h-5 w-5 text-yellow-500" />
                <div className="absolute -bottom-1 -right-1 bg-yellow-500 rounded-full h-5 w-5 flex items-center justify-center text-white font-bold text-xs border-2 border-white">
                  2
                </div>
                <Avatar className="h-16 w-16 border-2 border-yellow-500">
                  <AvatarImage src="/placeholder.svg?height=64&width=64" />
                  <AvatarFallback>TP</AvatarFallback>
                </Avatar>
              </div>
              <p className="text-xs mt-2 font-medium">Tinapopo</p>
              <p className="text-xs flex items-center">
                1356 <ArrowDown className="h-3 w-3 text-red-500 ml-1" />
              </p>
            </div>

            {/* 1st Place */}
            <div className="flex flex-col items-center w-1/3 -mt-4">
              <div className="relative">
                <Crown className="absolute -top-6 left-1/2 transform -translate-x-1/2 h-6 w-6 text-yellow-500" />
                <div className="absolute -bottom-1 -right-1 bg-yellow-500 rounded-full h-6 w-6 flex items-center justify-center text-white font-bold border-2 border-white">
                  1
                </div>
                <Avatar className="h-20 w-20 border-2 border-yellow-500">
                  <AvatarImage src="/placeholder.svg?height=80&width=80" />
                  <AvatarFallback>GA</AvatarFallback>
                </Avatar>
              </div>
              <p className="text-sm mt-2 font-bold">Gary</p>
              <p className="text-xs flex items-center">
                2051 <ArrowUp className="h-3 w-3 text-green-500 ml-1" />
              </p>
            </div>

            {/* 3rd Place */}
            <div className="flex flex-col items-center w-1/3">
              <div className="relative">
                <Crown className="absolute -top-6 left-1/2 transform -translate-x-1/2 h-5 w-5 text-yellow-500" />
                <div className="absolute -bottom-1 -right-1 bg-yellow-500 rounded-full h-5 w-5 flex items-center justify-center text-white font-bold text-xs border-2 border-white">
                  3
                </div>
                <Avatar className="h-16 w-16 border-2 border-yellow-500">
                  <AvatarImage src="/placeholder.svg?height=64&width=64" />
                  <AvatarFallback>SS</AvatarFallback>
                </Avatar>
              </div>
              <p className="text-xs mt-2 font-medium">SSY</p>
              <p className="text-xs flex items-center">
                1067 <ArrowUp className="h-3 w-3 text-green-500 ml-1" />
              </p>
            </div>
          </div>
        </div>

        {/* Leaderboard List */}
        <div className="px-4 space-y-4">
          {[
            { rank: 4, name: "Joey Lui", score: 1012, change: "up", avatar: "JL" },
            { rank: 5, name: "Yukishino", score: 999, change: "down", avatar: "YS" },
            { rank: 6, name: "Rururubi", score: 988, change: "down", avatar: "RR" },
            { rank: 7, name: "JK", score: 788, change: "up", avatar: "JK" },
            { rank: 8, name: "Hugokyf", score: 667, change: "down", avatar: "HK" },
            { rank: 9, name: "Boris Ng", score: 556, change: "up", avatar: "BN" },
            { rank: 10, name: "tth", score: 456, change: "down", avatar: "TT" },
          ].map((user) => (
            <div key={user.rank} className="flex items-center">
              <div className="font-medium text-gray-500 w-6">{user.rank}</div>
              <div className="mr-1">
                {user.change === "up" ? (
                  <ArrowUp className="h-3 w-3 text-green-500" />
                ) : (
                  <ArrowDown className="h-3 w-3 text-red-500" />
                )}
              </div>
              <Avatar className="h-10 w-10 mr-3">
                <AvatarImage src="/placeholder.svg?height=40&width=40" />
                <AvatarFallback>{user.avatar}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="font-medium">{user.name}</div>
              </div>
              <div className="text-sm text-gray-500">{user.score} points</div>
            </div>
          ))}
        </div>

        {/* Your Rank */}
        <div className="px-4 mt-8">
          <div className="bg-[#FFECB3] rounded-full p-3 flex items-center">
            <div className="font-medium text-gray-500 w-6">24</div>
            <div className="mr-1">
              <ArrowUp className="h-3 w-3 text-green-500" />
            </div>
            <div className="flex-1">
              <div className="font-medium">Your current rank</div>
            </div>
            <div className="text-sm text-gray-500">221 points</div>
          </div>
        </div>

        {/* Categories Tabs - Hidden but accessible through a button */}
        <div className="px-4 mt-8">
          <Button className="w-full bg-[#FF0099] hover:bg-[#FF0099]/90" onClick={() => {}}>
            View Category Leaderboards
          </Button>
        </div>

        {/* Weekly Challenge - Kept from previous design but styled to match */}
        <div className="p-4 mt-4">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <h3 className="font-medium mb-2">Weekly Challenge</h3>
            <p className="text-sm mb-3">Complete 5 learning quests in the Tech category</p>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-[#FF0099] h-2.5 rounded-full" style={{ width: "40%" }}></div>
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-500">
              <span>Progress: 2/5</span>
              <span>Reward: 100 $NALI</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
