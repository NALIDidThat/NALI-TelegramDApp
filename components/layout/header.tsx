"use client"

import { Menu, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"
import Link from "next/link"

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

  return (
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
        >
          <Menu className="h-6 w-6" />
        </Button>

        <div className="flex items-center gap-4">
          <Link
            href="/browser"
            className={`flex items-center gap-2 ${
              pathname === "/browser" ? "text-[#FF0099]" : "text-gray-500"
            }`}
            style={{ color: pathname === "/browser" ? "#FF0099" : theme.hint_color }}
          >
            <Globe className="h-5 w-5" />
            <span className="hidden sm:inline">Browser</span>
          </Link>
        </div>
      </div>
    </header>
  )
} 