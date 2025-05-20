"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  HomeIcon,
  BookOpenIcon,
  WalletIcon,
  UserIcon,
} from "lucide-react"

const navigation = [
  { name: "Home", href: "/dashboard", icon: HomeIcon },
  { name: "School", href: "/school", icon: BookOpenIcon },
  { name: "Wallet", href: "/wallet", icon: WalletIcon },
  { name: "Profile", href: "/profile", icon: UserIcon },
]

export function MobileNav() {
  const pathname = usePathname()

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t bg-background md:hidden">
      <nav className="grid grid-cols-4 gap-1 p-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center p-2 text-xs font-medium rounded-md",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <item.icon className="h-5 w-5 mb-1" />
              {item.name}
            </Link>
          )
        })}
      </nav>
    </div>
  )
} 