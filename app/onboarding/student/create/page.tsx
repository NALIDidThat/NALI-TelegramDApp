'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { updateOnboardingProgress, supabase } from '@/lib/supabase'
import { getTelegramUser } from '@/lib/telegram'
import { CheckCircle } from 'lucide-react'

export default function CreatePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [profileData, setProfileData] = useState<any>(null)

  useEffect(() => {
    const fetchProfileData = async () => {
      const telegramUser = getTelegramUser()
      if (telegramUser) {
        try {
          const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', telegramUser.id)
            .single()
            
          if (error) throw error
          setProfileData(data)
        } catch (error) {
          console.error('Error fetching profile data:', error)
        }
      }
    }
    
    fetchProfileData()
  }, [])

  const handleNext = async () => {
    setLoading(true)
    try {
      const telegramUser = getTelegramUser()
      if (telegramUser) {
        // Update profile with 'onboarding_complete' flag
        const { error } = await supabase
          .from('profiles')
          .update({ onboarding_complete: true })
          .eq('id', telegramUser.id)
          
        if (error) throw error
        
        // Update onboarding progress
        await updateOnboardingProgress(telegramUser.id, 'completed', true)
      }
      router.push('/onboarding/student/completed')
    } catch (error) {
      console.error('Error completing profile:', error)
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
            Almost Done!
          </h1>
          <p className="text-gray-600">
            Review your profile details before we finalize your account
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm space-y-5">
          <div className="border-b pb-4">
            <h3 className="font-semibold text-lg text-gray-900 mb-4">
              Personal Information
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-500">Name</span>
                <span className="font-medium">
                  {profileData?.first_name} {profileData?.last_name}
                </span>
              </div>
              {profileData?.nickname && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Nickname</span>
                  <span className="font-medium">{profileData.nickname}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-500">Role</span>
                <span className="font-medium capitalize">{profileData?.role || 'Student'}</span>
              </div>
            </div>
          </div>

          <div className="border-b pb-4">
            <h3 className="font-semibold text-lg text-gray-900 mb-4">
              Learning Settings
            </h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <CheckCircle className="text-green-500 w-5 h-5 mr-3" />
                <span>Learning Journey selected</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="text-green-500 w-5 h-5 mr-3" />
                <span>Notification preferences set</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="text-green-500 w-5 h-5 mr-3" />
                <span>Profile information completed</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-4">
              What's Next
            </h3>
            <p className="text-gray-600 text-sm">
              After creating your profile, you'll be able to explore experiences, earn rewards, and connect with your community.
            </p>
          </div>
        </div>

        <div className="pt-6">
          <Button
            className="w-full bg-[#FF0099] hover:bg-[#FF0099]/90 text-white font-medium text-lg py-6 rounded-full"
            onClick={handleNext}
            disabled={loading}
          >
            {loading ? "Creating Profile..." : "Complete Profile Setup"}
          </Button>
        </div>
      </motion.div>
    </div>
  )
} 