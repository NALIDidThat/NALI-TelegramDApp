"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  ArrowUp, 
  ArrowDown, 
  ChevronLeft, 
  Trophy, 
  Star, 
  Target,
  Users,
  Sparkles,
  Map,
  Brain,
  TrendingUp,
  Clock
} from "lucide-react"
import Link from "next/link"

export default function LeaderboardPage() {
  const [timeFilter, setTimeFilter] = useState("Week")

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-md mx-auto bg-gradient-to-b from-[#6805f2]/10 to-[#f20789]/5 min-h-screen backdrop-blur-sm">
        {/* Header */}
        <div className="p-4 flex items-center justify-between relative">
          <Link href="/dashboard" className="absolute left-2">
            <ChevronLeft className="h-6 w-6 text-white" />
          </Link>
          <h1 className="text-xl font-bold text-white text-center flex-1">Leaderboard</h1>
          <Link href="/leaderboard/badges" className="absolute right-2">
            <Button variant="ghost" className="text-white hover:text-[#f20789]">
              Badges
            </Button>
          </Link>
        </div>

        {/* Stats Summary */}
        <div className="px-4 py-2">
          <div className="bg-white/5 rounded-xl p-4 backdrop-blur-sm">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <Trophy className="h-5 w-5 text-[#f20789] mx-auto mb-1" />
                <div className="text-xs text-white/70">Rank</div>
                <div className="text-lg font-bold text-white">#24</div>
              </div>
              <div className="text-center">
                <Star className="h-5 w-5 text-[#f20789] mx-auto mb-1" />
                <div className="text-xs text-white/70">Points</div>
                <div className="text-lg font-bold text-white">8,122</div>
              </div>
              <div className="text-center">
                <Target className="h-5 w-5 text-[#f20789] mx-auto mb-1" />
                <div className="text-xs text-white/70">To Next</div>
                <div className="text-lg font-bold text-white">90</div>
              </div>
            </div>
          </div>
        </div>

        {/* Time Filter */}
        <div className="px-4 py-4">
          <div className="flex justify-center space-x-4 bg-white/5 rounded-full p-1">
            {["Today", "Week", "Month"].map((filter) => (
              <button
                key={filter}
                onClick={() => setTimeFilter(filter)}
                className={`px-6 py-2 rounded-full text-sm transition-all ${
                  timeFilter === filter
                    ? "bg-[#f20789] text-white shadow-lg shadow-[#f20789]/20"
                    : "text-white/70 hover:text-white hover:bg-white/5"
              }`}
            >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Top 3 Podium */}
        <div className="px-8 py-6 flex justify-between items-end relative">
          {/* Decorative elements */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-[#f20789]/20 rounded-full blur-3xl"></div>
            <div className="absolute top-1/4 right-1/4 w-24 h-24 bg-[#6805f2]/20 rounded-full blur-2xl"></div>
          </div>

            {/* 2nd Place */}
          <div className="flex flex-col items-center space-y-2 z-10">
              <div className="relative">
              <Avatar className="h-16 w-16 border-2 border-[#f20789] ring-2 ring-[#f20789]/20">
                  <AvatarImage src="/placeholder.svg?height=64&width=64" />
                <AvatarFallback>2</AvatarFallback>
                </Avatar>
              <div className="absolute -bottom-1 -right-1 bg-[#f20789] rounded-full w-6 h-6 flex items-center justify-center text-white text-xs font-bold border-2 border-black">2</div>
              </div>
            <span className="text-white/90 text-sm">@dorisklem</span>
            <span className="text-[#f20789] font-bold">8032</span>
            </div>

            {/* 1st Place */}
          <div className="flex flex-col items-center space-y-2 -mt-8 z-10">
            <div className="text-yellow-400 text-3xl mb-2">👑</div>
              <div className="relative">
              <Avatar className="h-20 w-20 border-4 border-[#f20789] ring-4 ring-[#f20789]/20">
                  <AvatarImage src="/placeholder.svg?height=80&width=80" />
                <AvatarFallback>1</AvatarFallback>
                </Avatar>
              <div className="absolute -bottom-1 -right-1 bg-[#f20789] rounded-full w-7 h-7 flex items-center justify-center text-white font-bold border-2 border-black">1</div>
              </div>
            <span className="text-white/90 text-sm">@sher234</span>
            <span className="text-[#f20789] font-bold text-lg">8122</span>
            </div>

            {/* 3rd Place */}
          <div className="flex flex-col items-center space-y-2 z-10">
              <div className="relative">
              <Avatar className="h-16 w-16 border-2 border-[#f20789] ring-2 ring-[#f20789]/20">
                  <AvatarImage src="/placeholder.svg?height=64&width=64" />
                <AvatarFallback>3</AvatarFallback>
                </Avatar>
              <div className="absolute -bottom-1 -right-1 bg-[#f20789] rounded-full w-6 h-6 flex items-center justify-center text-white text-xs font-bold border-2 border-black">3</div>
            </div>
            <span className="text-white/90 text-sm">@lord_0980</span>
            <span className="text-[#f20789] font-bold">7884</span>
          </div>
        </div>

        {/* Leaderboard List */}
        <div className="px-4 space-y-3 mt-8">
          {[
            { rank: 4, name: "@adam56", score: 7881, change: "up", streak: 3 },
            { rank: 5, name: "@princess__", score: 6971, change: "up", streak: 5 },
            { rank: 6, name: "@julian-23", score: 6943, change: "down", streak: 0 },
            { rank: 7, name: "@tata008", score: 6540, change: "down", streak: 1 },
          ].map((user) => (
            <div
              key={user.rank}
              className="flex items-center bg-white/5 rounded-xl p-3 backdrop-blur-sm hover:bg-white/10 transition-colors"
            >
              <span className="text-white/60 w-6 font-medium">{user.rank}</span>
              <div className="ml-2">
                {user.change === "up" ? (
                  <ArrowUp className="h-4 w-4 text-green-400" />
                ) : (
                  <ArrowDown className="h-4 w-4 text-red-400" />
                )}
              </div>
              <Avatar className="h-10 w-10 mx-4 border border-[#f20789]/50">
                <AvatarImage src="/placeholder.svg?height=40&width=40" />
                <AvatarFallback>{user.rank}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <span className="text-white">{user.name}</span>
                {user.streak > 0 && (
                  <div className="text-xs text-[#f20789]">🔥 {user.streak} day streak</div>
                )}
              </div>
              <span className="text-[#f20789] font-medium">{user.score}</span>
            </div>
          ))}
        </div>

        {/* Weekly Challenge */}
        <div className="p-4">
          <div className="bg-white/5 rounded-xl p-4 backdrop-blur-sm border border-white/10">
            <h3 className="font-medium text-white mb-2 flex items-center">
              <Trophy className="h-4 w-4 text-[#f20789] mr-2" />
              Weekly Challenge
            </h3>
            <p className="text-sm text-white/70 mb-3">Complete 5 learning quests to earn bonus points!</p>
            <div className="w-full bg-white/10 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-[#f20789] to-[#6805f2] h-2 rounded-full"
                style={{ width: "40%" }}
              ></div>
            </div>
            <div className="flex justify-between mt-2 text-xs">
              <span className="text-white/60">2/5 completed</span>
              <span className="text-[#f20789]">+500 bonus points</span>
            </div>
          </div>
        </div>

        {/* Friend Activity */}
        <div className="p-4">
          <div className="bg-white/5 rounded-xl p-4 backdrop-blur-sm border border-white/10">
            <h3 className="font-medium text-white mb-4 flex items-center">
              <Users className="h-4 w-4 text-[#f20789] mr-2" />
              Friend Activity
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-8 w-8 border border-[#f20789]/50">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" />
                    <AvatarFallback>JL</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-white text-sm">@julian-23</p>
                    <p className="text-xs text-white/60">Completed "Web3 Basics"</p>
                  </div>
                </div>
                <span className="text-xs text-[#f20789]">2m ago</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-8 w-8 border border-[#f20789]/50">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" />
                    <AvatarFallback>AP</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-white text-sm">@princess__</p>
                    <p className="text-xs text-white/60">Started "DeFi Journey"</p>
                  </div>
                </div>
                <span className="text-xs text-[#f20789]">15m ago</span>
              </div>
            </div>
          </div>
        </div>

        {/* AI Insights */}
        <div className="p-4">
          <div className="bg-white/5 rounded-xl p-4 backdrop-blur-sm border border-white/10">
            <h3 className="font-medium text-white mb-4 flex items-center">
              <Brain className="h-4 w-4 text-[#f20789] mr-2" />
              AI Insights
            </h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#f20789] to-[#6805f2] flex items-center justify-center">
                  <TrendingUp className="h-4 w-4 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-white">Your learning pace increased by 23% this week</p>
                  <p className="text-xs text-white/60">Keep up the momentum!</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#f20789] to-[#6805f2] flex items-center justify-center">
                  <Clock className="h-4 w-4 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-white">Best study times: 10 AM - 12 PM</p>
                  <p className="text-xs text-white/60">You complete most quests during these hours</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Journeys */}
        <div className="p-4">
          <div className="bg-white/5 rounded-xl p-4 backdrop-blur-sm border border-white/10">
            <h3 className="font-medium text-white mb-4 flex items-center">
              <Map className="h-4 w-4 text-[#f20789] mr-2" />
              Recommended Journeys
            </h3>
            <div className="space-y-3">
              <div className="bg-white/5 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-white font-medium">NFT Mastery</h4>
                  <span className="text-xs text-[#f20789]">4 quests</span>
                </div>
                <p className="text-xs text-white/60 mb-2">Perfect next step based on your DeFi progress</p>
                <div className="flex items-center space-x-2">
                  <Avatar className="h-5 w-5">
                    <AvatarImage src="/placeholder.svg?height=20&width=20" />
                    <AvatarFallback>+3</AvatarFallback>
                  </Avatar>
                  <span className="text-xs text-white/60">3 friends started this</span>
                </div>
              </div>

              <div className="bg-white/5 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-white font-medium">Smart Contract Security</h4>
                  <span className="text-xs text-[#f20789]">6 quests</span>
                </div>
                <p className="text-xs text-white/60 mb-2">Trending among developers in your network</p>
                <div className="flex items-center space-x-2">
                  <Avatar className="h-5 w-5">
                    <AvatarImage src="/placeholder.svg?height=20&width=20" />
                    <AvatarFallback>+5</AvatarFallback>
                  </Avatar>
                  <span className="text-xs text-white/60">5 friends completed</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Experience Milestones */}
        <div className="p-4 pb-8">
          <div className="bg-white/5 rounded-xl p-4 backdrop-blur-sm border border-white/10">
            <h3 className="font-medium text-white mb-4 flex items-center">
              <Sparkles className="h-4 w-4 text-[#f20789] mr-2" />
              Experience Milestones
            </h3>
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-px bg-white/10"></div>
              <div className="space-y-6">
                <div className="relative pl-8">
                  <div className="absolute left-0 w-8 h-8 rounded-full bg-[#f20789] flex items-center justify-center">
                    <span className="text-white text-xs">NOW</span>
                  </div>
                  <p className="text-white text-sm">Level 24 - Web3 Explorer</p>
                  <p className="text-xs text-white/60">90 points to next level</p>
                </div>
                <div className="relative pl-8">
                  <div className="absolute left-0 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                    <span className="text-white/60 text-xs">25</span>
                  </div>
                  <p className="text-white/60 text-sm">Smart Contract Specialist</p>
                  <p className="text-xs text-white/40">Unlocks new quest types</p>
                </div>
                <div className="relative pl-8">
                  <div className="absolute left-0 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                    <span className="text-white/60 text-xs">26</span>
                  </div>
                  <p className="text-white/60 text-sm">DeFi Navigator</p>
                  <p className="text-xs text-white/40">Access to advanced challenges</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
