"use client"

import { useState, useEffect, useRef } from "react"
import type React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  Settings,
  Bell,
  ChevronLeft,
  Menu,
  X,
  User,
  Home,
  School,
  MessageSquare,
  Map,
  Award,
  Wallet,
  ChevronRight,
  Compass,
  Target,
  GitBranch,
  Calendar,
  Heart,
  BookOpen,
  Users,
  Trophy,
} from "lucide-react"
import BottomNav from "./bottom-nav"
import { Button } from "@/components/ui/button"

interface AppLayoutProps {
  children: React.ReactNode
  hideBackButton?: boolean
}

// Add this function before the AppLayout component
function getPageTitle(pathname: string): string {
  const pathSegment = pathname.split("/")[1]

  switch (pathSegment) {
    case "":
    case "home":
    case "dashboard":
      return "NALI"
    case "profile":
      return "Profile"
    case "school":
      return "My School"
    case "experiences":
      return "Experiences"
    case "maps":
      return "Maps"
    case "community":
      return "Community"
    case "rewards":
      return "Rewards"
    case "wallet":
      return "Wallet"
    case "leaderboard":
      return "Leaderboard"
    case "local-hub":
      return "Local Hub"
    default:
      // Capitalize the first letter of the path segment
      return pathSegment.charAt(0).toUpperCase() + pathSegment.slice(1)
  }
}

export default function AppLayout({ children, hideBackButton = false }: AppLayoutProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [notifications] = useState(3)
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
    }
  }, [])

  const handleBack = () => {
    // If we're not on the home page, go back to home
    if (pathname !== "/home") {
      router.push("/home")

      // Haptic feedback if in Telegram
      if (typeof window !== "undefined" && window.Telegram && window.Telegram.WebApp) {
        window.Telegram.WebApp.HapticFeedback.impactOccurred("light")
      }
    }
  }

  return (
    <div
      className="min-h-screen bg-gray-50"
      style={{ backgroundColor: telegramTheme.bg_color, color: telegramTheme.text_color }}
    >
      {/* Header */}
      <header
        className="bg-white border-b border-gray-200 sticky top-0 z-10"
        style={{
          backgroundColor: telegramTheme.bg_color,
          borderColor: telegramTheme.hint_color + "20",
        }}
      >
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-14">
          <div className="flex items-center">
            {!hideBackButton && pathname !== "/home" && (
              <Button variant="ghost" size="icon" className="mr-2" onClick={handleBack} aria-label="Back to home">
                <ChevronLeft className="h-5 w-5" style={{ color: telegramTheme.text_color }} />
              </Button>
            )}
            <div className="font-bold text-xl mr-2" style={{ color: telegramTheme.text_color }}>
              {getPageTitle(pathname)}
            </div>
            {pathname === "/home" && (
              <div
                className="text-xs px-1.5 py-0.5 bg-gray-100 rounded"
                style={{
                  backgroundColor: telegramTheme.hint_color + "20",
                  color: telegramTheme.hint_color,
                }}
              >
                Beta
              </div>
            )}
          </div>

          <div className="flex items-center space-x-2">
            {/* Notifications Button */}
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={() => {
                // Haptic feedback if in Telegram
                if (typeof window !== "undefined" && window.Telegram && window.Telegram.WebApp) {
                  window.Telegram.WebApp.HapticFeedback.impactOccurred("light")
                }
              }}
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" style={{ color: telegramTheme.text_color }} />
              {notifications > 0 && (
                <span className="absolute top-0 right-0 bg-[#FF0099] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {notifications}
                </span>
              )}
            </Button>

            {/* Mobile Menu Button */}
            <MobileMenu telegramTheme={telegramTheme} pathname={pathname} notifications={notifications} />
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto py-6 px-4 md:px-6 relative pb-20">
        <div
          className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(rgba(4, 173, 191, 0.1) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />
        {children}
      </main>

      {/* Bottom Navigation */}
      <BottomNav theme={telegramTheme} />
    </div>
  )
}

function MobileMenu({ telegramTheme, pathname, notifications }) {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef(null)
  const router = useRouter()

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Provide haptic feedback when toggling menu
  const toggleMenu = () => {
    setIsOpen(!isOpen)

    // Haptic feedback if in Telegram
    if (typeof window !== "undefined" && window.Telegram && window.Telegram.WebApp) {
      window.Telegram.WebApp.HapticFeedback.impactOccurred("medium")
    }
  }

  const handleNavigation = (href) => {
    router.push(href)
    setIsOpen(false)

    // Haptic feedback if in Telegram
    if (typeof window !== "undefined" && window.Telegram && window.Telegram.WebApp) {
      window.Telegram.WebApp.HapticFeedback.impactOccurred("light")
    }
  }

  // Menu items organized by category
  const menuItems = [
    {
      category: "Main",
      items: [
        { icon: Home, label: "Home", href: "/home" },
        { icon: User, label: "Profile", href: "/profile" },
        { icon: School, label: "My School", href: "/school" },
        { icon: Map, label: "Local Hub", href: "/local-hub" },
      ],
    },
    {
      category: "Features",
      items: [
        { icon: MessageSquare, label: "Community", href: "/community", notification: notifications },
        { icon: Award, label: "Rewards", href: "/rewards" },
        { icon: Wallet, label: "Wallet", href: "/wallet" },
        { icon: Trophy, label: "Leaderboard", href: "/leaderboard" },
      ],
    },
    {
      category: "Explore",
      items: [
        { icon: Compass, label: "Explore", href: "/explore" },
        { icon: Target, label: "Goals", href: "/goals" },
        { icon: GitBranch, label: "Journey", href: "/journey" },
        { icon: Calendar, label: "Schedule", href: "/schedule" },
      ],
    },
    {
      category: "More",
      items: [
        { icon: Heart, label: "Volunteer", href: "/volunteer" },
        { icon: BookOpen, label: "Learning", href: "/learning" },
        { icon: Users, label: "Local Hub", href: "/local-hub" },
        { icon: Settings, label: "Settings", href: "/settings" },
      ],
    },
  ]

  return (
    <div className="relative" ref={menuRef}>
      <Button variant="ghost" size="icon" onClick={toggleMenu} aria-label="Menu" aria-expanded={isOpen}>
        {isOpen ? (
          <X className="h-5 w-5" style={{ color: telegramTheme.text_color }} />
        ) : (
          <Menu className="h-5 w-5" style={{ color: telegramTheme.text_color }} />
        )}
      </Button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className="absolute right-0 top-12 w-72 rounded-lg shadow-lg py-2 z-50 border border-gray-100 animate-in fade-in slide-in-from-top-5 duration-200 max-h-[80vh] overflow-y-auto"
          style={{
            backgroundColor: telegramTheme.bg_color,
            borderColor: telegramTheme.hint_color + "20",
          }}
        >
          {/* User Profile */}
          <div className="px-4 py-3 border-b" style={{ borderColor: telegramTheme.hint_color + "10" }}>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                <User className="w-5 h-5" style={{ color: telegramTheme.hint_color }} />
              </div>
              <div>
                <div className="font-medium" style={{ color: telegramTheme.text_color }}>
                  Naaif
                </div>
                <Link
                  href="/profile"
                  className="text-xs flex items-center hover:underline"
                  style={{ color: telegramTheme.hint_color }}
                  onClick={() => {
                    // Haptic feedback if in Telegram
                    if (typeof window !== "undefined" && window.Telegram && window.Telegram.WebApp) {
                      window.Telegram.WebApp.HapticFeedback.impactOccurred("light")
                    }
                    setIsOpen(false)
                  }}
                >
                  View Profile <ChevronRight className="h-3 w-3 ml-1" />
                </Link>
              </div>
            </div>
          </div>

          {/* Navigation Links by Category */}
          {menuItems.map((category, index) => (
            <div
              key={category.category}
              className={index > 0 ? "border-t py-1" : "py-1"}
              style={{ borderColor: telegramTheme.hint_color + "10" }}
            >
              <div className="px-4 py-1 text-xs font-medium" style={{ color: telegramTheme.hint_color }}>
                {category.category}
              </div>
              <div>
                {category.items.map((item) => (
                  <button
                    key={item.href}
                    className={`flex items-center space-x-3 px-4 py-2.5 w-full text-left hover:bg-gray-100 ${pathname === item.href ? "font-medium" : ""}`}
                    style={{
                      color: telegramTheme.text_color,
                      backgroundColor: pathname === item.href ? telegramTheme.hint_color + "10" : "transparent",
                    }}
                    onClick={() => handleNavigation(item.href)}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.label}</span>
                    {item.notification && (
                      <span className="ml-auto bg-[#FF0099] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {item.notification}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// Add TypeScript interface for Telegram WebApp
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
