'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { updateOnboardingProgress } from '@/lib/supabase'
import { getTelegramUser } from '@/lib/telegram'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'

export default function ControlPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [preferences, setPreferences] = useState({
    dailyReminders: true,
    weeklyReports: true,
    achievementNotifications: true
  })

  const handleToggle = (key: keyof typeof preferences) => {
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const handleNext = async () => {
    setLoading(true)
    try {
      const telegramUser = getTelegramUser()
      if (telegramUser) {
        await updateOnboardingProgress(telegramUser.id, 'control')
        // You could also store the learning preferences in the user's profile
      }
      router.push('/onboarding/student/name_registry')
    } catch (error) {
      console.error('Error updating progress:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md mx-auto space-y-8"
      >
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Learning Preferences
          </h1>
          <p className="text-gray-600">
            Customize how you want to learn and track progress
          </p>
        </div>

        <div className="space-y-5">
          <div className="bg-white p-5 rounded-xl border border-gray-200 space-y-3">
            <h3 className="font-semibold text-gray-900">Daily Reminders</h3>
            <p className="text-gray-600 text-sm mb-2">
              Get daily nudges to continue your learning journey
            </p>
            <div className="flex items-center justify-between">
              <Label htmlFor="daily-reminders" className="text-sm text-gray-500">
                Enable daily reminders
              </Label>
              <Switch 
                id="daily-reminders" 
                checked={preferences.dailyReminders}
                onCheckedChange={() => handleToggle('dailyReminders')}
              />
            </div>
          </div>
          
          <div className="bg-white p-5 rounded-xl border border-gray-200 space-y-3">
            <h3 className="font-semibold text-gray-900">Weekly Reports</h3>
            <p className="text-gray-600 text-sm mb-2">
              Receive a summary of your weekly learning progress
            </p>
            <div className="flex items-center justify-between">
              <Label htmlFor="weekly-reports" className="text-sm text-gray-500">
                Enable weekly reports
              </Label>
              <Switch 
                id="weekly-reports" 
                checked={preferences.weeklyReports}
                onCheckedChange={() => handleToggle('weeklyReports')}
              />
            </div>
          </div>
          
          <div className="bg-white p-5 rounded-xl border border-gray-200 space-y-3">
            <h3 className="font-semibold text-gray-900">Achievement Notifications</h3>
            <p className="text-gray-600 text-sm mb-2">
              Get notified when you earn badges or complete milestones
            </p>
            <div className="flex items-center justify-between">
              <Label htmlFor="achievement-notifications" className="text-sm text-gray-500">
                Enable achievement notifications
              </Label>
              <Switch 
                id="achievement-notifications" 
                checked={preferences.achievementNotifications}
                onCheckedChange={() => handleToggle('achievementNotifications')}
              />
            </div>
          </div>
        </div>

        <div className="pt-6">
          <Button
            className="w-full bg-[#FF0099] hover:bg-[#FF0099]/90 text-white font-medium text-lg py-6 rounded-full"
            onClick={handleNext}
            disabled={loading}
          >
            {loading ? "Loading..." : "Continue"}
          </Button>
        </div>
      </motion.div>
    </div>
  )
} 