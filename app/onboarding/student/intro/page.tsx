'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { getTelegramUser } from '@/lib/telegram'
import { updateOnboardingProgress } from '@/lib/supabase'
import { useState } from 'react'

export default function StudentIntroPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const journeySteps = [
    {
      title: 'Personalized Learning',
      description: 'Your journey adapts to your unique learning style and pace',
      icon: '🎯'
    },
    {
      title: 'Interactive Lessons',
      description: 'Engage with fun and interactive learning materials',
      icon: '💡'
    },
    {
      title: 'Progress Tracking',
      description: 'Watch your achievements grow with detailed progress tracking',
      icon: '📊'
    },
    {
      title: 'Community Support',
      description: 'Learn alongside peers and get help when you need it',
      icon: '🤝'
    }
  ]

  const handleNext = async () => {
    setLoading(true)
    try {
      const telegramUser = getTelegramUser()
      if (telegramUser) {
        await updateOnboardingProgress(telegramUser.id, 'intro')
      }
      router.push('/onboarding/student/journeys')
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
            Your Learning Journey
          </h1>
          <p className="text-gray-600">
            Here's what you can expect on your path to success
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {journeySteps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-5 rounded-xl shadow-sm flex items-center"
            >
              <div className="text-4xl mr-4">{step.icon}</div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  {step.title}
                </h3>
                <p className="text-gray-500 text-sm">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Ready to Begin?
            </h2>
            <p className="text-gray-600">
              Next, we'll help you choose your learning journey. This will personalize your experience and ensure you get the most relevant content.
            </p>
          </CardContent>
          <CardFooter className="p-6 bg-gray-50">
            <Button
              className="w-full bg-[#FF0099] hover:bg-[#FF0099]/90 text-white font-medium text-lg py-6 rounded-full"
              onClick={handleNext}
              disabled={loading}
            >
              {loading ? "Loading..." : "Continue to Learning Journeys"}
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
} 