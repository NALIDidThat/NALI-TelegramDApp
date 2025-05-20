import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })
  
  // For Telegram Web App, we skip authentication checks as the user
  // is authenticated via Telegram's built-in mechanisms
  // The Telegram user data should be available in the client-side
  // via window.Telegram.WebApp.initDataUnsafe

  // For onboarding flow
  if (req.nextUrl.pathname.startsWith('/onboarding')) {
    try {
      // In a Telegram Mini App, we'll have to handle profile checks 
      // on the client side, since we can't access Telegram WebApp data from middleware
      // Just let the request through and handle auth in the component
      return res
    } catch (error) {
      console.error('Middleware error:', error)
      // On error, just continue and let client handle it
      return res
    }
  }

  return res
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
} 