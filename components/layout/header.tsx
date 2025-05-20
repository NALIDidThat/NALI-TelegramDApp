"use client"

import { Menu, Globe, Book, X, BookOpen, FileText, Video, Newspaper, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { useState } from "react"

interface HeaderProps {
  theme: {
    bg_color: string
    text_color: string
    hint_color: string
    button_color: string
    button_text_color: string
  }
}

export default function Header({ theme }: HeaderProps) {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const menuItems = {
    browser: [
      { href: "/browser", icon: Globe, label: "Web3 Browser" },
      { href: "/browser/history", icon: FileText, label: "History" },
      { href: "/browser/bookmarks", icon: BookOpen, label: "Bookmarks" },
    ],
    resources: [
      { href: "/resources/learn", icon: Book, label: "Learning Hub" },
      { href: "/resources/videos", icon: Video, label: "Video Tutorials" },
      { href: "/resources/news", icon: Newspaper, label: "Web3 News" },
    ],
  }

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 h-16 bg-white border-b z-50"
        style={{
          backgroundColor: theme.bg_color,
          borderColor: theme.hint_color + "20",
        }}
      >
        <div className="max-w-md mx-auto flex justify-between items-center h-full px-4">
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-500"
            style={{ color: theme.hint_color }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>

          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-500"
              style={{ color: theme.hint_color }}
            >
              <Bell className="h-6 w-6" />
              {/* Notification dot */}
              <span className="absolute top-3 right-3 h-2 w-2 bg-[#f20789] rounded-full"></span>
            </Button>
          </div>
        </div>
      </header>

      {/* Slide-out Menu */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
          onClick={() => setIsMenuOpen(false)}
        >
          <div
            className="fixed top-16 left-0 bottom-0 w-64 bg-white z-50"
            style={{ backgroundColor: theme.bg_color }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4">
              {/* Browser Section */}
              <div className="mb-6">
                <h3 
                  className="text-sm font-medium mb-2 px-2"
                  style={{ color: theme.hint_color }}
                >
                  Browser
                </h3>
                {menuItems.browser.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-2 py-2 rounded-lg text-sm ${
                      pathname === item.href
                        ? "bg-[#f20789] text-white"
                        : "hover:bg-white/5"
                    }`}
                    style={{ color: pathname === item.href ? "white" : theme.text_color }}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                ))}
              </div>

              {/* Resources Section */}
              <div>
                <h3 
                  className="text-sm font-medium mb-2 px-2"
                  style={{ color: theme.hint_color }}
                >
                  Resources
                </h3>
                {menuItems.resources.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-2 py-2 rounded-lg text-sm ${
                      pathname === item.href
                        ? "bg-[#f20789] text-white"
                        : "hover:bg-white/5"
                    }`}
                    style={{ color: pathname === item.href ? "white" : theme.text_color }}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
} 