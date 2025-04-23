"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, Globe } from "lucide-react"

export default function NavigationMenu() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  const handleBrowserClick = () => {
    router.push("/browser")
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="h-8 w-8"
      >
        <Menu className="h-4 w-4" />
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-background border">
          <div className="py-1">
            <button
              onClick={handleBrowserClick}
              className="flex items-center w-full px-4 py-2 text-sm text-foreground hover:bg-accent"
            >
              <Globe className="h-4 w-4 mr-2" />
              Browser
            </button>
          </div>
        </div>
      )}
    </div>
  )
} 