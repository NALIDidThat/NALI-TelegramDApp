"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  HomeIcon,
  BookOpenIcon,
  WalletIcon,
  UserIcon,
  TrophyIcon,
  MapIcon,
  UsersIcon,
} from "lucide-react"

const navigation = [
  { name: "Home", href: "/dashboard", icon: HomeIcon },
  { name: "School", href: "/school", icon: BookOpenIcon },
  { name: "Wallet", href: "/wallet", icon: WalletIcon },
  { name: "Profile", href: "/profile", icon: UserIcon },
  { name: "Leaderboard", href: "/leaderboard", icon: TrophyIcon },
  { name: "Maps", href: "/maps", icon: MapIcon },
  { name: "Local Hub", href: "/local-hub", icon: UsersIcon },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex flex-col h-full bg-background border-r">
      <div className="flex h-16 items-center px-4">
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-bold text-xl">NALI</span>
        </Link>
      </div>
      <nav className="flex-1 space-y-1 px-2 py-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center px-2 py-2 text-sm font-medium rounded-md",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          )
        })}
      </nav>
    </div>
  )
} 