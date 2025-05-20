'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import { updateOnboardingProgress } from '@/lib/supabase'
import { getTelegramUser } from '@/lib/telegram'
import { supabase } from '@/lib/supabase'

export default function NameRegistryPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [nickname, setNickname] = useState('')

  useEffect(() => {
    // Pre-fill from Telegram user data if available
    const telegramUser = getTelegramUser()
    if (telegramUser) {
      if (telegramUser.first_name) {
        setFirstName(telegramUser.first_name)
      }
      if (telegramUser.last_name) {
        setLastName(telegramUser.last_name)
      }
    }
  }, [])

  const handleNext = async () => {
    if (!firstName || !lastName) {
      return
    }

    setLoading(true)
    try {
      const telegramUser = getTelegramUser()
      if (telegramUser) {
        // Update profile with name information
        const { error } = await supabase
          .from('profiles')
          .update({ 
            first_name: firstName,
            last_name: lastName,
            nickname: nickname || null
          })
          .eq('id', telegramUser.id)
          
        if (error) throw error
        
        // Update onboarding progress
        await updateOnboardingProgress(telegramUser.id, 'name_registry')
      }
      router.push('/onboarding/student/create')
    } catch (error) {
      console.error('Error updating profile:', error)
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
            Your Profile
          </h1>
          <p className="text-gray-600">
            Tell us more about yourself
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm space-y-5">
          <div className="space-y-2">
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
              First Name*
            </label>
            <Input
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Enter your first name"
              className="w-full"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
              Last Name*
            </label>
            <Input
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Enter your last name"
              className="w-full"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="nickname" className="block text-sm font-medium text-gray-700">
              Nickname (Optional)
            </label>
            <Input
              id="nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="What would you like to be called?"
              className="w-full"
            />
          </div>
        </div>

        <div className="pt-6">
          <Button
            className="w-full bg-[#FF0099] hover:bg-[#FF0099]/90 text-white font-medium text-lg py-6 rounded-full"
            onClick={handleNext}
            disabled={loading || !firstName || !lastName}
          >
            {loading ? "Saving..." : "Continue"}
          </Button>
        </div>
      </motion.div>
    </div>
  )
} 