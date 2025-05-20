'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { getTelegramUser } from '@/lib/telegram'
import { useEffect, useState } from 'react'

export default function StudentWelcomePage() {
  const router = useRouter()
  const [userName, setUserName] = useState('')
  
  useEffect(() => {
    // Get Telegram user name
    const telegramUser = getTelegramUser()
    if (telegramUser) {
      setUserName(telegramUser.first_name || 'Student')
    }
  }, [])

  const features = [
    {
      title: 'Join Classes',
      description: 'Connect with your teachers and classmates',
      icon: '📚'
    },
    {
      title: 'Track Progress',
      description: 'Monitor your learning journey and achievements',
      icon: '📈'
    },
    {
      title: 'Earn Rewards',
      description: 'Get rewarded for your accomplishments',
      icon: '🏆'
    },
    {
      title: 'Learn Together',
      description: 'Collaborate with peers on projects and activities',
      icon: '👥'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md mx-auto"
      >
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">
          Welcome, {userName}!
        </h1>
        
        <p className="text-gray-600 text-center mb-8">
          We're excited to have you join as a student. Here's what you can do:
        </p>

        <div className="grid grid-cols-2 gap-4 mb-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-4 rounded-xl shadow-sm text-center"
            >
              <div className="text-4xl mb-2">{feature.icon}</div>
              <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
              <p className="text-gray-500 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Next Steps
            </h2>
            <div className="space-y-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[#FF0099] text-white flex items-center justify-center text-lg">
                  1
                </div>
                <div className="ml-4">
                  <p className="font-medium text-gray-900">Create your profile</p>
                  <p className="text-gray-500">Tell us a bit about yourself</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[#FF0099] text-white flex items-center justify-center text-lg">
                  2
                </div>
                <div className="ml-4">
                  <p className="font-medium text-gray-900">Join your class</p>
                  <p className="text-gray-500">Connect with your teacher and classmates</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[#FF0099] text-white flex items-center justify-center text-lg">
                  3
                </div>
                <div className="ml-4">
                  <p className="font-medium text-gray-900">Start your journey</p>
                  <p className="text-gray-500">Begin exploring and learning</p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="p-6 bg-gray-50">
            <Button
              className="w-full bg-[#FF0099] hover:bg-[#FF0099]/90 text-white font-medium text-lg py-6 rounded-full"
              onClick={() => router.push('/onboarding/student/intro')}
            >
              Let's Get Started
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
} 