'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { updateOnboardingProgress } from '@/lib/supabase'
import { getTelegramUser } from '@/lib/telegram'
import { CheckCircle } from 'lucide-react'

export default function JourneysPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [selectedJourney, setSelectedJourney] = useState<string | null>(null)

  const journeys = [
    {
      id: 'academic',
      title: 'Academic Excellence',
      description: 'Focus on core academic subjects and exam preparation',
      color: 'bg-blue-50 border-blue-200',
      activeColor: 'bg-blue-100 border-blue-500',
      textColor: 'text-blue-700'
    },
    {
      id: 'skills',
      title: 'Skill Development',
      description: 'Develop practical skills and real-world applications',
      color: 'bg-green-50 border-green-200',
      activeColor: 'bg-green-100 border-green-500',
      textColor: 'text-green-700'
    },
    {
      id: 'creative',
      title: 'Creative Arts',
      description: 'Explore artistic expression and creative thinking',
      color: 'bg-purple-50 border-purple-200',
      activeColor: 'bg-purple-100 border-purple-500',
      textColor: 'text-purple-700'
    }
  ]

  const handleNext = async () => {
    if (!selectedJourney) {
      return
    }

    setLoading(true)
    try {
      const telegramUser = getTelegramUser()
      if (telegramUser) {
        await updateOnboardingProgress(telegramUser.id, 'journeys')
        // You could also store the selected journey in the user's profile
      }
      router.push('/onboarding/student/control')
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
            Learning Journeys
          </h1>
          <p className="text-gray-600">
            Choose your learning path to personalize your experience
          </p>
        </div>

        <div className="space-y-4">
          {journeys.map((journey, index) => (
            <motion.button
              key={journey.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => setSelectedJourney(journey.id)}
              className={`w-full p-5 rounded-xl border-2 text-left relative ${
                selectedJourney === journey.id 
                  ? journey.activeColor
                  : journey.color
              }`}
            >
              {selectedJourney === journey.id && (
                <CheckCircle className="absolute top-4 right-4 w-6 h-6 text-blue-600" />
              )}
              <h3 className={`font-semibold text-lg mb-2 ${journey.textColor}`}>
                {journey.title}
              </h3>
              <p className="text-gray-600">
                {journey.description}
              </p>
            </motion.button>
          ))}
        </div>

        <div className="pt-6">
          <Button
            className="w-full bg-[#FF0099] hover:bg-[#FF0099]/90 text-white font-medium text-lg py-6 rounded-full"
            onClick={handleNext}
            disabled={!selectedJourney || loading}
          >
            {loading ? "Loading..." : "Continue"}
          </Button>
        </div>
      </motion.div>
    </div>
  )
} 