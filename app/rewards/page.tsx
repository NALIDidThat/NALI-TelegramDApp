"use client"

import { useState, useEffect } from "react"
import AppLayout from "@/components/layout/app-layout"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Award,
  Gift,
  Star,
  ChevronRight,
  Zap,
  Sparkles,
  Lock,
  CheckCircle2,
  Coins,
  Shield,
  BookOpen,
  Heart,
  Users,
  Coffee,
  Loader2,
  Share2,
} from "lucide-react"
import { motion } from "framer-motion"
import QRCode from "react-qr-code"

export default function RewardsPage() {
  const [telegramTheme, setTelegramTheme] = useState({
    bg_color: "#ffffff",
    text_color: "#000000",
    hint_color: "#999999",
    button_color: "#FF0099",
    button_text_color: "#ffffff",
  })

  // Add these state variables after the other useState declarations
  const [selectedReward, setSelectedReward] = useState<number | null>(null)
  const [redeemingReward, setRedeemingReward] = useState(false)
  const [redeemedRewardId, setRedeemedRewardId] = useState<number | null>(null)
  const [selectedRedeemedReward, setSelectedRedeemedReward] = useState<number | null>(null)
  const [selectedBadge, setSelectedBadge] = useState<number | null>(null)

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

  // First, update the availableRewards array to include type information
  const availableRewards = [
    {
      id: 1,
      title: "10% Off Local Cafe",
      description: "Valid until June 30, 2024",
      cost: 500,
      icon: <Gift className="h-5 w-5 text-blue-600" />,
      color: "bg-blue-100",
      type: "discount",
    },
    {
      id: 2,
      title: "Digital Skills Certificate",
      description: "Shareable achievement",
      cost: 750,
      icon: <Award className="h-5 w-5 text-green-600" />,
      color: "bg-green-100",
      type: "certificate",
    },
    {
      id: 3,
      title: "Premium Workshop Access",
      description: "Exclusive learning opportunity",
      cost: 1000,
      icon: <Star className="h-5 w-5 text-amber-600" />,
      color: "bg-amber-100",
      type: "access",
    },
    {
      id: 4,
      title: "15% Off Digital Tools",
      description: "For online productivity tools",
      cost: 600,
      icon: <Gift className="h-5 w-5 text-indigo-600" />,
      color: "bg-indigo-100",
      type: "discount",
    },
    {
      id: 5,
      title: "Financial Literacy Certificate",
      description: "Proof of financial knowledge",
      cost: 800,
      icon: <Award className="h-5 w-5 text-emerald-600" />,
      color: "bg-emerald-100",
      type: "certificate",
    },
    {
      id: 6,
      title: "Community Event Access",
      description: "VIP access to local events",
      cost: 900,
      icon: <Star className="h-5 w-5 text-orange-600" />,
      color: "bg-orange-100",
      type: "access",
    },
  ]

  // Add a function to group rewards by type
  const groupRewardsByType = (rewards) => {
    const grouped = {}
    rewards.forEach((reward) => {
      if (!grouped[reward.type]) {
        grouped[reward.type] = []
      }
      grouped[reward.type].push(reward)
    })
    return grouped
  }

  // Update the redeemedRewards data to include type information
  const redeemedRewards = [
    {
      id: 1,
      title: "Community Contributor Badge",
      description: "For outstanding community service",
      redemptionDate: "May 15, 2024",
      redemptionTime: "2:30 PM",
      location: "Chingford Community Center",
      wallet: "Main Wallet (0x1234...5678)",
      cost: 500,
      icon: <Award className="h-5 w-5 text-purple-600" />,
      color: "bg-purple-100",
      type: "certificate",
      detailedDescription:
        "This badge recognizes your outstanding contributions to the local community through volunteer work and participation in community events.",
    },
    {
      id: 2,
      title: "10% Off Local Cafe",
      description: "Discount at Community Brew",
      redemptionDate: "May 10, 2024",
      redemptionTime: "11:15 AM",
      location: "Community Brew Cafe",
      wallet: "Main Wallet (0x1234...5678)",
      cost: 350,
      icon: <Coffee className="h-5 w-5 text-blue-600" />,
      color: "bg-blue-100",
      type: "discount",
      detailedDescription:
        "This discount can be used at Community Brew Cafe for 10% off your entire purchase. Valid until June 30, 2024.",
    },
    {
      id: 3,
      title: "Digital Workshop Access",
      description: "Online learning session",
      redemptionDate: "April 28, 2024",
      redemptionTime: "9:00 AM",
      location: "Virtual Event",
      wallet: "Main Wallet (0x1234...5678)",
      cost: 450,
      icon: <BookOpen className="h-5 w-5 text-green-600" />,
      color: "bg-green-100",
      type: "access",
      detailedDescription:
        "This provides access to the advanced digital skills workshop held online. Access code has been sent to your registered email.",
    },
  ]

  // Mock data for achievements
  const achievements = [
    {
      id: 1,
      title: "Digital Explorer",
      description: "Complete 3 digital skills workshops",
      progress: 60,
      total: 5,
      completed: 3,
      icon: <BookOpen className="h-5 w-5 text-blue-600" />,
      color: "bg-blue-100",
    },
    {
      id: 2,
      title: "Community Champion",
      description: "Participate in 4 community events",
      progress: 50,
      total: 4,
      completed: 2,
      icon: <Users className="h-5 w-5 text-green-600" />,
      color: "bg-green-100",
    },
    {
      id: 3,
      title: "Financial Wizard",
      description: "Complete the financial literacy course",
      progress: 16,
      total: 6,
      completed: 1,
      icon: <Coins className="h-5 w-5 text-amber-600" />,
      color: "bg-amber-100",
    },
  ]

  // Mock data for badges
  const badges = [
    {
      id: 1,
      title: "First-Time Volunteer",
      description: "Completed your first volunteer activity",
      earned: true,
      date: "May 15, 2024",
      icon: <Heart className="h-6 w-6 text-pink-600" />,
      color: "bg-pink-100",
    },
    {
      id: 2,
      title: "Digital Skills Level 1",
      description: "Completed basic digital skills training",
      earned: true,
      date: "April 28, 2024",
      icon: <BookOpen className="h-6 w-6 text-blue-600" />,
      color: "bg-blue-100",
    },
    {
      id: 3,
      title: "Community Leader",
      description: "Led a community initiative",
      earned: false,
      progress: 50,
      icon: <Users className="h-6 w-6 text-green-600" />,
      color: "bg-green-100",
    },
    {
      id: 4,
      title: "Financial Expert",
      description: "Mastered financial literacy concepts",
      earned: false,
      progress: 25,
      icon: <Coins className="h-6 w-6 text-amber-600" />,
      color: "bg-amber-100",
    },
  ]

  // Mock data for NFTs
  const nfts = [
    {
      id: 1,
      title: "Community Contributor",
      description: "For outstanding community service",
      image: "/placeholder.svg?height=100&width=100",
      earned: true,
      date: "May 10, 2024",
    },
    {
      id: 2,
      title: "Digital Skills Master",
      description: "For completing all digital skills courses",
      image: "/placeholder.svg?height=100&width=100",
      earned: false,
      progress: 65,
    },
  ]

  return (
    <AppLayout>
      <div className="max-w-md mx-auto pb-20">
        {/* Header */}
        <div className="bg-[#FF0099] text-white p-4 rounded-b-3xl shadow-md">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Rewards</h1>
              <p className="text-sm opacity-90">Redeem your XP for rewards</p>
            </div>
            <div className="bg-white/20 px-3 py-1.5 rounded-full flex items-center">
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
          {/* Wallet */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Coins className="h-5 w-5 text-[#FF0099]" />
                Your Wallet
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <div>
                  <div className="text-3xl font-bold">250</div>
                  <div className="text-sm text-muted-foreground">$NALI Tokens</div>
                </div>
                <Button>Redeem Tokens</Button>
              </div>
              <div className="text-sm text-muted-foreground">
                Earn $NALI tokens by completing experiences and reaching XP milestones.
              </div>
            </CardContent>
          </Card>

          {/* Tabs */}
          <Tabs defaultValue="rewards">
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="rewards">Rewards</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
              <TabsTrigger value="badges">Badges</TabsTrigger>
              <TabsTrigger value="nfts">NFTs</TabsTrigger>
            </TabsList>

            {/* Rewards Tab */}
            <TabsContent value="rewards" className="space-y-4">
              {/* Section Headers with Pills */}
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-medium" style={{ color: telegramTheme.text_color }}>
                  Available Rewards
                </h2>
                <div className="flex gap-1">
                  <Badge variant="outline" className="bg-white">
                    All
                  </Badge>
                  <Badge variant="outline" className="bg-white text-muted-foreground">
                    New
                  </Badge>
                  <Badge variant="outline" className="bg-white text-muted-foreground">
                    Popular
                  </Badge>
                </div>
              </div>

              {/* Available Rewards - Horizontal Scrolling Cards */}
              <div className="overflow-x-auto pb-2 -mx-4 px-4">
                <div className="flex gap-3" style={{ minWidth: "max-content" }}>
                  {availableRewards.map((reward) => (
                    <motion.div
                      key={reward.id}
                      whileTap={{ scale: 0.98 }}
                      className="rounded-xl overflow-hidden cursor-pointer w-60"
                      style={{
                        backgroundColor: telegramTheme.bg_color,
                        boxShadow: "0 1px 3px " + telegramTheme.hint_color + "20",
                      }}
                      onClick={() => setSelectedReward(selectedReward === reward.id ? null : reward.id)}
                    >
                      <div className="p-4">
                        <div className="flex items-center mb-3">
                          <div className={`${reward.color} p-2 rounded-lg mr-3`}>{reward.icon}</div>
                          <Badge className="bg-[#FF0099]">{reward.cost} XP</Badge>
                        </div>
                        <h3 className="font-medium mb-1" style={{ color: telegramTheme.text_color }}>
                          {reward.title}
                        </h3>
                        <p className="text-sm" style={{ color: telegramTheme.hint_color }}>
                          {reward.description}
                        </p>

                        {selectedReward === reward.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-4 pt-4 border-t"
                            style={{ borderColor: telegramTheme.hint_color + "20" }}
                          >
                            {redeemedRewardId === reward.id ? (
                              <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex flex-col items-center justify-center py-2"
                              >
                                <div className="bg-white p-3 rounded-lg mb-3">
                                  <QRCode value={`nali-reward-${reward.id}-${Date.now()}`} size={180} level="H" />
                                </div>
                                <p className="text-sm text-center mb-3" style={{ color: telegramTheme.text_color }}>
                                  Show this QR code to redeem your reward
                                </p>
                                <Button
                                  variant="outline"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    setRedeemedRewardId(null)
                                  }}
                                >
                                  Close
                                </Button>
                              </motion.div>
                            ) : (
                              <>
                                <p className="text-sm mb-4" style={{ color: telegramTheme.text_color }}>
                                  {reward.id === 1 &&
                                    "Get 10% off your next purchase at the local cafe. Show this reward at checkout to redeem."}
                                  {reward.id === 2 &&
                                    "This certificate validates your digital skills proficiency and can be shared on your professional profiles."}
                                  {reward.id === 3 &&
                                    "Gain exclusive access to premium workshops normally reserved for paying members."}
                                  {reward.id === 4 &&
                                    "Receive 15% off subscription to popular digital productivity tools and services."}
                                  {reward.id === 5 &&
                                    "This certificate validates your financial literacy knowledge and can be shared with employers."}
                                  {reward.id === 6 &&
                                    "Get VIP access to upcoming community events and networking opportunities."}
                                </p>
                                <Button
                                  className="w-full"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    setRedeemingReward(true)
                                    // Simulate redeeming process
                                    setTimeout(() => {
                                      setRedeemingReward(false)
                                      setRedeemedRewardId(reward.id)
                                      // Add haptic feedback if available
                                      if (window.Telegram?.WebApp?.HapticFeedback) {
                                        window.Telegram.WebApp.HapticFeedback.notificationOccurred("success")
                                      }
                                    }, 1500)
                                  }}
                                  disabled={redeemingReward}
                                >
                                  {redeemingReward ? (
                                    <>
                                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                      Generating QR...
                                    </>
                                  ) : (
                                    "Redeem Reward"
                                  )}
                                </Button>
                              </>
                            )}
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* In-Progress Rewards Section */}
              <div className="mt-6">
                <h2 className="text-lg font-medium mb-3" style={{ color: telegramTheme.text_color }}>
                  In-Progress
                </h2>
                <div className="space-y-3">
                  {/* In-Progress Reward 1 */}
                  <div
                    className="rounded-xl overflow-hidden"
                    style={{
                      backgroundColor: telegramTheme.bg_color,
                      boxShadow: "0 1px 3px " + telegramTheme.hint_color + "20",
                    }}
                  >
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <div className="bg-purple-100 p-2 rounded-lg mr-3">
                            <Award className="h-5 w-5 text-purple-600" />
                          </div>
                          <div>
                            <h3 className="font-medium" style={{ color: telegramTheme.text_color }}>
                              Digital Creator Certificate
                            </h3>
                            <p className="text-xs" style={{ color: telegramTheme.hint_color }}>
                              Complete 3 more creative tasks
                            </p>
                          </div>
                        </div>
                        <Badge variant="outline" className="bg-white">
                          4/7 Tasks
                        </Badge>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span style={{ color: telegramTheme.hint_color }}>Progress</span>
                          <span className="font-medium">57%</span>
                        </div>
                        <Progress value={57} className="h-2" />
                      </div>
                    </div>
                  </div>

                  {/* In-Progress Reward 2 */}
                  <div
                    className="rounded-xl overflow-hidden"
                    style={{
                      backgroundColor: telegramTheme.bg_color,
                      boxShadow: "0 1px 3px " + telegramTheme.hint_color + "20",
                    }}
                  >
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <div className="bg-blue-100 p-2 rounded-lg mr-3">
                            <Gift className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-medium" style={{ color: telegramTheme.text_color }}>
                              Free Workshop Pass
                            </h3>
                            <p className="text-xs" style={{ color: telegramTheme.hint_color }}>
                              Attend 1 more community event
                            </p>
                          </div>
                        </div>
                        <Badge variant="outline" className="bg-white">
                          2/3 Events
                        </Badge>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span style={{ color: telegramTheme.hint_color }}>Progress</span>
                          <span className="font-medium">67%</span>
                        </div>
                        <Progress value={67} className="h-2" />
                      </div>
                    </div>
                  </div>

                  {/* In-Progress Reward 3 */}
                  <div
                    className="rounded-xl overflow-hidden"
                    style={{
                      backgroundColor: telegramTheme.bg_color,
                      boxShadow: "0 1px 3px " + telegramTheme.hint_color + "20",
                    }}
                  >
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <div className="bg-green-100 p-2 rounded-lg mr-3">
                            <Star className="h-5 w-5 text-green-600" />
                          </div>
                          <div>
                            <h3 className="font-medium" style={{ color: telegramTheme.text_color }}>
                              Mentorship Session
                            </h3>
                            <p className="text-xs" style={{ color: telegramTheme.hint_color }}>
                              Complete 2 more learning quests
                            </p>
                          </div>
                        </div>
                        <Badge variant="outline" className="bg-white">
                          3/5 Quests
                        </Badge>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span style={{ color: telegramTheme.hint_color }}>Progress</span>
                          <span className="font-medium">60%</span>
                        </div>
                        <Progress value={60} className="h-2" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Redeemed Rewards Section */}
              <div className="mt-6">
                <h2 className="text-lg font-medium mb-3" style={{ color: telegramTheme.text_color }}>
                  Redeemed Rewards
                </h2>
                <div className="space-y-3">
                  {redeemedRewards.map((reward) => (
                    <motion.div
                      key={reward.id}
                      className="rounded-xl overflow-hidden cursor-pointer"
                      style={{
                        backgroundColor: telegramTheme.bg_color,
                        boxShadow: "0 1px 3px " + telegramTheme.hint_color + "20",
                      }}
                      onClick={() => setSelectedRedeemedReward(selectedRedeemedReward === reward.id ? null : reward.id)}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className={`${reward.color} p-2 rounded-lg mr-3`}>{reward.icon}</div>
                            <div>
                              <h3 className="font-medium" style={{ color: telegramTheme.text_color }}>
                                {reward.title}
                              </h3>
                              <p className="text-sm" style={{ color: telegramTheme.hint_color }}>
                                Redeemed on {reward.redemptionDate}
                              </p>
                            </div>
                          </div>
                          <ChevronRight
                            className={`h-5 w-5 transition-transform duration-200 ${selectedRedeemedReward === reward.id ? "rotate-90" : ""}`}
                            style={{ color: telegramTheme.hint_color }}
                          />
                        </div>

                        {selectedRedeemedReward === reward.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-4 pt-4 border-t"
                            style={{ borderColor: telegramTheme.hint_color + "20" }}
                          >
                            <div className="space-y-3">
                              <div className="grid grid-cols-2 gap-2 text-sm">
                                <div>
                                  <p className="font-medium" style={{ color: telegramTheme.text_color }}>
                                    Redemption Date
                                  </p>
                                  <p style={{ color: telegramTheme.hint_color }}>
                                    {reward.redemptionDate} at {reward.redemptionTime}
                                  </p>
                                </div>
                                <div>
                                  <p className="font-medium" style={{ color: telegramTheme.text_color }}>
                                    Location
                                  </p>
                                  <p style={{ color: telegramTheme.hint_color }}>{reward.location}</p>
                                </div>
                                <div>
                                  <p className="font-medium" style={{ color: telegramTheme.text_color }}>
                                    Wallet Used
                                  </p>
                                  <p style={{ color: telegramTheme.hint_color }}>{reward.wallet}</p>
                                </div>
                                <div>
                                  <p className="font-medium" style={{ color: telegramTheme.text_color }}>
                                    XP Cost
                                  </p>
                                  <p style={{ color: telegramTheme.hint_color }}>{reward.cost} XP</p>
                                </div>
                              </div>
                              <div>
                                <p className="font-medium text-sm" style={{ color: telegramTheme.text_color }}>
                                  Description
                                </p>
                                <p className="text-sm" style={{ color: telegramTheme.hint_color }}>
                                  {reward.detailedDescription}
                                </p>
                              </div>
                              <div className="flex justify-end">
                                <Button variant="outline" size="sm">
                                  {reward.type === "certificate" && "View Certificate"}
                                  {reward.type === "discount" && "Show QR Code"}
                                  {reward.type === "access" && "Access Details"}
                                </Button>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Achievements Tab */}
            <TabsContent value="achievements" className="space-y-4">
              <h2 className="text-lg font-medium" style={{ color: telegramTheme.text_color }}>
                Your Achievements
              </h2>
              <div className="space-y-3">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className="rounded-xl overflow-hidden"
                    style={{
                      backgroundColor: telegramTheme.bg_color,
                      boxShadow: "0 1px 3px " + telegramTheme.hint_color + "20",
                    }}
                  >
                    <div className="p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`${achievement.color} p-2 rounded-lg`}>{achievement.icon}</div>
                        <div>
                          <h3 className="font-medium" style={{ color: telegramTheme.text_color }}>
                            {achievement.title}
                          </h3>
                          <p className="text-sm" style={{ color: telegramTheme.hint_color }}>
                            {achievement.description}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span style={{ color: telegramTheme.hint_color }}>
                            {achievement.completed}/{achievement.total} completed
                          </span>
                          <span className="font-medium">{achievement.progress}%</span>
                        </div>
                        <Progress value={achievement.progress} className="h-2" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Badges Tab */}
            <TabsContent value="badges" className="space-y-4">
              <h2 className="text-lg font-medium" style={{ color: telegramTheme.text_color }}>
                Your Badges
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {badges.map((badge) => (
                  <motion.div
                    key={badge.id}
                    className={`border rounded-lg p-3 text-center cursor-pointer transition-all ${
                      selectedBadge === badge.id ? "col-span-2 border-[#FF0099]" : ""
                    }`}
                    style={{
                      borderColor: selectedBadge === badge.id ? "#FF0099" : telegramTheme.hint_color + "30",
                    }}
                    onClick={() => setSelectedBadge(selectedBadge === badge.id ? null : badge.id)}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center">
                      <div
                        className={`${badge.color} rounded-full p-3 ${selectedBadge === badge.id ? "mr-4" : "mx-auto"} w-fit mb-2`}
                      >
                        {badge.earned ? (
                          badge.icon
                        ) : (
                          <div className="relative">
                            {badge.icon}
                            <div className="absolute inset-0 bg-gray-400/50 rounded-full flex items-center justify-center">
                              <Lock className="h-3 w-3 text-white" />
                            </div>
                          </div>
                        )}
                      </div>
                      <div className={selectedBadge === badge.id ? "flex-1 text-left" : "w-full"}>
                        <div className="font-medium text-sm" style={{ color: telegramTheme.text_color }}>
                          {badge.title}
                        </div>
                        <div className="text-xs mb-2" style={{ color: telegramTheme.hint_color }}>
                          {badge.description}
                        </div>
                        {badge.earned ? (
                          <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">
                            <CheckCircle2 className="h-3 w-3 mr-1" />
                            Earned {badge.date}
                          </Badge>
                        ) : (
                          <div className="space-y-1">
                            <div className="text-xs" style={{ color: telegramTheme.hint_color }}>
                              {badge.progress}% completed
                            </div>
                            <Progress value={badge.progress} className="h-1.5" />
                          </div>
                        )}
                      </div>
                    </div>

                    {selectedBadge === badge.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="mt-4 pt-4 border-t text-left"
                        style={{ borderColor: telegramTheme.hint_color + "20" }}
                      >
                        <h4 className="font-medium mb-2" style={{ color: telegramTheme.text_color }}>
                          Badge Details
                        </h4>
                        <p className="text-sm mb-3" style={{ color: telegramTheme.hint_color }}>
                          {badge.id === 1 &&
                            "This badge recognizes your first volunteer activity in the community. It's the first step in your journey to becoming a community leader!"}
                          {badge.id === 2 &&
                            "You've completed the basic digital skills training course. This badge certifies your foundational knowledge in essential digital tools and concepts."}
                          {badge.id === 3 &&
                            "This badge is awarded to users who have successfully led a community initiative. Continue participating in leadership roles to earn this badge!"}
                          {badge.id === 4 &&
                            "The Financial Expert badge recognizes mastery of financial literacy concepts. Complete more financial education modules to earn this prestigious badge."}
                        </p>

                        {badge.earned ? (
                          <div className="space-y-3">
                            <div>
                              <h5 className="text-xs font-medium mb-1" style={{ color: telegramTheme.text_color }}>
                                Earned On
                              </h5>
                              <p className="text-sm" style={{ color: telegramTheme.hint_color }}>
                                {badge.date}
                              </p>
                            </div>
                            <div>
                              <h5 className="text-xs font-medium mb-1" style={{ color: telegramTheme.text_color }}>
                                Rewards
                              </h5>
                              <p className="text-sm" style={{ color: telegramTheme.hint_color }}>
                                +50 $NALI tokens
                              </p>
                            </div>
                            <div className="flex justify-end">
                              <Button size="sm" className="mt-2">
                                <Share2 className="h-4 w-4 mr-2" />
                                Share Badge
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            <div>
                              <h5 className="text-xs font-medium mb-1" style={{ color: telegramTheme.text_color }}>
                                How to Earn
                              </h5>
                              <p className="text-sm" style={{ color: telegramTheme.hint_color }}>
                                {badge.id === 3 &&
                                  "Lead a community initiative or host a community event. You've completed 50% of the requirements."}
                                {badge.id === 4 &&
                                  "Complete all modules in the Financial Literacy course. You've completed 25% of the requirements."}
                              </p>
                            </div>
                            <div>
                              <h5 className="text-xs font-medium mb-1" style={{ color: telegramTheme.text_color }}>
                                Rewards
                              </h5>
                              <p className="text-sm" style={{ color: telegramTheme.hint_color }}>
                                +50 $NALI tokens upon completion
                              </p>
                            </div>
                            <div className="flex justify-end">
                              <Button size="sm" variant="outline" className="mt-2">
                                View Requirements
                              </Button>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            {/* NFTs Tab */}
            <TabsContent value="nfts" className="space-y-4">
              <h2 className="text-lg font-medium" style={{ color: telegramTheme.text_color }}>
                Your NFT Certificates
              </h2>
              <div className="space-y-4">
                {nfts.map((nft) => (
                  <Card key={nft.id}>
                    <div className="flex p-4">
                      <div className="mr-4 relative">
                        <img
                          src={nft.image || "/placeholder.svg"}
                          alt={nft.title}
                          className="w-20 h-20 rounded-lg object-cover"
                          style={{
                            opacity: nft.earned ? 1 : 0.5,
                          }}
                        />
                        {nft.earned && (
                          <div className="absolute -top-2 -right-2 bg-[#FF0099] rounded-full p-1">
                            <Sparkles className="h-3 w-3 text-white" />
                          </div>
                        )}
                        {!nft.earned && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Lock className="h-6 w-6 text-white" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium" style={{ color: telegramTheme.text_color }}>
                          {nft.title}
                        </h3>
                        <p className="text-sm mb-2" style={{ color: telegramTheme.hint_color }}>
                          {nft.description}
                        </p>
                        {nft.earned ? (
                          <div className="flex items-center">
                            <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">
                              <Shield className="h-3 w-3 mr-1" />
                              Earned {nft.date}
                            </Badge>
                            <Button variant="ghost" size="sm" className="ml-auto">
                              View
                            </Button>
                          </div>
                        ) : (
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span style={{ color: telegramTheme.hint_color }}>Progress</span>
                              <span className="font-medium">{nft.progress}%</span>
                            </div>
                            <Progress value={nft.progress} className="h-1.5" />
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AppLayout>
  )
}
