declare module "@/components/dashboard/sidebar" {
  import { ReactNode } from "react"
  export function Sidebar(): ReactNode
}

declare module "@/components/dashboard/mobile-nav" {
  import { ReactNode } from "react"
  export function MobileNav(): ReactNode
}

declare module "@/lib/utils" {
  export function cn(...inputs: any[]): string
} 