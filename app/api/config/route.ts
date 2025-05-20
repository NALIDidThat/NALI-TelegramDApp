import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    miniAppUrl: process.env.NEXT_PUBLIC_TELEGRAM_MINI_APP_URL,
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL,
    status: 'ok',
    timestamp: new Date().toISOString()
  })
} 