"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import AppLayout from "@/components/layout/app-layout"
import {
  Calendar,
  Users,
  FileText,
  MessageSquare,
  Award,
  ShoppingBag,
  Heart,
  BookOpen,
  Share2,
  Clock,
  Trophy,
  Coins,
  MapPin,
  ArrowRight,
  Sparkles,
  Building,
  Coffee,
  Search,
  ChevronDown,
  Filter,
  SlidersHorizontal,
  Tag,
  Zap,
  Utensils,
  GraduationCap,
  Brush,
  Smile,
  HandHeart,
  Star,
  Store,
  ChevronRight,
  Loader2,
  Check,
  Lightbulb,
  Medal,
  Map,
  BarChart,
  Rocket,
  UserPlus,
  Flame,
  Compass,
  Briefcase,
  Laptop,
  HeartHandshake,
  PaintBucket,
  Leaf,
  TrendingUp,
  Target,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"

export default function LocalHubPage() {
  const [activeTab, setActiveTab] = useState("events")
  const [telegramTheme, setTelegramTheme] = useState({
    bg_color: "#ffffff",
    text_color: "#000000",
    hint_color: "#999999",
    button_color: "#FF0099",
    button_text_color: "#ffffff",
  })
  const [expanded, setExpanded] = useState<string | null>(null)
  const [activeCategory, setActiveCategory] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [sortBy, setSortBy] = useState<string>("popular")
  const [isRedeeming, setIsRedeeming] = useState<number | null>(null)
  const [redeemed, setRedeemed] = useState<number[]>([])
  const [activeQuestFilter, setActiveQuestFilter] = useState<string>("all")
  const [expandedQuest, setExpandedQuest] = useState<number | null>(null)

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

  // Mock data for events
  const upcomingEvents = [
    {
      id: 1,
      title: "Community Workshop: Digital Skills",
      date: "March 15, 2025",
      time: "14:00 - 16:00",
      location: "Main Hall",
      attendees: 24,
      category: "Workshop",
      image: "/placeholder.svg?height=100&width=200",
    },
    {
      id: 2,
      title: "Youth Coding Bootcamp",
      date: "March 18, 2025",
      time: "10:00 - 12:00",
      location: "Tech Lab",
      attendees: 15,
      category: "Education",
      image: "/placeholder.svg?height=100&width=200",
    },
    {
      id: 3,
      title: "Financial Literacy Seminar",
      date: "March 20, 2025",
      time: "18:00 - 20:00",
      location: "Conference Room B",
      attendees: 32,
      category: "Seminar",
      image: "/placeholder.svg?height=100&width=200",
    },
  ]

  // Mock data for resources
  const resources = [
    {
      id: 1,
      title: "Study Room A",
      type: "Room",
      availability: "Available",
      capacity: 8,
      amenities: ["Whiteboard", "Projector", "Wi-Fi"],
    },
    {
      id: 2,
      title: "Community Workshop Materials",
      type: "Document",
      author: "Community Team",
      downloads: 156,
      dateAdded: "Feb 28, 2025",
    },
    {
      id: 3,
      title: "Youth Programs Discussion",
      type: "Forum",
      participants: 47,
      posts: 128,
      lastActive: "2 hours ago",
    },
  ]

  // Mock data for learning modules
  const learningModules = [
    {
      id: 1,
      title: "Digital Literacy Fundamentals",
      progress: 75,
      badges: 3,
      totalLessons: 12,
      completedLessons: 9,
    },
    {
      id: 2,
      title: "Financial Planning Basics",
      progress: 40,
      badges: 2,
      totalLessons: 10,
      completedLessons: 4,
    },
    {
      id: 3,
      title: "Community Leadership",
      progress: 20,
      badges: 1,
      totalLessons: 8,
      completedLessons: 2,
    },
  ]

  // Enhanced marketplace items data
  const marketplaceItems = [
    {
      id: 1,
      title: "10% Off at Local Cafe",
      merchant: "Community Brew",
      tokenCost: 50,
      expiryDate: "April 30, 2025",
      image: "/placeholder.svg?height=80&width=80",
      category: "food",
      description: "Enjoy a 10% discount on all food and beverages at our local community cafe.",
      popularity: 95,
      featured: true,
    },
    {
      id: 2,
      title: "Free Resume Review",
      merchant: "Career Services",
      tokenCost: 75,
      expiryDate: "Ongoing",
      image: "/placeholder.svg?height=80&width=80",
      category: "career",
      description: "Get professional feedback on your resume from career experts.",
      popularity: 87,
    },
    {
      id: 3,
      title: "Art Supplies Discount",
      merchant: "Creative Corner",
      tokenCost: 30,
      expiryDate: "March 31, 2025",
      image: "/placeholder.svg?height=80&width=80",
      category: "creative",
      description: "15% off on all art supplies to fuel your creative projects.",
      popularity: 78,
    },
    {
      id: 4,
      title: "Yoga Class Pass",
      merchant: "Wellness Center",
      tokenCost: 60,
      expiryDate: "May 15, 2025",
      image: "/placeholder.svg?height=80&width=80",
      category: "wellness",
      description: "One free class pass for any yoga session at the Wellness Center.",
      popularity: 92,
      featured: true,
    },
    {
      id: 5,
      title: "Volunteer Recognition Badge",
      merchant: "Community Council",
      tokenCost: 100,
      expiryDate: "Ongoing",
      image: "/placeholder.svg?height=80&width=80",
      category: "community",
      description: "Earn a digital badge recognizing your community service contributions.",
      popularity: 65,
    },
    {
      id: 6,
      title: "Coding Workshop Access",
      merchant: "Tech Learning Hub",
      tokenCost: 120,
      expiryDate: "June 10, 2025",
      image: "/placeholder.svg?height=80&width=80",
      category: "education",
      description: "Access to an exclusive coding workshop for beginners and intermediates.",
      popularity: 88,
    },
  ]

  // Featured merchants data
  const featuredMerchants = [
    {
      id: 1,
      name: "Community Brew",
      description: "Local cafe supporting community initiatives",
      icon: <Coffee className="h-6 w-6 text-[#FF0099]" />,
      offerCount: 3,
    },
    {
      id: 2,
      name: "Career Services",
      description: "Professional development resources",
      icon: <GraduationCap className="h-6 w-6 text-[#FF0099]" />,
      offerCount: 2,
    },
    {
      id: 3,
      name: "Wellness Center",
      description: "Mental and physical wellness programs",
      icon: <Smile className="h-6 w-6 text-[#FF0099]" />,
      offerCount: 4,
    },
  ]

  // Category data
  const categories = [
    { id: "all", name: "All", icon: <ShoppingBag className="h-4 w-4" /> },
    { id: "food", name: "Food", icon: <Utensils className="h-4 w-4" /> },
    { id: "education", name: "Education", icon: <BookOpen className="h-4 w-4" /> },
    { id: "career", name: "Career", icon: <GraduationCap className="h-4 w-4" /> },
    { id: "creative", name: "Creative", icon: <Brush className="h-4 w-4" /> },
    { id: "wellness", name: "Wellness", icon: <Smile className="h-4 w-4" /> },
    { id: "community", name: "Community", icon: <HandHeart className="h-4 w-4" /> },
  ]

  // Mock data for volunteer opportunities
  const volunteerOpportunities = [
    {
      id: 1,
      title: "Youth Mentor Program",
      hours: 10,
      tokenReward: 200,
      participants: 8,
      startDate: "April 1, 2025",
    },
    {
      id: 2,
      title: "Community Garden Project",
      hours: 5,
      tokenReward: 100,
      participants: 12,
      startDate: "March 25, 2025",
    },
    {
      id: 3,
      title: "Tech Support for Seniors",
      hours: 3,
      tokenReward: 75,
      participants: 5,
      startDate: "Ongoing",
    },
  ]

  // Mock data for learning quests
  const learningQuests = [
    {
      id: 1,
      title: "Financial Freedom Fundamentals",
      category: "finance",
      progress: 65,
      modules: 8,
      completedModules: 5,
      estimatedTime: "4 hours",
      tokenReward: 120,
      badgeImage: "/placeholder.svg?height=40&width=40",
      featured: true,
      description:
        "Master the basics of personal finance, budgeting, and investment strategies for long-term wealth building.",
      popularity: 92,
      participants: 156,
    },
    {
      id: 2,
      title: "Web3 Development Bootcamp",
      category: "tech",
      progress: 30,
      modules: 12,
      completedModules: 4,
      estimatedTime: "10 hours",
      tokenReward: 200,
      badgeImage: "/placeholder.svg?height=40&width=40",
      featured: true,
      description: "Learn blockchain fundamentals and build your first dApp with smart contracts and web interfaces.",
      popularity: 88,
      participants: 124,
    },
    {
      id: 3,
      title: "Community Leadership",
      category: "social",
      progress: 20,
      modules: 6,
      completedModules: 1,
      estimatedTime: "6 hours",
      tokenReward: 150,
      badgeImage: "/placeholder.svg?height=40&width=40",
      description: "Develop essential leadership skills to drive positive change in your local community.",
      popularity: 75,
      participants: 89,
    },
    {
      id: 4,
      title: "Digital Art Fundamentals",
      category: "creative",
      progress: 0,
      modules: 8,
      completedModules: 0,
      estimatedTime: "8 hours",
      tokenReward: 140,
      badgeImage: "/placeholder.svg?height=40&width=40",
      description: "Explore digital art creation using various tools and techniques to express your creativity.",
      popularity: 82,
      participants: 103,
    },
    {
      id: 5,
      title: "Mindfulness & Wellness",
      category: "wellness",
      progress: 10,
      modules: 5,
      completedModules: 0,
      estimatedTime: "3 hours",
      tokenReward: 90,
      badgeImage: "/placeholder.svg?height=40&width=40",
      description: "Learn practical mindfulness techniques to improve mental health and overall wellbeing.",
      popularity: 79,
      participants: 118,
    },
  ]

  // Mock data for learning categories
  const learningCategories = [
    { id: "all", name: "All", icon: <Compass className="h-4 w-4" /> },
    { id: "finance", name: "Finance", icon: <Coins className="h-4 w-4" /> },
    { id: "tech", name: "Tech", icon: <Laptop className="h-4 w-4" /> },
    { id: "social", name: "Social Impact", icon: <HeartHandshake className="h-4 w-4" /> },
    { id: "creative", name: "Creative", icon: <PaintBucket className="h-4 w-4" /> },
    { id: "wellness", name: "Wellness", icon: <Leaf className="h-4 w-4" /> },
    { id: "career", name: "Career", icon: <Briefcase className="h-4 w-4" /> },
  ]

  // Mock data for learning pods
  const learningPods = [
    {
      id: 1,
      name: "Web3 Explorers",
      members: 8,
      category: "tech",
      activity: "High",
      lastActive: "Today",
      progress: 75,
    },
    {
      id: 2,
      name: "Financial Freedom Seekers",
      members: 12,
      category: "finance",
      activity: "Medium",
      lastActive: "Yesterday",
      progress: 60,
    },
    {
      id: 3,
      name: "Creative Minds",
      members: 6,
      category: "creative",
      activity: "High",
      lastActive: "Today",
      progress: 80,
    },
  ]

  // Mock data for mentors
  const mentors = [
    {
      id: 1,
      name: "Alex Chen",
      expertise: "Web3 Development",
      rating: 4.9,
      students: 24,
      available: true,
    },
    {
      id: 2,
      name: "Maya Johnson",
      expertise: "Financial Planning",
      rating: 4.8,
      students: 18,
      available: true,
    },
    {
      id: 3,
      name: "Jamal Williams",
      expertise: "Community Leadership",
      rating: 4.7,
      students: 15,
      available: false,
    },
  ]

  const toggleExpanded = (id: string) => {
    if (expanded === id) {
      setExpanded(null)
    } else {
      setExpanded(id)
    }
  }

  const toggleExpandedQuest = (id: number) => {
    if (expandedQuest === id) {
      setExpandedQuest(null)
    } else {
      setExpandedQuest(id)
    }
  }

  // Filter marketplace items based on category and search
  const filteredMarketplaceItems = marketplaceItems
    .filter((item) => {
      // Filter by category
      if (activeCategory !== "all" && item.category !== activeCategory) {
        return false
      }

      // Filter by search query
      if (
        searchQuery &&
        !item.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !item.merchant.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false
      }

      return true
    })
    .sort((a, b) => {
      // Sort based on selected option
      if (sortBy === "popular") {
        return b.popularity - a.popularity
      } else if (sortBy === "price-low") {
        return a.tokenCost - b.tokenCost
      } else if (sortBy === "price-high") {
        return b.tokenCost - a.tokenCost
      }
      return 0
    })

  // Handle redeem button click
  const handleRedeem = (id: number) => {
    setIsRedeeming(id)

    // Simulate token burn/transfer process
    setTimeout(() => {
      setIsRedeeming(null)
      setRedeemed([...redeemed, id])

      // Provide haptic feedback if in Telegram
      if (typeof window !== "undefined" && window.Telegram?.WebApp?.HapticFeedback) {
        window.Telegram.WebApp.HapticFeedback.notificationOccurred("success")
      }
    }, 1500)
  }

  return (
    <AppLayout>
      <div className="max-w-md mx-auto pb-20">
        {/* Header */}
        <div className="bg-[#FF0099] text-white p-4 rounded-b-3xl shadow-md">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">My Local Hub</h1>
              <p className="text-sm opacity-90">Connect, learn, and engage with your community</p>
            </div>
            <motion.div
              className="bg-white/20 px-3 py-1.5 rounded-full flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Coins className="h-4 w-4" />
              <span className="font-medium">250 $NALI</span>
            </motion.div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search local hub..."
              className="pl-10 pr-4 py-2 rounded-full border border-gray-200 text-sm"
              style={{
                backgroundColor: telegramTheme.bg_color,
                borderColor: telegramTheme.hint_color + "40",
                color: telegramTheme.text_color,
              }}
            />
          </div>
        </div>

        {/* Quick Access */}
        <div className="px-4 mb-6">
          <div className="grid grid-cols-4 gap-3">
            <motion.div whileTap={{ scale: 0.95 }} className="flex flex-col items-center">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center mb-1"
                style={{ backgroundColor: "#FF0099", color: "white" }}
              >
                <Calendar className="h-6 w-6" />
              </div>
              <span className="text-xs text-center">Events</span>
            </motion.div>

            <motion.div whileTap={{ scale: 0.95 }} className="flex flex-col items-center">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center mb-1"
                style={{ backgroundColor: "#FF0099", color: "white" }}
              >
                <ShoppingBag className="h-6 w-6" />
              </div>
              <span className="text-xs text-center">Marketplace</span>
            </motion.div>

            <motion.div whileTap={{ scale: 0.95 }} className="flex flex-col items-center">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center mb-1"
                style={{ backgroundColor: "#FF0099", color: "white" }}
              >
                <Heart className="h-6 w-6" />
              </div>
              <span className="text-xs text-center">Volunteer</span>
            </motion.div>

            <motion.div whileTap={{ scale: 0.95 }} className="flex flex-col items-center">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center mb-1"
                style={{ backgroundColor: "#FF0099", color: "white" }}
              >
                <Trophy className="h-6 w-6" />
              </div>
              <span className="text-xs text-center">Learning</span>
            </motion.div>
          </div>
        </div>

        <Tabs defaultValue="events" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-5 mb-6 px-4">
            <TabsTrigger value="events" className="text-xs">
              Events
            </TabsTrigger>
            <TabsTrigger value="resources" className="text-xs">
              Resources
            </TabsTrigger>
            <TabsTrigger value="learning" className="text-xs">
              Learning
            </TabsTrigger>
            <TabsTrigger value="marketplace" className="text-xs">
              Market
            </TabsTrigger>
            <TabsTrigger value="volunteer" className="text-xs">
              Volunteer
            </TabsTrigger>
          </TabsList>

          {/* Events Tab */}
          <TabsContent value="events">
            <div className="px-4 space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">Upcoming Events</h2>
                <Button variant="ghost" size="sm" className="text-xs flex items-center gap-1 h-7 px-2 text-[#FF0099]">
                  View All
                  <ArrowRight className="h-3 w-3" />
                </Button>
              </div>

              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <motion.div
                    key={event.id}
                    whileTap={{ scale: 0.98 }}
                    className="rounded-xl overflow-hidden shadow-sm border border-gray-100"
                  >
                    <img
                      src={event.image || "/placeholder.svg"}
                      alt={event.title}
                      className="w-full h-32 object-cover"
                    />
                    <div className="p-3">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium text-base">{event.title}</h3>
                        <Badge className="bg-[#FF0099]">{event.category}</Badge>
                      </div>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          <span>{event.attendees} attending</span>
                        </div>
                      </div>
                      <div className="mt-3 flex justify-between">
                        <Button variant="outline" size="sm" className="text-xs">
                          <Share2 className="h-3 w-3 mr-1" />
                          Share
                        </Button>
                        <Button size="sm" className="text-xs bg-[#FF0099] hover:bg-[#FF0099]/90">
                          RSVP
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div>
                <h2 className="text-lg font-semibold mb-3">Featured Locations</h2>
                <div className="grid grid-cols-2 gap-3">
                  <motion.div
                    whileHover={{ y: -5 }}
                    whileTap={{ scale: 0.98 }}
                    className="rounded-xl overflow-hidden shadow-sm border border-gray-100 p-3"
                  >
                    <div className="bg-[#FF0099]/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-2">
                      <Building className="h-6 w-6 text-[#FF0099]" />
                    </div>
                    <h3 className="font-medium text-sm">Community Center</h3>
                    <p className="text-xs text-gray-500 mt-1">5 upcoming events</p>
                  </motion.div>

                  <motion.div
                    whileHover={{ y: -5 }}
                    whileTap={{ scale: 0.98 }}
                    className="rounded-xl overflow-hidden shadow-sm border border-gray-100 p-3"
                  >
                    <div className="bg-[#FF0099]/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-2">
                      <BookOpen className="h-6 w-6 text-[#FF0099]" />
                    </div>
                    <h3 className="font-medium text-sm">Local Library</h3>
                    <p className="text-xs text-gray-500 mt-1">3 upcoming events</p>
                  </motion.div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Resources Tab */}
          <TabsContent value="resources">
            <div className="px-4 space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">Available Resources</h2>
                <Button variant="ghost" size="sm" className="text-xs flex items-center gap-1 h-7 px-2 text-[#FF0099]">
                  View All
                  <ArrowRight className="h-3 w-3" />
                </Button>
              </div>

              <div className="space-y-3">
                {resources.map((resource) => (
                  <motion.div
                    key={resource.id}
                    whileTap={{ scale: 0.98 }}
                    className="rounded-xl overflow-hidden shadow-sm border border-gray-100 p-4"
                    onClick={() => toggleExpanded(`resource-${resource.id}`)}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="bg-[#FF0099]/10 p-2 rounded-lg">
                          {resource.type === "Room" && <Building className="h-5 w-5 text-[#FF0099]" />}
                          {resource.type === "Document" && <FileText className="h-5 w-5 text-[#FF0099]" />}
                          {resource.type === "Forum" && <MessageSquare className="h-5 w-5 text-[#FF0099]" />}
                        </div>
                        <div>
                          <h3 className="font-medium text-sm">{resource.title}</h3>
                          <p className="text-xs text-gray-500">{resource.type}</p>
                        </div>
                      </div>
                      <ChevronDown
                        className={`h-4 w-4 text-gray-400 transition-transform ${expanded === `resource-${resource.id}` ? "rotate-180" : ""}`}
                      />
                    </div>

                    {expanded === `resource-${resource.id}` && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-3 pt-3 border-t"
                      >
                        {resource.type === "Room" && (
                          <div className="space-y-2">
                            <div className="flex justify-between text-xs">
                              <span>Capacity:</span>
                              <span className="font-medium">{resource.capacity} people</span>
                            </div>
                            <div className="flex justify-between text-xs">
                              <span>Status:</span>
                              <Badge variant="outline" className="text-green-600 bg-green-50">
                                {resource.availability}
                              </Badge>
                            </div>
                            <div className="text-xs mt-1">
                              <span className="font-medium">Amenities:</span>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {resource.amenities?.map((amenity, idx) => (
                                  <Badge key={idx} variant="secondary" className="text-xs">
                                    {amenity}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <Button size="sm" className="w-full mt-2 text-xs bg-[#FF0099] hover:bg-[#FF0099]/90">
                              Book Room
                            </Button>
                          </div>
                        )}

                        {resource.type === "Document" && (
                          <div className="space-y-2">
                            <div className="flex justify-between text-xs">
                              <span>Author:</span>
                              <span className="font-medium">{resource.author}</span>
                            </div>
                            <div className="flex justify-between text-xs">
                              <span>Added:</span>
                              <span>{resource.dateAdded}</span>
                            </div>
                            <div className="flex justify-between text-xs">
                              <span>Downloads:</span>
                              <span>{resource.downloads}</span>
                            </div>
                            <Button size="sm" className="w-full mt-2 text-xs bg-[#FF0099] hover:bg-[#FF0099]/90">
                              Download
                            </Button>
                          </div>
                        )}

                        {resource.type === "Forum" && (
                          <div className="space-y-2">
                            <div className="flex justify-between text-xs">
                              <span>Participants:</span>
                              <span className="font-medium">{resource.participants}</span>
                            </div>
                            <div className="flex justify-between text-xs">
                              <span>Posts:</span>
                              <span>{resource.posts}</span>
                            </div>
                            <div className="flex justify-between text-xs">
                              <span>Last Active:</span>
                              <span>{resource.lastActive}</span>
                            </div>
                            <Button size="sm" className="w-full mt-2 text-xs bg-[#FF0099] hover:bg-[#FF0099]/90">
                              Join Discussion
                            </Button>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Learning Tab */}
          <TabsContent value="learning">
            <div className="px-4 space-y-6">
              {/* Learning Impact Dashboard */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-lg font-semibold">Learning Impact</h2>
                  <Badge className="bg-[#FF0099]/10 text-[#FF0099] font-normal">Level 3 Learner</Badge>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="rounded-xl overflow-hidden shadow-sm border border-gray-100 p-3 text-center">
                    <div className="text-xl font-bold text-[#FF0099]">42</div>
                    <p className="text-xs text-gray-500">Hours Learned</p>
                  </div>
                  <div className="rounded-xl overflow-hidden shadow-sm border border-gray-100 p-3 text-center">
                    <div className="text-xl font-bold text-[#FF0099]">7</div>
                    <p className="text-xs text-gray-500">Quests Completed</p>
                  </div>
                  <div className="rounded-xl overflow-hidden shadow-sm border border-gray-100 p-3 text-center">
                    <div className="text-xl font-bold text-[#FF0099]">5</div>
                    <p className="text-xs text-gray-500">Badges Earned</p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-[#FF0099]/10 to-purple-100/50 rounded-xl p-4 mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-[#FF0099]" />
                      <h3 className="font-medium text-sm">Current Goal</h3>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      65% Complete
                    </Badge>
                  </div>
                  <p className="text-sm mb-2">Complete the Financial Freedom Fundamentals quest</p>
                  <Progress value={65} className="h-2" />
                  <div className="flex justify-between text-xs mt-1">
                    <span>Reward: 120 $NALI</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>3 modules left</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Learning Quest Filters */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold">Learning Quests</h2>
                  <Button variant="ghost" size="sm" className="text-xs flex items-center gap-1 h-7 px-2 text-[#FF0099]">
                    View All
                    <ArrowRight className="h-3 w-3" />
                  </Button>
                </div>

                {/* Categories */}
                <div className="flex overflow-x-auto pb-2 gap-2 scrollbar-hide">
                  {learningCategories.map((category) => (
                    <motion.button
                      key={category.id}
                      whileTap={{ scale: 0.95 }}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full whitespace-nowrap text-xs ${
                        activeQuestFilter === category.id ? "bg-[#FF0099] text-white" : "bg-gray-100 text-gray-700"
                      }`}
                      onClick={() => setActiveQuestFilter(category.id)}
                    >
                      {category.icon}
                      {category.name}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Featured Quests */}
              <div>
                <h3 className="text-sm font-medium flex items-center gap-2 mb-3">
                  <Sparkles className="h-4 w-4 text-[#FF0099]" />
                  Featured Quests
                </h3>

                <div className="space-y-4">
                  {learningQuests
                    .filter((quest) => quest.featured)
                    .map((quest) => (
                      <motion.div
                        key={quest.id}
                        whileTap={{ scale: 0.98 }}
                        className="rounded-xl overflow-hidden shadow-sm border border-gray-100 bg-gradient-to-br from-[#FF0099]/5 to-transparent"
                        onClick={() => toggleExpandedQuest(quest.id)}
                      >
                        <div className="p-4">
                          <div className="flex justify-between items-start">
                            <div className="flex gap-3">
                              <div className="flex-shrink-0 bg-[#FF0099]/10 p-2 rounded-lg">
                                {quest.category === "finance" && <Coins className="h-5 w-5 text-[#FF0099]" />}
                                {quest.category === "tech" && <Laptop className="h-5 w-5 text-[#FF0099]" />}
                                {quest.category === "social" && <HeartHandshake className="h-5 w-5 text-[#FF0099]" />}
                                {quest.category === "creative" && <PaintBucket className="h-5 w-5 text-[#FF0099]" />}
                                {quest.category === "wellness" && <Leaf className="h-5 w-5 text-[#FF0099]" />}
                              </div>
                              <div>
                                <h3 className="font-medium">{quest.title}</h3>
                                <div className="flex items-center gap-2 mt-1">
                                  <Badge className="bg-[#FF0099]">{quest.tokenReward} $NALI</Badge>
                                  <span className="text-xs text-gray-500">{quest.estimatedTime}</span>
                                </div>
                              </div>
                            </div>
                            <ChevronDown
                              className={`h-4 w-4 text-gray-400 transition-transform ${expandedQuest === quest.id ? "rotate-180" : ""}`}
                            />
                          </div>

                          <div className="mt-3">
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-gray-500">
                                {quest.completedModules}/{quest.modules} modules
                              </span>
                              <span className="font-medium">{quest.progress}%</span>
                            </div>
                            <Progress value={quest.progress} className="h-2" />
                          </div>

                          {expandedQuest === quest.id && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="mt-3 pt-3 border-t border-gray-100"
                            >
                              <p className="text-sm text-gray-600 mb-3">{quest.description}</p>
                              <div className="grid grid-cols-2 gap-2 mb-3">
                                <div className="flex items-center gap-1 text-xs text-gray-500">
                                  <Users className="h-3 w-3" />
                                  <span>{quest.participants} participants</span>
                                </div>
                                <div className="flex items-center gap-1 text-xs text-gray-500">
                                  <Flame className="h-3 w-3 text-orange-500" />
                                  <span>{quest.popularity}% positive feedback</span>
                                </div>
                              </div>
                              <Button size="sm" className="w-full text-xs bg-[#FF0099] hover:bg-[#FF0099]/90">
                                {quest.progress > 0 ? "Continue Quest" : "Start Quest"}
                              </Button>
                            </motion.div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                </div>
              </div>

              {/* Learning Pods */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-sm font-medium flex items-center gap-2">
                    <Users className="h-4 w-4 text-[#FF0099]" />
                    Learning Pods
                  </h3>
                  <Button variant="ghost" size="sm" className="text-xs flex items-center gap-1 h-7 px-2 text-[#FF0099]">
                    View All
                    <ArrowRight className="h-3 w-3" />
                  </Button>
                </div>

                <div className="space-y-3">
                  {learningPods.map((pod) => (
                    <motion.div
                      key={pod.id}
                      whileTap={{ scale: 0.98 }}
                      className="rounded-xl overflow-hidden shadow-sm border border-gray-100 p-3"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-medium text-sm">{pod.name}</h3>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-xs text-gray-500">{pod.members} members</span>
                            <Badge
                              variant="outline"
                              className={`text-xs ${
                                pod.activity === "High"
                                  ? "text-green-600 bg-green-50"
                                  : pod.activity === "Medium"
                                    ? "text-amber-600 bg-amber-50"
                                    : "text-gray-600 bg-gray-50"
                              }`}
                            >
                              {pod.activity} Activity
                            </Badge>
                          </div>
                        </div>
                        <Button size="sm" className="text-xs bg-[#FF0099] hover:bg-[#FF0099]/90">
                          Join
                        </Button>
                      </div>
                    </motion.div>
                  ))}

                  <Button variant="outline" size="sm" className="w-full text-xs flex items-center justify-center gap-1">
                    <UserPlus className="h-3 w-3" />
                    Create New Pod
                  </Button>
                </div>
              </div>

              {/* Mentors */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-sm font-medium flex items-center gap-2">
                    <Lightbulb className="h-4 w-4 text-[#FF0099]" />
                    Available Mentors
                  </h3>
                  <Button variant="ghost" size="sm" className="text-xs flex items-center gap-1 h-7 px-2 text-[#FF0099]">
                    View All
                    <ArrowRight className="h-3 w-3" />
                  </Button>
                </div>

                <div className="space-y-3">
                  {mentors
                    .filter((mentor) => mentor.available)
                    .map((mentor) => (
                      <motion.div
                        key={mentor.id}
                        whileTap={{ scale: 0.98 }}
                        className="rounded-xl overflow-hidden shadow-sm border border-gray-100 p-3"
                      >
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-[#FF0099]/10 flex items-center justify-center">
                              <Users className="h-5 w-5 text-[#FF0099]" />
                            </div>
                            <div>
                              <h3 className="font-medium text-sm">{mentor.name}</h3>
                              <div className="flex items-center gap-1 mt-0.5">
                                <span className="text-xs text-gray-500">{mentor.expertise}</span>
                                <div className="flex items-center">
                                  <Star className="h-3 w-3 text-amber-500" />
                                  <span className="text-xs ml-0.5">{mentor.rating}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <Button size="sm" className="text-xs bg-[#FF0099] hover:bg-[#FF0099]/90">
                            Connect
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                </div>
              </div>

              {/* Local Events */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-sm font-medium flex items-center gap-2">
                    <Map className="h-4 w-4 text-[#FF0099]" />
                    Local Learning Events
                  </h3>
                  <Button variant="ghost" size="sm" className="text-xs flex items-center gap-1 h-7 px-2 text-[#FF0099]">
                    View Map
                    <ArrowRight className="h-3 w-3" />
                  </Button>
                </div>

                <div className="space-y-3">
                  <motion.div
                    whileTap={{ scale: 0.98 }}
                    className="rounded-xl overflow-hidden shadow-sm border border-gray-100"
                  >
                    <img
                      src="/placeholder.svg?height=100&width=328"
                      alt="Workshop event"
                      className="w-full h-24 object-cover"
                    />
                    <div className="p-3">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium text-sm">Web3 Workshop</h3>
                        <Badge className="bg-[#FF0099]">Tomorrow</Badge>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Community Tech Hub, 2pm - 4pm</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          <span>12 spots left</span>
                        </span>
                        <Badge variant="outline" className="text-xs">
                          Earn 50 $NALI
                        </Badge>
                      </div>
                      <Button size="sm" className="w-full mt-2 text-xs bg-[#FF0099] hover:bg-[#FF0099]/90">
                        RSVP
                      </Button>
                    </div>
                  </motion.div>

                  <motion.div
                    whileTap={{ scale: 0.98 }}
                    className="rounded-xl overflow-hidden shadow-sm border border-gray-100"
                  >
                    <img
                      src="/placeholder.svg?height=100&width=328"
                      alt="Financial workshop event"
                      className="w-full h-24 object-cover"
                    />
                    <div className="p-3">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium text-sm">Financial Literacy Workshop</h3>
                        <Badge className="bg-[#FF0099]">This Week</Badge>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Community Center, Friday 6pm - 8pm</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          <span>8 spots left</span>
                        </span>
                        <Badge variant="outline" className="text-xs">
                          Earn 50 $NALI
                        </Badge>
                      </div>
                      <Button size="sm" className="w-full mt-2 text-xs bg-[#FF0099] hover:bg-[#FF0099]/90">
                        RSVP
                      </Button>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Learning Badges */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-sm font-medium flex items-center gap-2">
                    <Medal className="h-4 w-4 text-[#FF0099]" />
                    Your Learning Badges
                  </h3>
                  <Button variant="ghost" size="sm" className="text-xs flex items-center gap-1 h-7 px-2 text-[#FF0099]">
                    View All
                    <ArrowRight className="h-3 w-3" />
                  </Button>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <motion.div
                    whileHover={{ y: -5 }}
                    whileTap={{ scale: 0.98 }}
                    className="rounded-xl overflow-hidden shadow-sm border border-gray-100 p-3 text-center"
                  >
                    <div className="bg-[#FF0099]/10 p-2 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                      <Rocket className="h-5 w-5 text-[#FF0099]" />
                    </div>
                    <h3 className="font-medium text-xs">Fast Learner</h3>
                    <p className="text-xs text-gray-500 mt-1">5 quests completed</p>
                  </motion.div>

                  <motion.div
                    whileHover={{ y: -5 }}
                    whileTap={{ scale: 0.98 }}
                    className="rounded-xl overflow-hidden shadow-sm border border-gray-100 p-3 text-center"
                  >
                    <div className="bg-[#FF0099]/10 p-2 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                      <Coins className="h-5 w-5 text-[#FF0099]" />
                    </div>
                    <h3 className="font-medium text-xs">Finance Pro</h3>
                    <p className="text-xs text-gray-500 mt-1">3 finance quests</p>
                  </motion.div>

                  <motion.div
                    whileHover={{ y: -5 }}
                    whileTap={{ scale: 0.98 }}
                    className="rounded-xl overflow-hidden shadow-sm border border-gray-100 p-3 text-center"
                  >
                    <div className="bg-[#FF0099]/10 p-2 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                      <Users className="h-5 w-5 text-[#FF0099]" />
                    </div>
                    <h3 className="font-medium text-xs">Team Player</h3>
                    <p className="text-xs text-gray-500 mt-1">Joined 2 pods</p>
                  </motion.div>
                </div>
              </div>

              {/* Community Learning Stats */}
              <div className="bg-[#FF0099]/5 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <BarChart className="h-5 w-5 text-[#FF0099]" />
                  <h3 className="font-medium">Community Learning Stats</h3>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Most Popular Quest</span>
                      <span className="font-medium">Financial Freedom</span>
                    </div>
                    <Progress value={85} className="h-2" />
                    <div className="flex justify-between text-xs mt-1">
                      <span className="text-gray-500">85% completion rate</span>
                      <span className="text-gray-500">256 learners</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Local Learning Activity</span>
                      <span className="font-medium">High</span>
                    </div>
                    <Progress value={78} className="h-2" />
                    <div className="flex justify-between text-xs mt-1">
                      <span className="text-gray-500">78% active this week</span>
                      <span className="text-gray-500">42 events</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-2">
                    <div className="flex items-center gap-2">
                      <div className="bg-[#FF0099]/20 p-1.5 rounded-full">
                        <TrendingUp className="h-3.5 w-3.5 text-[#FF0099]" />
                      </div>
                      <div className="text-sm">Your Rank: 24 of 312</div>
                    </div>
                    <Button variant="outline" size="sm" className="text-xs">
                      Leaderboard
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Marketplace Tab */}
          <TabsContent value="marketplace">
            <div className="px-4 space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">Community Marketplace</h2>
                <Badge className="bg-[#FF0099]/10 text-[#FF0099] font-normal">250 $NALI Available</Badge>
              </div>

              {/* Search and Filter Bar */}
              <div className="space-y-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search marketplace..."
                    className="pl-10 pr-4 py-2 rounded-full border border-gray-200 text-sm"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                      backgroundColor: telegramTheme.bg_color,
                      borderColor: telegramTheme.hint_color + "40",
                      color: telegramTheme.text_color,
                    }}
                  />
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-[#FF0099]" />
                    <span className="text-sm font-medium">Filters</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <select
                      className="text-xs border-none bg-transparent focus:outline-none"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      style={{ color: telegramTheme.text_color }}
                    >
                      <option value="popular">Most Popular</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                    </select>
                    <SlidersHorizontal className="h-3 w-3 text-gray-400" />
                  </div>
                </div>

                {/* Categories */}
                <div className="flex overflow-x-auto pb-2 gap-2 scrollbar-hide">
                  {categories.map((category) => (
                    <motion.button
                      key={category.id}
                      whileTap={{ scale: 0.95 }}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full whitespace-nowrap text-xs ${
                        activeCategory === category.id ? "bg-[#FF0099] text-white" : "bg-gray-100 text-gray-700"
                      }`}
                      onClick={() => setActiveCategory(category.id)}
                    >
                      {category.icon}
                      {category.name}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Featured Offers */}
              <div>
                <h3 className="text-sm font-medium flex items-center gap-2 mb-3">
                  <Sparkles className="h-4 w-4 text-[#FF0099]" />
                  Featured Offers
                </h3>

                <div className="space-y-4">
                  {filteredMarketplaceItems
                    .filter((item) => item.featured)
                    .map((item) => (
                      <motion.div
                        key={item.id}
                        whileTap={{ scale: 0.98 }}
                        className="rounded-xl overflow-hidden shadow-sm border border-gray-100 bg-gradient-to-br from-[#FF0099]/5 to-transparent"
                      >
                        <div className="p-4">
                          <div className="flex gap-3">
                            <div className="flex-shrink-0">
                              <img
                                src={item.image || "/placeholder.svg"}
                                alt={item.title}
                                className="w-16 h-16 rounded-lg object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between">
                                <h3 className="font-medium">{item.title}</h3>
                                <Badge className="bg-[#FF0099]">{item.tokenCost} $NALI</Badge>
                              </div>
                              <p className="text-xs text-gray-500 mb-1">{item.merchant}</p>
                              <p className="text-xs text-gray-600">{item.description}</p>
                              <div className="flex justify-between items-center mt-2">
                                <span className="text-xs text-gray-500">
                                  {item.expiryDate === "Ongoing" ? "Never expires" : `Expires: ${item.expiryDate}`}
                                </span>
                                <div className="flex items-center gap-1">
                                  <Star className="h-3 w-3 text-amber-500" />
                                  <span className="text-xs">{item.popularity}% positive</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <Button
                            size="sm"
                            className="w-full mt-3 text-xs bg-[#FF0099] hover:bg-[#FF0099]/90"
                            onClick={() => handleRedeem(item.id)}
                            disabled={isRedeeming === item.id || redeemed.includes(item.id)}
                          >
                            {isRedeeming === item.id ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Processing...
                              </>
                            ) : redeemed.includes(item.id) ? (
                              <>
                                <Check className="mr-2 h-4 w-4" />
                                Redeemed
                              </>
                            ) : (
                              "Redeem Offer"
                            )}
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                </div>
              </div>

              {/* All Marketplace Offers */}
              <div>
                <h3 className="text-sm font-medium flex items-center gap-2 mb-3">
                  <Tag className="h-4 w-4 text-[#FF0099]" />
                  All Offers
                </h3>

                <div className="space-y-4">
                  {filteredMarketplaceItems
                    .filter((item) => !item.featured)
                    .map((item) => (
                      <motion.div
                        key={item.id}
                        whileTap={{ scale: 0.98 }}
                        className="rounded-xl overflow-hidden shadow-sm border border-gray-100"
                      >
                        <div className="p-4">
                          <div className="flex gap-3">
                            <div className="flex-shrink-0">
                              <img
                                src={item.image || "/placeholder.svg"}
                                alt={item.title}
                                className="w-16 h-16 rounded-lg object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between">
                                <h3 className="font-medium">{item.title}</h3>
                                <Badge className="bg-[#FF0099]">{item.tokenCost} $NALI</Badge>
                              </div>
                              <p className="text-xs text-gray-500 mb-1">{item.merchant}</p>
                              <p className="text-xs text-gray-600">{item.description}</p>
                              <div className="flex justify-between items-center mt-2">
                                <span className="text-xs text-gray-500">
                                  {item.expiryDate === "Ongoing" ? "Never expires" : `Expires: ${item.expiryDate}`}
                                </span>
                                <div className="flex items-center gap-1">
                                  <Star className="h-3 w-3 text-amber-500" />
                                  <span className="text-xs">{item.popularity}% positive</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <Button
                            size="sm"
                            className="w-full mt-3 text-xs bg-[#FF0099] hover:bg-[#FF0099]/90"
                            onClick={() => handleRedeem(item.id)}
                            disabled={isRedeeming === item.id || redeemed.includes(item.id)}
                          >
                            {isRedeeming === item.id ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Processing...
                              </>
                            ) : redeemed.includes(item.id) ? (
                              <>
                                <Check className="mr-2 h-4 w-4" />
                                Redeemed
                              </>
                            ) : (
                              "Redeem Offer"
                            )}
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                </div>
              </div>

              {/* Featured Merchants */}
              <div>
                <h3 className="text-sm font-medium flex items-center gap-2 mb-3">
                  <Store className="h-4 w-4 text-[#FF0099]" />
                  Featured Merchants
                </h3>

                <div className="grid grid-cols-3 gap-3">
                  {featuredMerchants.map((merchant) => (
                    <motion.div
                      key={merchant.id}
                      whileHover={{ y: -5 }}
                      whileTap={{ scale: 0.98 }}
                      className="rounded-xl overflow-hidden shadow-sm border border-gray-100 p-3 text-center"
                    >
                      <div className="bg-[#FF0099]/10 p-2 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                        {merchant.icon}
                      </div>
                      <h3 className="font-medium text-xs">{merchant.name}</h3>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-1">{merchant.description}</p>
                      <Badge variant="outline" className="mt-2 text-xs mx-auto">
                        {merchant.offerCount} offers
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Gamification */}
              <div className="bg-[#FF0099]/5 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Award className="h-5 w-5 text-[#FF0099]" />
                  <h3 className="font-medium">Marketplace Achievements</h3>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="bg-[#FF0099]/20 p-1.5 rounded-full">
                        <Zap className="h-3.5 w-3.5 text-[#FF0099]" />
                      </div>
                      <div>
                        <div className="text-sm font-medium">First Redemption</div>
                        <div className="text-xs text-gray-500">Redeem your first marketplace offer</div>
                      </div>
                    </div>
                    <Badge variant="outline" className={redeemed.length > 0 ? "bg-green-100 text-green-700" : ""}>
                      {redeemed.length > 0 ? "Completed" : "0/1"}
                    </Badge>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="bg-[#FF0099]/20 p-1.5 rounded-full">
                        <Sparkles className="h-3.5 w-3.5 text-[#FF0099]" />
                      </div>
                      <div>
                        <div className="text-sm font-medium">Local Supporter</div>
                        <div className="text-xs text-gray-500">Redeem 5 offers from local merchants</div>
                      </div>
                    </div>
                    <Badge variant="outline">{redeemed.length}/5</Badge>
                  </div>
                </div>
              </div>

              {/* My Redeemed Offers */}
              {redeemed.length > 0 && (
                <div>
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-medium flex items-center gap-2">
                      <Check className="h-4 w-4 text-[#FF0099]" />
                      My Redeemed Offers
                    </h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs flex items-center gap-1 h-7 px-2 text-[#FF0099]"
                    >
                      View All
                      <ChevronRight className="h-3 w-3" />
                    </Button>
                  </div>

                  <div className="space-y-3 mt-3">
                    {marketplaceItems
                      .filter((item) => redeemed.includes(item.id))
                      .map((item) => (
                        <motion.div
                          key={item.id}
                          whileTap={{ scale: 0.98 }}
                          className="rounded-xl overflow-hidden shadow-sm border border-gray-100 p-3"
                        >
                          <div className="flex items-center gap-3">
                            <div className="bg-green-100 p-2 rounded-lg">
                              <Check className="h-4 w-4 text-green-600" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-medium text-sm">{item.title}</h3>
                              <p className="text-xs text-gray-500">Redeemed today</p>
                            </div>
                            <ChevronRight className="h-4 w-4 text-gray-400" />
                          </div>
                        </motion.div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Volunteer Tab */}
          <TabsContent value="volunteer">
            <div className="px-4 space-y-6">
              {/* Impact Stats - Moved to top */}
              <div>
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold mb-3">Impact Stats</h2>
                  <Badge className="bg-[#FF0099]/10 text-[#FF0099] font-normal">Community Impact</Badge>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="rounded-xl overflow-hidden shadow-sm border border-gray-100 p-3 text-center">
                    <div className="text-2xl font-bold text-[#FF0099]">156</div>
                    <p className="text-xs text-gray-500">Volunteer Hours</p>
                  </div>
                  <div className="rounded-xl overflow-hidden shadow-sm border border-gray-100 p-3 text-center">
                    <div className="text-2xl font-bold text-[#FF0099]">28</div>
                    <p className="text-xs text-gray-500">Projects</p>
                  </div>
                  <div className="rounded-xl overflow-hidden shadow-sm border border-gray-100 p-3 text-center">
                    <div className="text-2xl font-bold text-[#FF0099]">42</div>
                    <p className="text-xs text-gray-500">Volunteers</p>
                  </div>
                  <div className="rounded-xl overflow-hidden shadow-sm border border-gray-100 p-3 text-center">
                    <div className="text-2xl font-bold text-[#FF0099]">$3.2k</div>
                    <p className="text-xs text-gray-500">Value Generated</p>
                  </div>
                </div>

                <div className="bg-[#FF0099]/5 rounded-xl p-4 mb-2">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium text-sm">Your Contribution</h3>
                    <Badge variant="outline" className="text-xs">
                      Last 30 Days
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-2">
                      <div className="bg-[#FF0099]/10 p-1.5 rounded-full">
                        <Clock className="h-4 w-4 text-[#FF0099]" />
                      </div>
                      <div>
                        <div className="text-sm font-medium">12 Hours</div>
                        <div className="text-xs text-gray-500">Time Donated</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="bg-[#FF0099]/10 p-1.5 rounded-full">
                        <Heart className="h-4 w-4 text-[#FF0099]" />
                      </div>
                      <div>
                        <div className="text-sm font-medium">3 Projects</div>
                        <div className="text-xs text-gray-500">Participated</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">Volunteer Opportunities</h2>
                <Button variant="ghost" size="sm" className="text-xs flex items-center gap-1 h-7 px-2 text-[#FF0099]">
                  View All
                  <ArrowRight className="h-3 w-3" />
                </Button>
              </div>

              <div className="space-y-4">
                {volunteerOpportunities.map((opportunity) => (
                  <motion.div
                    key={opportunity.id}
                    whileTap={{ scale: 0.98 }}
                    className="rounded-xl overflow-hidden shadow-sm border border-gray-100 p-4"
                  >
                    <h3 className="font-medium">{opportunity.title}</h3>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Clock className="h-3 w-3" />
                        <span>{opportunity.hours} hours</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Users className="h-3 w-3" />
                        <span>{opportunity.participants} participants</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Calendar className="h-3 w-3" />
                        <span>Starts: {opportunity.startDate}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Coins className="h-3 w-3" />
                        <span>Reward: {opportunity.tokenReward} $NALI</span>
                      </div>
                    </div>
                    <Button size="sm" className="w-full mt-3 text-xs bg-[#FF0099] hover:bg-[#FF0099]/90">
                      Sign Up
                    </Button>
                  </motion.div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Personalized Suggestions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 p-4 mx-4 border rounded-lg bg-[#FF0099]/5"
        >
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-[#FF0099]" />
            For You
          </h3>

          <div className="grid grid-cols-1 gap-4">
            <div className="p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 mb-2">
                <div className="bg-yellow-100 p-1.5 rounded-full">
                  <Trophy className="h-4 w-4 text-yellow-600" />
                </div>
                <div className="font-medium">Next Achievement</div>
              </div>
              <p className="text-sm text-gray-500">You're just 35% away from earning the "Financial Mastery" NFT!</p>
              <Button variant="link" size="sm" className="mt-1 p-0 h-auto text-[#FF0099]">
                Continue Learning
                <ArrowRight className="h-3 w-3 ml-1" />
              </Button>
            </div>

            <div className="p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 mb-2">
                <div className="bg-green-100 p-1.5 rounded-full">
                  <Calendar className="h-4 w-4 text-green-600" />
                </div>
                <div className="font-medium">Upcoming Event</div>
              </div>
              <p className="text-sm text-gray-500">
                Digital Skills Workshop is happening tomorrow at the Community Center!
              </p>
              <Button variant="link" size="sm" className="mt-1 p-0 h-auto text-[#FF0099]">
                RSVP Now
                <ArrowRight className="h-3 w-3 ml-1" />
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </AppLayout>
  )
}
