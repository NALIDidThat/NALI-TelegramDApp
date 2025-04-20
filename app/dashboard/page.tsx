"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Calendar,
  ChevronRight,
  Clock,
  Users,
  MapPin,
  Building,
  Star,
  Compass,
  Filter,
  Search,
  Trophy,
  Zap,
  CheckCircle2,
  LockIcon,
  School,
  LibraryBig,
  Users2,
} from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

// Mock data for experiences
const experiences = [
  {
    id: 1,
    title: "Digital Skills Workshop",
    category: "Education",
    location: "Chingford Library",
    distance: "0.8 miles away",
    description:
      "Learn essential digital skills from local tech experts. Perfect for beginners looking to improve their computer literacy.",
    totalXp: 250,
    duration: "4 weeks",
    milestones: 5,
    rating: 4.8,
    icon: <School className="h-5 w-5" />,
    color: "bg-blue-100 text-blue-600",
    milestoneDetails: [
      {
        title: "Orientation & Basics",
        description: "Introduction to the workshop and basic computer skills",
        xp: 30,
        completed: true,
        date: "Completed on March 5",
      },
      {
        title: "Internet Navigation",
        description: "Learn to effectively search and navigate online resources",
        xp: 50,
        completed: true,
        date: "Completed on March 12",
      },
      {
        title: "Email & Communication",
        description: "Master email and online communication tools",
        xp: 50,
        completed: false,
        date: "Scheduled for March 19",
      },
      {
        title: "Online Safety",
        description: "Understand online security and privacy best practices",
        xp: 70,
        completed: false,
        date: "Scheduled for March 26",
      },
      {
        title: "Final Project",
        description: "Create a digital portfolio showcasing your new skills",
        xp: 100,
        completed: false,
        date: "Scheduled for April 2",
      },
    ],
  },
  {
    id: 2,
    title: "Local Business Internship",
    category: "Business",
    location: "Community Cafe",
    distance: "1.2 miles away",
    description:
      "Gain real-world experience working at a local cafe. Learn customer service, food preparation, and basic business operations.",
    totalXp: 350,
    duration: "6 weeks",
    milestones: 6,
    rating: 4.6,
    icon: <Building className="h-5 w-5" />,
    color: "bg-green-100 text-green-600",
    milestoneDetails: [
      {
        title: "Orientation Day",
        description: "Introduction to the cafe and team members",
        xp: 40,
        completed: false,
        date: "Scheduled for March 20",
      },
      {
        title: "Customer Service Training",
        description: "Learn the basics of excellent customer service",
        xp: 60,
        completed: false,
        date: "Scheduled for March 27",
      },
      {
        title: "Food Preparation",
        description: "Basic food handling and preparation techniques",
        xp: 60,
        completed: false,
        date: "Scheduled for April 3",
      },
      {
        title: "Cash Handling",
        description: "Learn to operate the register and handle transactions",
        xp: 70,
        completed: false,
        date: "Scheduled for April 10",
      },
      {
        title: "Inventory Management",
        description: "Basics of tracking and managing inventory",
        xp: 60,
        completed: false,
        date: "Scheduled for April 17",
      },
      {
        title: "Final Assessment",
        description: "Demonstrate all learned skills in a practical evaluation",
        xp: 100,
        completed: false,
        date: "Scheduled for April 24",
      },
    ],
  },
  {
    id: 3,
    title: "Community Garden Project",
    category: "Community",
    location: "Chingford Community Center",
    distance: "0.5 miles away",
    description:
      "Help transform an unused space into a thriving community garden. Learn gardening skills while contributing to your neighborhood.",
    totalXp: 300,
    duration: "8 weeks",
    milestones: 4,
    rating: 4.9,
    icon: <Users2 className="h-5 w-5" />,
    color: "bg-amber-100 text-amber-600",
    milestoneDetails: [
      {
        title: "Planning & Design",
        description: "Participate in planning the garden layout and selecting plants",
        xp: 50,
        completed: false,
        date: "Scheduled for March 18",
      },
      {
        title: "Ground Preparation",
        description: "Help clear the area and prepare soil for planting",
        xp: 75,
        completed: false,
        date: "Scheduled for April 1",
      },
      {
        title: "Planting Day",
        description: "Plant vegetables, herbs, and flowers in the prepared beds",
        xp: 75,
        completed: false,
        date: "Scheduled for April 15",
      },
      {
        title: "Maintenance & Harvest",
        description: "Learn ongoing garden maintenance and participate in first harvest",
        xp: 100,
        completed: false,
        date: "Scheduled for May 13",
      },
    ],
  },
  {
    id: 4,
    title: "Reading Club Facilitator",
    category: "Education",
    location: "Chingford Library",
    distance: "0.8 miles away",
    description:
      "Lead reading sessions for children aged 7-10. Develop leadership skills while fostering a love of reading in young people.",
    totalXp: 280,
    duration: "10 weeks",
    milestones: 5,
    rating: 4.7,
    icon: <LibraryBig className="h-5 w-5" />,
    color: "bg-purple-100 text-purple-600",
    milestoneDetails: [
      {
        title: "Training Session",
        description: "Learn techniques for engaging young readers",
        xp: 40,
        completed: false,
        date: "Scheduled for March 22",
      },
      {
        title: "First Reading Session",
        description: "Lead your first supervised reading session",
        xp: 50,
        completed: false,
        date: "Scheduled for March 29",
      },
      {
        title: "Activity Development",
        description: "Create reading-related activities for children",
        xp: 60,
        completed: false,
        date: "Scheduled for April 5",
      },
      {
        title: "Independent Sessions",
        description: "Lead reading sessions independently",
        xp: 80,
        completed: false,
        date: "Scheduled for April 12-26",
      },
      {
        title: "Final Showcase",
        description: "Organize a final reading showcase with the children",
        xp: 50,
        completed: false,
        date: "Scheduled for May 3",
      },
    ],
  },
]

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedExperience, setSelectedExperience] = useState<number | null>(null)
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

      // Enable closing confirmation if needed
      // tg.enableClosingConfirmation()
    }
  }, [])

  const handleExperienceClick = (id: number) => {
    setSelectedExperience(selectedExperience === id ? null : id)

    // Haptic feedback if in Telegram
    if (typeof window !== "undefined" && window.Telegram && window.Telegram.WebApp) {
      window.Telegram.WebApp.HapticFeedback.impactOccurred("medium")
    }
  }

  const handleRedeemXP = (experienceId: number, milestoneIndex: number) => {
    // In a real app, this would call an API to redeem the XP
    console.log(`Redeeming XP for experience ${experienceId}, milestone ${milestoneIndex}`)

    // Haptic feedback if in Telegram
    if (typeof window !== "undefined" && window.Telegram && window.Telegram.WebApp) {
      window.Telegram.WebApp.HapticFeedback.notificationOccurred("success")
    }
  }

  return (
    <div
      className="min-h-screen bg-gray-50"
      style={{ backgroundColor: telegramTheme.bg_color, color: telegramTheme.text_color }}
    >
      <div className="max-w-md mx-auto pb-20">
        {/* Header */}
        <div className="bg-[#FF0099] text-white p-4 rounded-b-3xl shadow-md">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">NALI XP</h1>
              <p className="text-sm opacity-90">Welcome back, Alex!</p>
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

        {/* Tabs */}
        <div
          className="border-b border-gray-200 flex overflow-x-auto"
          style={{ borderColor: telegramTheme.hint_color + "40" }}
        >
          <button
            className={`px-4 py-2 text-sm ${activeTab === "overview" ? "border-b-2 border-[#FF0099] font-medium" : "text-gray-600"}`}
            onClick={() => setActiveTab("overview")}
            style={{ color: activeTab === "overview" ? "#FF0099" : telegramTheme.hint_color }}
          >
            Overview
          </button>
          <button
            className={`px-4 py-2 text-sm ${activeTab === "experiences" ? "border-b-2 border-[#FF0099] font-medium" : "text-gray-600"}`}
            onClick={() => setActiveTab("experiences")}
            style={{ color: activeTab === "experiences" ? "#FF0099" : telegramTheme.hint_color }}
          >
            Experiences
          </button>
          <button
            className={`px-4 py-2 text-sm ${activeTab === "journeys" ? "border-b-2 border-[#FF0099] font-medium" : "text-gray-600"}`}
            onClick={() => setActiveTab("journeys")}
            style={{ color: activeTab === "journeys" ? "#FF0099" : telegramTheme.hint_color }}
          >
            Journeys
          </button>
          <button
            className={`px-4 py-2 text-sm ${activeTab === "rewards" ? "border-b-2 border-[#FF0099] font-medium" : "text-gray-600"}`}
            onClick={() => setActiveTab("rewards")}
            style={{ color: activeTab === "rewards" ? "#FF0099" : telegramTheme.hint_color }}
          >
            Rewards
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-medium mb-3" style={{ color: telegramTheme.text_color }}>
                  Daily Challenges
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
                        <Calendar className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium" style={{ color: telegramTheme.text_color }}>
                          Attend Workshop
                        </h3>
                        <p className="text-sm text-gray-500" style={{ color: telegramTheme.hint_color }}>
                          Check in at the Digital Skills workshop
                        </p>
                      </div>
                    </div>
                    <Badge className="bg-[#FF0099]">+50 XP</Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="bg-green-100 p-2 rounded-lg mr-3">
                        <Users className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-medium" style={{ color: telegramTheme.text_color }}>
                          Community Event
                        </h3>
                        <p className="text-sm text-gray-500" style={{ color: telegramTheme.hint_color }}>
                          Participate in the local cleanup
                        </p>
                      </div>
                    </div>
                    <Badge className="bg-[#FF0099]">+75 XP</Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="bg-amber-100 p-2 rounded-lg mr-3">
                        <Trophy className="h-5 w-5 text-amber-600" />
                      </div>
                      <div>
                        <h3 className="font-medium" style={{ color: telegramTheme.text_color }}>
                          Complete Quiz
                        </h3>
                        <p className="text-sm text-gray-500" style={{ color: telegramTheme.hint_color }}>
                          Finish the financial literacy quiz
                        </p>
                      </div>
                    </div>
                    <Badge className="bg-[#FF0099]">+30 XP</Badge>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-medium mb-3" style={{ color: telegramTheme.text_color }}>
                  Your Progress
                </h2>
                <div
                  className="bg-white rounded-xl shadow-sm p-4"
                  style={{
                    backgroundColor: telegramTheme.bg_color,
                    boxShadow: "0 1px 3px " + telegramTheme.hint_color + "20",
                  }}
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium" style={{ color: telegramTheme.text_color }}>
                      Digital Skills Journey
                    </h3>
                    <span className="text-sm text-gray-500" style={{ color: telegramTheme.hint_color }}>
                      3/5 completed
                    </span>
                  </div>
                  <Progress value={60} className="h-2 mb-4" />

                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium" style={{ color: telegramTheme.text_color }}>
                      Financial Literacy
                    </h3>
                    <span className="text-sm text-gray-500" style={{ color: telegramTheme.hint_color }}>
                      2/4 completed
                    </span>
                  </div>
                  <Progress value={50} className="h-2 mb-4" />

                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium" style={{ color: telegramTheme.text_color }}>
                      Community Leadership
                    </h3>
                    <span className="text-sm text-gray-500" style={{ color: telegramTheme.hint_color }}>
                      1/6 completed
                    </span>
                  </div>
                  <Progress value={16} className="h-2" />
                </div>
              </div>

              <div>
                <h2 className="text-lg font-medium mb-3" style={{ color: telegramTheme.text_color }}>
                  Unlocked Features
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  <div
                    className="bg-white rounded-xl shadow-sm p-4 flex flex-col items-center text-center"
                    style={{
                      backgroundColor: telegramTheme.bg_color,
                      boxShadow: "0 1px 3px " + telegramTheme.hint_color + "20",
                    }}
                  >
                    <div className="bg-purple-100 p-3 rounded-full mb-2">
                      <Compass className="h-6 w-6 text-purple-600" />
                    </div>
                    <h3 className="font-medium" style={{ color: telegramTheme.text_color }}>
                      Local Hub
                    </h3>
                    <p className="text-xs text-gray-500 mt-1" style={{ color: telegramTheme.hint_color }}>
                      Explore your community
                    </p>
                  </div>

                  <div
                    className="bg-white rounded-xl shadow-sm p-4 flex flex-col items-center text-center"
                    style={{
                      backgroundColor: telegramTheme.bg_color,
                      boxShadow: "0 1px 3px " + telegramTheme.hint_color + "20",
                    }}
                  >
                    <div className="bg-blue-100 p-3 rounded-full mb-2">
                      <Users className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="font-medium" style={{ color: telegramTheme.text_color }}>
                      Community
                    </h3>
                    <p className="text-xs text-gray-500 mt-1" style={{ color: telegramTheme.hint_color }}>
                      Connect with others
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "experiences" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium" style={{ color: telegramTheme.text_color }}>
                  Local Experiences
                </h2>
                <div className="flex space-x-2">
                  <button
                    className="p-2 rounded-full bg-gray-100"
                    style={{ backgroundColor: telegramTheme.hint_color + "20" }}
                  >
                    <Search className="h-4 w-4" style={{ color: telegramTheme.hint_color }} />
                  </button>
                  <button
                    className="p-2 rounded-full bg-gray-100"
                    style={{ backgroundColor: telegramTheme.hint_color + "20" }}
                  >
                    <Filter className="h-4 w-4" style={{ color: telegramTheme.hint_color }} />
                  </button>
                </div>
              </div>

              <div className="flex overflow-x-auto pb-2 -mx-1 px-1">
                <Badge className="mr-2 bg-[#FF0099] whitespace-nowrap">All</Badge>
                <Badge
                  className="mr-2 bg-transparent text-gray-600 border border-gray-300 whitespace-nowrap"
                  style={{ color: telegramTheme.hint_color, borderColor: telegramTheme.hint_color + "40" }}
                >
                  Business
                </Badge>
                <Badge
                  className="mr-2 bg-transparent text-gray-600 border border-gray-300 whitespace-nowrap"
                  style={{ color: telegramTheme.hint_color, borderColor: telegramTheme.hint_color + "40" }}
                >
                  Education
                </Badge>
                <Badge
                  className="mr-2 bg-transparent text-gray-600 border border-gray-300 whitespace-nowrap"
                  style={{ color: telegramTheme.hint_color, borderColor: telegramTheme.hint_color + "40" }}
                >
                  Community
                </Badge>
                <Badge
                  className="bg-transparent text-gray-600 border border-gray-300 whitespace-nowrap"
                  style={{ color: telegramTheme.hint_color, borderColor: telegramTheme.hint_color + "40" }}
                >
                  Near Me
                </Badge>
              </div>

              <div className="space-y-3">
                {experiences.map((experience) => (
                  <div
                    key={experience.id}
                    className="rounded-xl overflow-hidden"
                    style={{
                      backgroundColor: telegramTheme.bg_color,
                      boxShadow: "0 1px 3px " + telegramTheme.hint_color + "20",
                    }}
                  >
                    <div className="p-4 cursor-pointer" onClick={() => handleExperienceClick(experience.id)}>
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center">
                          <div className={`p-2 rounded-lg mr-3 ${experience.color}`}>{experience.icon}</div>
                          <div>
                            <h3 className="font-medium" style={{ color: telegramTheme.text_color }}>
                              {experience.title}
                            </h3>
                            <Badge
                              className="mt-1 bg-transparent text-xs border"
                              style={{ color: telegramTheme.hint_color, borderColor: telegramTheme.hint_color + "40" }}
                            >
                              {experience.category}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Badge className="bg-[#FF0099]">+{experience.totalXp} XP</Badge>
                        </div>
                      </div>

                      <div
                        className="flex items-center text-xs text-gray-500 mb-2"
                        style={{ color: telegramTheme.hint_color }}
                      >
                        <MapPin className="h-3 w-3 mr-1" />
                        <span>
                          {experience.location} • {experience.distance}
                        </span>
                      </div>

                      <p className="text-sm mb-3 line-clamp-2" style={{ color: telegramTheme.text_color }}>
                        {experience.description}
                      </p>

                      <div
                        className="flex justify-between items-center text-xs text-gray-500"
                        style={{ color: telegramTheme.hint_color }}
                      >
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>
                            {experience.duration} • {experience.milestones} milestones
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Star className="h-3 w-3 text-amber-500 mr-1" />
                          <span>{experience.rating}/5</span>
                        </div>
                      </div>

                      <div className="flex justify-between items-center mt-3">
                        <div className="text-xs font-medium" style={{ color: telegramTheme.text_color }}>
                          {experience.milestoneDetails.filter((m) => m.completed).length}/
                          {experience.milestoneDetails.length} completed
                        </div>
                        <ChevronRight
                          className="h-4 w-4"
                          style={{
                            color: telegramTheme.hint_color,
                            transform: selectedExperience === experience.id ? "rotate(90deg)" : "none",
                            transition: "transform 0.2s",
                          }}
                        />
                      </div>
                    </div>

                    {selectedExperience === experience.id && (
                      <AnimatePresence>
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="border-t px-4 py-3"
                          style={{ borderColor: telegramTheme.hint_color + "20" }}
                        >
                          <div className="mb-4">
                            <h4 className="font-medium mb-1" style={{ color: telegramTheme.text_color }}>
                              About this experience
                            </h4>
                            <p className="text-sm" style={{ color: telegramTheme.text_color }}>
                              {experience.description}
                            </p>
                          </div>

                          <div className="mb-4">
                            <h4 className="font-medium mb-2" style={{ color: telegramTheme.text_color }}>
                              Milestones
                            </h4>
                            <div className="space-y-3">
                              {experience.milestoneDetails.map((milestone, index) => (
                                <div key={index} className="relative">
                                  {index < experience.milestoneDetails.length - 1 && (
                                    <div
                                      className="absolute left-3.5 top-10 bottom-0 w-0.5 bg-gray-200"
                                      style={{ backgroundColor: telegramTheme.hint_color + "30" }}
                                    ></div>
                                  )}
                                  <div className="flex">
                                    <div className="flex-shrink-0 mt-1">
                                      {milestone.completed ? (
                                        <div className="h-7 w-7 rounded-full bg-[#FF0099] flex items-center justify-center">
                                          <CheckCircle2 className="h-4 w-4 text-white" />
                                        </div>
                                      ) : (
                                        <div
                                          className="h-7 w-7 rounded-full border-2 flex items-center justify-center"
                                          style={{ borderColor: telegramTheme.hint_color + "40" }}
                                        >
                                          <LockIcon className="h-3 w-3" style={{ color: telegramTheme.hint_color }} />
                                        </div>
                                      )}
                                    </div>
                                    <div className="ml-3 flex-1">
                                      <div className="flex justify-between">
                                        <h5 className="font-medium" style={{ color: telegramTheme.text_color }}>
                                          {milestone.title}
                                        </h5>
                                        <Badge
                                          className={milestone.completed ? "bg-[#FF0099]" : "bg-gray-200 text-gray-600"}
                                          style={{
                                            backgroundColor: milestone.completed
                                              ? "#FF0099"
                                              : telegramTheme.hint_color + "30",
                                            color: milestone.completed ? "#ffffff" : telegramTheme.hint_color,
                                          }}
                                        >
                                          +{milestone.xp} XP
                                        </Badge>
                                      </div>
                                      <p className="text-xs mt-0.5 mb-1" style={{ color: telegramTheme.text_color }}>
                                        {milestone.description}
                                      </p>
                                      <div className="flex justify-between items-center">
                                        <span className="text-xs" style={{ color: telegramTheme.hint_color }}>
                                          {milestone.date}
                                        </span>
                                        {milestone.completed && (
                                          <button
                                            className="text-xs font-medium text-[#FF0099] px-2 py-1 rounded-full border border-[#FF0099]"
                                            onClick={() => handleRedeemXP(experience.id, index)}
                                          >
                                            Redeem XP
                                          </button>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          <button
                            className="w-full py-2 rounded-full font-medium text-white bg-[#FF0099]"
                            style={{
                              backgroundColor: telegramTheme.button_color,
                              color: telegramTheme.button_text_color,
                            }}
                          >
                            Register for this Experience
                          </button>
                        </motion.div>
                      </AnimatePresence>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "journeys" && (
            <div className="text-center py-8 text-gray-500" style={{ color: telegramTheme.hint_color }}>
              <p>Journeys content will appear here</p>
            </div>
          )}

          {activeTab === "rewards" && (
            <div className="text-center py-8 text-gray-500" style={{ color: telegramTheme.hint_color }}>
              <p>Rewards content will appear here</p>
            </div>
          )}
        </div>
      </div>
    </div>
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
