import { ReactNode } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

interface SchoolLayoutProps {
  children: ReactNode
}

export default function SchoolLayout({ children }: SchoolLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <Link
            href="/dashboard"
            className="flex items-center space-x-2 text-sm font-medium"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Dashboard</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <div className="container py-6">
          {children}
        </div>
      </main>
    </div>
  )
} 