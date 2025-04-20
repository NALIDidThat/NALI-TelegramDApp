"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import AppLayout from "@/components/layout/app-layout"
import {
  User,
  Settings,
  Award,
  Calendar,
  MapPin,
  Mail,
  Phone,
  Edit,
  ChevronRight,
  Trophy,
  BookOpen,
  Users,
  Zap,
  Star,
  Activity,
  BarChart2,
  Clock,
  Heart,
  Target,
  Bookmark,
  Bell,
  Wallet,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data for user activities and achievements
const userActivities = [
  { id: 1, type: "learning", title: "Completed Web3 Basics", date: "2 days ago", xp: 50 },
  { id: 2, type: "community", title: "Hosted Learning Pod", date: "3 days ago", xp: 75 },
  { id: 3, type: "marketplace", title: "Redeemed Local Café Offer", date: "1 week ago", xp: 0 },
  { id: 4, type: "learning", title: "Completed Financial Literacy Quiz", date: "1 week ago", xp: 30 },
  { id: 5, type: "community", title: "Attended Local Workshop", date: "2 weeks ago", xp: 45 },
]

const userAchievements = [
  {
    id: 1,
    title: "Digital Explorer",
    description: "Completed 5 tech learning quests",
    icon: <BookOpen className="h-6 w-6 text-blue-600" />,
    date: "Apr 12, 2024",
  },
  {
    id: 2,
    title: "Community Helper",
    description: "Hosted 3 learning sessions",
    icon: <Users className="h-6 w-6 text-green-600" />,
    date: "Mar 28, 2024",
  },
  {
    id: 3,
    title: "Quick Learner",
    description: "Completed 10 quests in one week",
    icon: <Zap className="h-6 w-6 text-amber-600" />,
    date: "Mar 15, 2024",
  },
]

const userStats = {
  totalXP: 1250,
  level: 5,
  nextLevelXP: 1000,
  currentLevelXP: 750,
  quests: 18,
  badges: 7,
  streak: 5,
  leaderboardRank: 24,
  tokensEarned: 320,
  podsMember: 3,
  eventsAttended: 8,
  offersRedeemed: 4,
}

export default function ProfilePage() {
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
  }, [])

  return (
    <AppLayout>
      <div className="max-w-md mx-auto pb-20">
        {/* Profile Header */}
        <div className="bg-[#FF0099] text-white p-6 rounded-b-3xl shadow-md flex flex-col items-center relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute top-5 left-5 w-20 h-20 rounded-full bg-white"></div>
            <div className="absolute bottom-10 right-5 w-16 h-16 rounded-full bg-white"></div>
            <div className="absolute top-20 right-10 w-12 h-12 rounded-full bg-white"></div>
          </div>

          <div className="relative mb-2 z-10">
            <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
              <User className="w-12 h-12" />
            </div>
            <button className="absolute bottom-0 right-0 bg-white rounded-full p-1.5">
              <Edit className="w-4 h-4 text-[#FF0099]" />
            </button>
          </div>
          <h1 className="text-xl font-bold z-10">Alex Johnson</h1>
          <p className="text-sm opacity-90 z-10">Level {userStats.level} Explorer</p>

          <div className="flex items-center mt-1 z-10">
            <Star className="h-4 w-4 text-yellow-300 mr-1" />
            <span className="text-xs">{userStats.streak} day streak</span>
          </div>

          <div className="w-full mt-4 z-10">
            <div className="flex justify-between text-sm mb-1">
              <span>{userStats.totalXP} XP</span>
              <span>
                {userStats.currentLevelXP}/{userStats.nextLevelXP} XP to Level {userStats.level + 1}
              </span>
            </div>
            <Progress
              value={(userStats.currentLevelXP / userStats.nextLevelXP) * 100}
              className="h-2 bg-white/20"
              indicatorClassName="bg-white"
            />
          </div>

          <div className="flex gap-3 mt-4 z-10">
            <div className="flex flex-col items-center bg-white/20 px-3 py-1.5 rounded-lg">
              <span className="font-bold">{userStats.quests}</span>
              <span className="text-xs">Quests</span>
            </div>
            <div className="flex flex-col items-center bg-white/20 px-3 py-1.5 rounded-lg">
              <span className="font-bold">{userStats.badges}</span>
              <span className="text-xs">Badges</span>
            </div>
            <div className="flex flex-col items-center bg-white/20 px-3 py-1.5 rounded-lg">
              <span className="font-bold">#{userStats.leaderboardRank}</span>
              <span className="text-xs">Rank</span>
            </div>
            <div className="flex flex-col items-center bg-white/20 px-3 py-1.5 rounded-lg">
              <span className="font-bold">{userStats.tokensEarned}</span>
              <span className="text-xs">$NALI</span>
            </div>
          </div>
        </div>

        {/* Content Tabs */}
        <Tabs defaultValue="overview" className="mt-4">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="achievements">Badges</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Overview */}
            <div>
              <h2 className="text-lg font-medium mb-3" style={{ color: telegramTheme.text_color }}>
                Your Stats
              </h2>
              <div
                className="bg-white rounded-xl shadow-sm p-4"
                style={{
                  backgroundColor: telegramTheme.bg_color,
                  boxShadow: "0 1px 3px " + telegramTheme.hint_color + "20",
                }}
              >
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <div className="bg-blue-100 p-2 rounded-lg mr-3">
                      <Trophy className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500" style={{ color: telegramTheme.hint_color }}>
                        Leaderboard
                      </p>
                      <h3 className="font-medium" style={{ color: telegramTheme.text_color }}>
                        #{userStats.leaderboardRank} Rank
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="bg-green-100 p-2 rounded-lg mr-3">
                      <BookOpen className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500" style={{ color: telegramTheme.hint_color }}>
                        Quests
                      </p>
                      <h3 className="font-medium" style={{ color: telegramTheme.text_color }}>
                        {userStats.quests} Completed
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="bg-amber-100 p-2 rounded-lg mr-3">
                      <Users className="h-5 w-5 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500" style={{ color: telegramTheme.hint_color }}>
                        Learning Pods
                      </p>
                      <h3 className="font-medium" style={{ color: telegramTheme.text_color }}>
                        {userStats.podsMember} Active
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="bg-purple-100 p-2 rounded-lg mr-3">
                      <Activity className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500" style={{ color: telegramTheme.hint_color }}>
                        Streak
                      </p>
                      <h3 className="font-medium" style={{ color: telegramTheme.text_color }}>
                        {userStats.streak} Days
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Personal Information */}
            <div>
              <h2 className="text-lg font-medium mb-3" style={{ color: telegramTheme.text_color }}>
                Personal Information
              </h2>
              <div
                className="bg-white rounded-xl shadow-sm p-4 space-y-4"
                style={{
                  backgroundColor: telegramTheme.bg_color,
                  boxShadow: "0 1px 3px " + telegramTheme.hint_color + "20",
                }}
              >
                <div className="flex items-center">
                  <div className="bg-blue-100 p-2 rounded-lg mr-3">
                    <Mail className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500" style={{ color: telegramTheme.hint_color }}>
                      Email
                    </p>
                    <h3 className="font-medium" style={{ color: telegramTheme.text_color }}>
                      alex.johnson@example.com
                    </h3>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="bg-green-100 p-2 rounded-lg mr-3">
                    <Phone className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500" style={{ color: telegramTheme.hint_color }}>
                      Phone
                    </p>
                    <h3 className="font-medium" style={{ color: telegramTheme.text_color }}>
                      +44 7700 900123
                    </h3>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="bg-amber-100 p-2 rounded-lg mr-3">
                    <MapPin className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500" style={{ color: telegramTheme.hint_color }}>
                      Location
                    </p>
                    <h3 className="font-medium" style={{ color: telegramTheme.text_color }}>
                      Chingford, London
                    </h3>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="bg-purple-100 p-2 rounded-lg mr-3">
                    <Calendar className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500" style={{ color: telegramTheme.hint_color }}>
                      Member Since
                    </p>
                    <h3 className="font-medium" style={{ color: telegramTheme.text_color }}>
                      March 2024
                    </h3>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg font-medium" style={{ color: telegramTheme.text_color }}>
                  Recent Activity
                </h2>
                <Link href="#" className="text-xs text-[#FF0099] flex items-center">
                  View All <ChevronRight className="h-3 w-3 ml-0.5" />
                </Link>
              </div>
              <div
                className="bg-white rounded-xl shadow-sm p-4 space-y-3"
                style={{
                  backgroundColor: telegramTheme.bg_color,
                  boxShadow: "0 1px 3px " + telegramTheme.hint_color + "20",
                }}
              >
                {userActivities.slice(0, 3).map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-center justify-between py-2 border-b last:border-0"
                    style={{ borderColor: telegramTheme.hint_color + "15" }}
                  >
                    <div className="flex items-center">
                      <div
                        className={`p-2 rounded-lg mr-3 ${
                          activity.type === "learning"
                            ? "bg-blue-100"
                            : activity.type === "community"
                              ? "bg-green-100"
                              : "bg-amber-100"
                        }`}
                      >
                        {activity.type === "learning" ? (
                          <BookOpen className="h-4 w-4 text-blue-600" />
                        ) : activity.type === "community" ? (
                          <Users className="h-4 w-4 text-green-600" />
                        ) : (
                          <Bookmark className="h-4 w-4 text-amber-600" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium text-sm" style={{ color: telegramTheme.text_color }}>
                          {activity.title}
                        </h3>
                        <p className="text-xs" style={{ color: telegramTheme.hint_color }}>
                          {activity.date}
                        </p>
                      </div>
                    </div>
                    {activity.xp > 0 && (
                      <Badge variant="outline" className="bg-[#FF0099]/10 text-[#FF0099] border-[#FF0099]/20">
                        +{activity.xp} XP
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements" className="space-y-6">
            <div>
              <h2 className="text-lg font-medium mb-3" style={{ color: telegramTheme.text_color }}>
                Your Badges & Achievements
              </h2>
              <div
                className="bg-white rounded-xl shadow-sm p-4 space-y-4"
                style={{
                  backgroundColor: telegramTheme.bg_color,
                  boxShadow: "0 1px 3px " + telegramTheme.hint_color + "20",
                }}
              >
                {userAchievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className="flex items-start p-3 border rounded-lg"
                    style={{ borderColor: telegramTheme.hint_color + "20" }}
                  >
                    <div className="bg-white p-3 rounded-lg mr-3 shadow-sm">{achievement.icon}</div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium" style={{ color: telegramTheme.text_color }}>
                          {achievement.title}
                        </h3>
                        <span className="text-xs" style={{ color: telegramTheme.hint_color }}>
                          {achievement.date}
                        </span>
                      </div>
                      <p className="text-sm mt-1" style={{ color: telegramTheme.hint_color }}>
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                ))}

                {/* Locked Achievements */}
                <div
                  className="flex items-start p-3 border rounded-lg opacity-60"
                  style={{ borderColor: telegramTheme.hint_color + "20" }}
                >
                  <div className="bg-gray-100 p-3 rounded-lg mr-3 shadow-sm">
                    <Target className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium" style={{ color: telegramTheme.text_color }}>
                      Local Champion
                    </h3>
                    <p className="text-sm mt-1" style={{ color: telegramTheme.hint_color }}>
                      Attend 10 local events (6/10 completed)
                    </p>
                    <div className="mt-2 w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-gray-400 h-full rounded-full" style={{ width: "60%" }}></div>
                    </div>
                  </div>
                </div>

                <div
                  className="flex items-start p-3 border rounded-lg opacity-60"
                  style={{ borderColor: telegramTheme.hint_color + "20" }}
                >
                  <div className="bg-gray-100 p-3 rounded-lg mr-3 shadow-sm">
                    <Heart className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium" style={{ color: telegramTheme.text_color }}>
                      Community Builder
                    </h3>
                    <p className="text-sm mt-1" style={{ color: telegramTheme.hint_color }}>
                      Create your first learning pod
                    </p>
                    <Button variant="outline" size="sm" className="mt-2 text-xs h-7">
                      Start Now
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Badge Collection */}
            <div>
              <h2 className="text-lg font-medium mb-3" style={{ color: telegramTheme.text_color }}>
                Badge Collection
              </h2>
              <div
                className="bg-white rounded-xl shadow-sm p-4"
                style={{
                  backgroundColor: telegramTheme.bg_color,
                  boxShadow: "0 1px 3px " + telegramTheme.hint_color + "20",
                }}
              >
                <div className="grid grid-cols-3 gap-3">
                  <div className="flex flex-col items-center p-3 bg-blue-50 rounded-lg">
                    <Award className="h-8 w-8 text-blue-600 mb-2" />
                    <span className="text-sm font-medium text-center" style={{ color: telegramTheme.text_color }}>
                      Digital Explorer
                    </span>
                  </div>

                  <div className="flex flex-col items-center p-3 bg-green-50 rounded-lg">
                    <Award className="h-8 w-8 text-green-600 mb-2" />
                    <span className="text-sm font-medium text-center" style={{ color: telegramTheme.text_color }}>
                      Community Helper
                    </span>
                  </div>

                  <div className="flex flex-col items-center p-3 bg-amber-50 rounded-lg">
                    <Award className="h-8 w-8 text-amber-600 mb-2" />
                    <span className="text-sm font-medium text-center" style={{ color: telegramTheme.text_color }}>
                      Quick Learner
                    </span>
                  </div>

                  <div className="flex flex-col items-center p-3 bg-purple-50 rounded-lg">
                    <Award className="h-8 w-8 text-purple-600 mb-2" />
                    <span className="text-sm font-medium text-center" style={{ color: telegramTheme.text_color }}>
                      Streak Master
                    </span>
                  </div>

                  <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                    <Award className="h-8 w-8 text-gray-400 mb-2" />
                    <span className="text-sm font-medium text-center" style={{ color: telegramTheme.hint_color }}>
                      Locked
                    </span>
                  </div>

                  <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                    <Award className="h-8 w-8 text-gray-400 mb-2" />
                    <span className="text-sm font-medium text-center" style={{ color: telegramTheme.hint_color }}>
                      Locked
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity" className="space-y-6">
            <div>
              <h2 className="text-lg font-medium mb-3" style={{ color: telegramTheme.text_color }}>
                Activity History
              </h2>
              <div
                className="bg-white rounded-xl shadow-sm p-4 space-y-3"
                style={{
                  backgroundColor: telegramTheme.bg_color,
                  boxShadow: "0 1px 3px " + telegramTheme.hint_color + "20",
                }}
              >
                {userActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-center justify-between py-2 border-b last:border-0"
                    style={{ borderColor: telegramTheme.hint_color + "15" }}
                  >
                    <div className="flex items-center">
                      <div
                        className={`p-2 rounded-lg mr-3 ${
                          activity.type === "learning"
                            ? "bg-blue-100"
                            : activity.type === "community"
                              ? "bg-green-100"
                              : "bg-amber-100"
                        }`}
                      >
                        {activity.type === "learning" ? (
                          <BookOpen className="h-4 w-4 text-blue-600" />
                        ) : activity.type === "community" ? (
                          <Users className="h-4 w-4 text-green-600" />
                        ) : (
                          <Bookmark className="h-4 w-4 text-amber-600" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium text-sm" style={{ color: telegramTheme.text_color }}>
                          {activity.title}
                        </h3>
                        <p className="text-xs" style={{ color: telegramTheme.hint_color }}>
                          {activity.date}
                        </p>
                      </div>
                    </div>
                    {activity.xp > 0 && (
                      <Badge variant="outline" className="bg-[#FF0099]/10 text-[#FF0099] border-[#FF0099]/20">
                        +{activity.xp} XP
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Learning Stats */}
            <div>
              <h2 className="text-lg font-medium mb-3" style={{ color: telegramTheme.text_color }}>
                Learning Stats
              </h2>
              <div
                className="bg-white rounded-xl shadow-sm p-4 space-y-4"
                style={{
                  backgroundColor: telegramTheme.bg_color,
                  boxShadow: "0 1px 3px " + telegramTheme.hint_color + "20",
                }}
              >
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span style={{ color: telegramTheme.text_color }}>Financial Literacy</span>
                      <span style={{ color: telegramTheme.hint_color }}>4/5 quests</span>
                    </div>
                    <Progress value={80} className="h-2" />
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span style={{ color: telegramTheme.text_color }}>Web3 Basics</span>
                      <span style={{ color: telegramTheme.hint_color }}>3/5 quests</span>
                    </div>
                    <Progress value={60} className="h-2" />
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span style={{ color: telegramTheme.text_color }}>Creative Skills</span>
                      <span style={{ color: telegramTheme.hint_color }}>2/5 quests</span>
                    </div>
                    <Progress value={40} className="h-2" />
                  </div>
                </div>

                <div className="pt-2 border-t" style={{ borderColor: telegramTheme.hint_color + "15" }}>
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium text-sm" style={{ color: telegramTheme.text_color }}>
                        Total Learning Time
                      </h3>
                      <p className="text-xs" style={{ color: telegramTheme.hint_color }}>
                        This month
                      </p>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" style={{ color: telegramTheme.hint_color }} />
                      <span className="font-medium" style={{ color: telegramTheme.text_color }}>
                        12h 45m
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Community Engagement */}
            <div>
              <h2 className="text-lg font-medium mb-3" style={{ color: telegramTheme.text_color }}>
                Community Engagement
              </h2>
              <div
                className="bg-white rounded-xl shadow-sm p-4"
                style={{
                  backgroundColor: telegramTheme.bg_color,
                  boxShadow: "0 1px 3px " + telegramTheme.hint_color + "20",
                }}
              >
                <div className="grid grid-cols-2 gap-4">
                  <div
                    className="flex flex-col items-center p-3 border rounded-lg"
                    style={{ borderColor: telegramTheme.hint_color + "20" }}
                  >
                    <Users className="h-6 w-6 mb-1" style={{ color: telegramTheme.text_color }} />
                    <span className="font-medium text-sm" style={{ color: telegramTheme.text_color }}>
                      Learning Pods
                    </span>
                    <span className="text-lg font-bold" style={{ color: telegramTheme.text_color }}>
                      {userStats.podsMember}
                    </span>
                  </div>

                  <div
                    className="flex flex-col items-center p-3 border rounded-lg"
                    style={{ borderColor: telegramTheme.hint_color + "20" }}
                  >
                    <BarChart2 className="h-6 w-6 mb-1" style={{ color: telegramTheme.text_color }} />
                    <span className="font-medium text-sm" style={{ color: telegramTheme.text_color }}>
                      Events Attended
                    </span>
                    <span className="text-lg font-bold" style={{ color: telegramTheme.text_color }}>
                      {userStats.eventsAttended}
                    </span>
                  </div>

                  <div
                    className="flex flex-col items-center p-3 border rounded-lg"
                    style={{ borderColor: telegramTheme.hint_color + "20" }}
                  >
                    <Heart className="h-6 w-6 mb-1" style={{ color: telegramTheme.text_color }} />
                    <span className="font-medium text-sm" style={{ color: telegramTheme.text_color }}>
                      Offers Redeemed
                    </span>
                    <span className="text-lg font-bold" style={{ color: telegramTheme.text_color }}>
                      {userStats.offersRedeemed}
                    </span>
                  </div>

                  <div
                    className="flex flex-col items-center p-3 border rounded-lg"
                    style={{ borderColor: telegramTheme.hint_color + "20" }}
                  >
                    <Trophy className="h-6 w-6 mb-1" style={{ color: telegramTheme.text_color }} />
                    <span className="font-medium text-sm" style={{ color: telegramTheme.text_color }}>
                      Leaderboard
                    </span>
                    <span className="text-lg font-bold" style={{ color: telegramTheme.text_color }}>
                      #{userStats.leaderboardRank}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <div>
              <h2 className="text-lg font-medium mb-3" style={{ color: telegramTheme.text_color }}>
                Account Settings
              </h2>
              <div
                className="bg-white rounded-xl shadow-sm p-4 space-y-4"
                style={{
                  backgroundColor: telegramTheme.bg_color,
                  boxShadow: "0 1px 3px " + telegramTheme.hint_color + "20",
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="bg-blue-100 p-2 rounded-lg mr-3">
                      <Settings className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium" style={{ color: telegramTheme.text_color }}>
                        Account Settings
                      </h3>
                      <p className="text-sm text-gray-500" style={{ color: telegramTheme.hint_color }}>
                        Privacy, notifications, preferences
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5" style={{ color: telegramTheme.hint_color }} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="bg-green-100 p-2 rounded-lg mr-3">
                      <Badge className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-medium" style={{ color: telegramTheme.text_color }}>
                        Badges & Achievements
                      </h3>
                      <p className="text-sm text-gray-500" style={{ color: telegramTheme.hint_color }}>
                        View all your earned rewards
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5" style={{ color: telegramTheme.hint_color }} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="bg-amber-100 p-2 rounded-lg mr-3">
                      <Bell className="h-5 w-5 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="font-medium" style={{ color: telegramTheme.text_color }}>
                        Notifications
                      </h3>
                      <p className="text-sm text-gray-500" style={{ color: telegramTheme.hint_color }}>
                        Manage alerts and reminders
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5" style={{ color: telegramTheme.hint_color }} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="bg-purple-100 p-2 rounded-lg mr-3">
                      <Wallet className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-medium" style={{ color: telegramTheme.text_color }}>
                        Wallet Settings
                      </h3>
                      <p className="text-sm text-gray-500" style={{ color: telegramTheme.hint_color }}>
                        Manage your $NALI tokens
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5" style={{ color: telegramTheme.hint_color }} />
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-medium mb-3" style={{ color: telegramTheme.text_color }}>
                App Preferences
              </h2>
              <div
                className="bg-white rounded-xl shadow-sm p-4 space-y-4"
                style={{
                  backgroundColor: telegramTheme.bg_color,
                  boxShadow: "0 1px 3px " + telegramTheme.hint_color + "20",
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="bg-blue-100 p-2 rounded-lg mr-3">
                      <MapPin className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium" style={{ color: telegramTheme.text_color }}>
                        Location Settings
                      </h3>
                      <p className="text-sm text-gray-500" style={{ color: telegramTheme.hint_color }}>
                        Manage location permissions
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5" style={{ color: telegramTheme.hint_color }} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="bg-green-100 p-2 rounded-lg mr-3">
                      <Activity className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-medium" style={{ color: telegramTheme.text_color }}>
                        Activity Tracking
                      </h3>
                      <p className="text-sm text-gray-500" style={{ color: telegramTheme.hint_color }}>
                        Manage what data is collected
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5" style={{ color: telegramTheme.hint_color }} />
                </div>

                <Button className="w-full mt-4" variant="outline">
                  Log Out
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  )
}
