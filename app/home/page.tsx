"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import AppLayout from "@/components/layout/app-layout"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Zap,
  Calendar,
  MapPin,
  Users,
  Trophy,
  ChevronRight,
  Sparkles,
  Star,
  BookOpen,
  Heart,
  Coins,
  ArrowRight,
  CheckCircle2,
  Clock,
  Gift,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function HomePage() {
  const router = useRouter()
  const [telegramTheme, setTelegramTheme] = useState({
    bg_color: "#ffffff",
    text_color: "#000000",
    hint_color: "#999999",
    button_color: "#FF0099",
    button_text_color: "#ffffff",
  })
  const [xpDialogOpen, setXpDialogOpen] = useState(false)

  // Initialize Telegram WebApp
  useEffect(() => {
    // Check if we're in Telegram environment
    if (typeof window !== "undefined" && window.Telegram && window.Telegram.WebApp) {
      const tg = window.Telegram.WebApp

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
    }

    // Mark onboarding as completed when visiting home directly
    // This ensures users don't get redirected back to onboarding
    localStorage.setItem("onboardingCompleted", "true")
  }, [])

  // Mock data for recent activity
  const recentActivity = [
    {
      id: 1,
      type: "achievement",
      title: "Digital Skills Badge Earned",
      description: "You completed the Digital Skills Workshop",
      time: "2 hours ago",
      xp: 50,
      icon: <Trophy className="h-5 w-5 text-amber-500" />,
    },
    {
      id: 2,
      type: "event",
      title: "Community Garden Project",
      description: "You signed up for the planting day",
      time: "Yesterday",
      xp: 0,
      icon: <Calendar className="h-5 w-5 text-green-500" />,
    },
    {
      id: 3,
      type: "milestone",
      title: "Financial Literacy Quiz",
      description: "You completed Module 2 with 85% score",
      time: "2 days ago",
      xp: 30,
      icon: <Star className="h-5 w-5 text-blue-500" />,
    },
  ]

  // Mock data for upcoming events
  const upcomingEvents = [
    {
      id: 1,
      title: "Digital Skills Workshop",
      location: "Chingford Library",
      date: "Today, 3:00 PM",
      distance: "0.8 miles away",
    },
    {
      id: 2,
      title: "Community Garden Planting",
      location: "Chingford Community Center",
      date: "Tomorrow, 10:00 AM",
      distance: "0.5 miles away",
    },
  ]

  return (
    <AppLayout hideBackButton={true}>
      <div className="max-w-md mx-auto pb-20">
        {/* Welcome Header */}
        <div className="bg-[#FF0099] text-white p-4 rounded-b-3xl shadow-md">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12 border-2 border-white/50">
                <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Alex" />
                <AvatarFallback>A</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-xl font-bold">Welcome, Alex!</h1>
                <p className="text-sm opacity-90">Level 5 Explorer</p>
              </div>
            </div>
            <div
              className="bg-white/20 px-3 py-1.5 rounded-full flex items-center cursor-pointer hover:bg-white/30 transition-colors"
              onClick={() => {
                setXpDialogOpen(true)
                // Haptic feedback if in Telegram
                if (typeof window !== "undefined" && window.Telegram && window.Telegram.WebApp) {
                  window.Telegram.WebApp.HapticFeedback.impactOccurred("light")
                }
              }}
            >
              <Zap className="h-4 w-4 mr-1" />
              <span className="font-medium">1,250 XP</span>
            </div>
          </div>

          <div className="mt-4">
            <div className="flex justify-between text-sm mb-1">
              <span>Level 5</span>
              <span>750/1000 XP to Level 6</span>
            </div>
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full bg-white rounded-full" style={{ width: "75%" }}></div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-6">
          {/* Quick Actions */}
          <div>
            <h2 className="text-lg font-medium mb-3" style={{ color: telegramTheme.text_color }}>
              Quick Actions
            </h2>
            <div className="grid grid-cols-4 gap-3">
              <motion.div
                whileTap={{ scale: 0.95 }}
                className="flex flex-col items-center"
                onClick={() => router.push("/experiences")}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mb-1"
                  style={{
                    backgroundColor: telegramTheme.hint_color + "15",
                    color: "#FF0099",
                  }}
                >
                  <BookOpen className="h-6 w-6" />
                </div>
                <span className="text-xs text-center" style={{ color: telegramTheme.text_color }}>
                  Experiences
                </span>
              </motion.div>

              <motion.div
                whileTap={{ scale: 0.95 }}
                className="flex flex-col items-center"
                onClick={() => router.push("/maps")}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mb-1"
                  style={{
                    backgroundColor: telegramTheme.hint_color + "15",
                    color: "#FF0099",
                  }}
                >
                  <MapPin className="h-6 w-6" />
                </div>
                <span className="text-xs text-center" style={{ color: telegramTheme.text_color }}>
                  Nearby
                </span>
              </motion.div>

              <motion.div
                whileTap={{ scale: 0.95 }}
                className="flex flex-col items-center"
                onClick={() => router.push("/community")}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mb-1"
                  style={{
                    backgroundColor: telegramTheme.hint_color + "15",
                    color: "#FF0099",
                  }}
                >
                  <Users className="h-6 w-6" />
                </div>
                <span className="text-xs text-center" style={{ color: telegramTheme.text_color }}>
                  Community
                </span>
              </motion.div>

              <motion.div
                whileTap={{ scale: 0.95 }}
                className="flex flex-col items-center"
                onClick={() => router.push("/rewards")}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mb-1"
                  style={{
                    backgroundColor: telegramTheme.hint_color + "15",
                    color: "#FF0099",
                  }}
                >
                  <Trophy className="h-6 w-6" />
                </div>
                <span className="text-xs text-center" style={{ color: telegramTheme.text_color }}>
                  Rewards
                </span>
              </motion.div>
            </div>
          </div>

          {/* Daily Challenge */}
          <div>
            <h2 className="text-lg font-medium mb-3" style={{ color: telegramTheme.text_color }}>
              Today's Challenge
            </h2>
            <motion.div
              whileTap={{ scale: 0.98 }}
              className="rounded-xl overflow-hidden"
              style={{
                backgroundColor: telegramTheme.bg_color,
                boxShadow: "0 1px 3px " + telegramTheme.hint_color + "20",
              }}
            >
              <div className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Sparkles className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium" style={{ color: telegramTheme.text_color }}>
                      Financial Literacy Quiz
                    </h3>
                    <p className="text-sm" style={{ color: telegramTheme.hint_color }}>
                      Complete today's quiz to earn XP
                    </p>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <Badge className="bg-[#FF0099]">+30 XP</Badge>
                  <Button
                    size="sm"
                    className="bg-[#FF0099] hover:bg-[#FF0099]/90"
                    onClick={() => router.push("/experiences")}
                  >
                    Start Now
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Upcoming Events */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-medium" style={{ color: telegramTheme.text_color }}>
                Upcoming Events
              </h2>
              <Button
                variant="ghost"
                size="sm"
                className="text-xs flex items-center gap-1 h-7 px-2"
                style={{ color: "#FF0099" }}
                onClick={() => router.push("/experiences")}
              >
                View All
                <ChevronRight className="h-3 w-3" />
              </Button>
            </div>

            <div className="space-y-3">
              {upcomingEvents.map((event) => (
                <motion.div
                  key={event.id}
                  whileTap={{ scale: 0.98 }}
                  className="rounded-xl overflow-hidden cursor-pointer"
                  style={{
                    backgroundColor: telegramTheme.bg_color,
                    boxShadow: "0 1px 3px " + telegramTheme.hint_color + "20",
                  }}
                  onClick={() => router.push("/experiences")}
                >
                  <div className="p-4">
                    <h3 className="font-medium mb-1" style={{ color: telegramTheme.text_color }}>
                      {event.title}
                    </h3>

                    <div className="flex items-center gap-4 text-sm" style={{ color: telegramTheme.hint_color }}>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>{event.date}</span>
                      </div>

                      <div className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-medium" style={{ color: telegramTheme.text_color }}>
                Recent Activity
              </h2>
              <Button
                variant="ghost"
                size="sm"
                className="text-xs flex items-center gap-1 h-7 px-2"
                style={{ color: "#FF0099" }}
                onClick={() => router.push("/dashboard")}
              >
                View All
                <ChevronRight className="h-3 w-3" />
              </Button>
            </div>

            <div className="space-y-3">
              {recentActivity.map((activity) => (
                <motion.div
                  key={activity.id}
                  whileTap={{ scale: 0.98 }}
                  className="rounded-xl overflow-hidden"
                  style={{
                    backgroundColor: telegramTheme.bg_color,
                    boxShadow: "0 1px 3px " + telegramTheme.hint_color + "20",
                  }}
                >
                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex items-start gap-3">
                        <div
                          className="mt-1 p-2 rounded-lg bg-gray-100"
                          style={{ backgroundColor: telegramTheme.hint_color + "15" }}
                        >
                          {activity.icon}
                        </div>
                        <div>
                          <h3 className="font-medium" style={{ color: telegramTheme.text_color }}>
                            {activity.title}
                          </h3>
                          <p className="text-sm" style={{ color: telegramTheme.hint_color }}>
                            {activity.description}
                          </p>
                          <p className="text-xs mt-1" style={{ color: telegramTheme.hint_color }}>
                            {activity.time}
                          </p>
                        </div>
                      </div>
                      {activity.xp > 0 && <Badge className="bg-[#FF0099]">+{activity.xp} XP</Badge>}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Community Spotlight */}
          <div>
            <h2 className="text-lg font-medium mb-3" style={{ color: telegramTheme.text_color }}>
              Community Spotlight
            </h2>
            <motion.div
              whileTap={{ scale: 0.98 }}
              className="rounded-xl overflow-hidden cursor-pointer"
              style={{
                backgroundColor: telegramTheme.bg_color,
                boxShadow: "0 1px 3px " + telegramTheme.hint_color + "20",
              }}
              onClick={() => router.push("/community")}
            >
              <div className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-pink-100 p-2 rounded-lg">
                    <Heart className="h-5 w-5 text-pink-600" />
                  </div>
                  <div>
                    <h3 className="font-medium" style={{ color: telegramTheme.text_color }}>
                      Community Garden Project
                    </h3>
                    <p className="text-sm" style={{ color: telegramTheme.hint_color }}>
                      12 neighbors are participating
                    </p>
                  </div>
                </div>

                <div className="flex -space-x-2 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Avatar key={i} className="border-2 border-white h-8 w-8">
                      <AvatarFallback>{String.fromCharCode(65 + i)}</AvatarFallback>
                    </Avatar>
                  ))}
                  <div
                    className="flex items-center justify-center h-8 w-8 rounded-full border-2 text-xs font-medium"
                    style={{
                      borderColor: telegramTheme.bg_color,
                      backgroundColor: telegramTheme.hint_color + "30",
                      color: telegramTheme.text_color,
                    }}
                  >
                    +7
                  </div>
                </div>

                <Button
                  size="sm"
                  variant="outline"
                  className="w-full border-[#FF0099] text-[#FF0099] hover:bg-[#FF0099]/10"
                >
                  Join Project
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      {/* XP Detail Dialog */}
      <Dialog open={xpDialogOpen} onOpenChange={setXpDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold flex items-center gap-2">
              <Zap className="h-5 w-5 text-[#FF0099]" />
              Your XP & Wallet
            </DialogTitle>
            <DialogDescription>Track your progress and redeem rewards</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* XP Summary */}
            <div className="bg-[#FF0099]/10 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <div className="font-medium">Total XP</div>
                <div className="text-xl font-bold text-[#FF0099]">1,250 XP</div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>Level 5</span>
                  <span>750/1000 XP to Level 6</span>
                </div>
                <div className="h-2 bg-[#FF0099]/20 rounded-full overflow-hidden">
                  <div className="h-full bg-[#FF0099] rounded-full" style={{ width: "75%" }}></div>
                </div>
              </div>
            </div>

            {/* Wallet */}
            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-3">
                <div className="font-medium text-lg flex items-center gap-2">
                  <Coins className="h-5 w-5 text-[#FF0099]" />
                  Your Wallet
                </div>
                <div className="text-lg font-bold">250 $NALI</div>
              </div>
              <div className="text-sm text-muted-foreground mb-3">
                Earn $NALI tokens by reaching XP milestones and completing special challenges.
              </div>
              <Button
                variant="outline"
                className="w-full border-[#FF0099] text-[#FF0099]"
                onClick={() => {
                  setXpDialogOpen(false)
                  router.push("/rewards")
                }}
              >
                View Rewards
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>

            {/* Redemption Milestones */}
            <div>
              <h3 className="font-medium mb-2">XP Milestones</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-gray-100 rounded-lg">
                  <div className="bg-green-100 p-2 rounded-full">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">Level 5 Reached</div>
                    <div className="text-xs text-muted-foreground">Unlocked 50 $NALI tokens</div>
                  </div>
                  <Badge className="bg-green-600">Claimed</Badge>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-100 rounded-lg">
                  <div className="bg-amber-100 p-2 rounded-full">
                    <Clock className="h-4 w-4 text-amber-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">Level 6 Milestone</div>
                    <div className="text-xs text-muted-foreground">Unlock 75 $NALI tokens</div>
                  </div>
                  <div className="text-xs font-medium">750/1000 XP</div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-100 rounded-lg">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Gift className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">Special Achievement</div>
                    <div className="text-xs text-muted-foreground">Complete all Digital Skills workshops</div>
                  </div>
                  <Badge className="bg-[#FF0099]">+100 $NALI</Badge>
                </div>
              </div>
            </div>

            {/* Recent XP Activity */}
            <div>
              <h3 className="font-medium mb-2">Recent XP Activity</h3>
              <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                {[
                  { title: "Digital Skills Workshop", xp: 50, date: "Today" },
                  { title: "Community Forum Post", xp: 15, date: "Yesterday" },
                  { title: "Financial Literacy Quiz", xp: 30, date: "2 days ago" },
                  { title: "Daily Login Streak", xp: 10, date: "3 days ago" },
                  { title: "Volunteer Activity", xp: 75, date: "1 week ago" },
                ].map((activity, index) => (
                  <div key={index} className="flex justify-between items-center p-2 text-sm border-b">
                    <div>
                      <div className="font-medium">{activity.title}</div>
                      <div className="text-xs text-muted-foreground">{activity.date}</div>
                    </div>
                    <Badge className="bg-[#FF0099]">+{activity.xp} XP</Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button onClick={() => setXpDialogOpen(false)} className="w-full bg-[#FF0099] hover:bg-[#FF0099]/90">
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppLayout>
  )
}

// Add TypeScript interface
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
