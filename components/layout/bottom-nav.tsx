"use client"

import { Home, MessageSquare, Map, Award, Wallet } from "lucide-react"
import { usePathname } from "next/navigation"
import Link from "next/link"

interface BottomNavProps {
  theme: {
    bg_color: string
    text_color: string
    hint_color: string
    button_color: string
    button_text_color: string
  }
}

export default function BottomNav({ theme }: BottomNavProps) {
  const pathname = usePathname()

  const navItems = [
    { href: "/home", icon: Home, label: "Home" },
    { href: "/local-hub", icon: Map, label: "Local Hub" },
    { href: "/community", icon: MessageSquare, label: "Community" },
    { href: "/rewards", icon: Award, label: "Rewards" },
    { href: "/wallet", icon: Wallet, label: "Wallet" },
  ]

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 bg-white border-t z-50"
      style={{
        backgroundColor: theme.bg_color,
        borderColor: theme.hint_color + "20",
      }}
    >
      <div className="max-w-md mx-auto flex justify-around items-center h-16">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center justify-center text-xs ${
              pathname === item.href ? "text-[#FF0099]" : "text-gray-500"
            }`}
            style={{ color: pathname === item.href ? "#FF0099" : theme.hint_color }}
          >
            <item.icon className="h-5 w-5 mb-1" />
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  )
}
