'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { supabase } from '@/lib/supabase'
import { CheckCircle2, School, Users, UserRound, Loader2 } from 'lucide-react'

interface Profile {
  full_name: string
  school: {
    name: string
  }
  class: {
    name: string
  }
}

export default function StudentCompletedPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState<Profile | null>(null)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true)
        
        // Get current user
        const { data: { user }, error: userError } = await supabase.auth.getUser()
        if (userError) throw userError

        if (!user) {
          router.push('/auth/signin')
          return
        }

        // Fetch profile with related data
        const { data, error: profileError } = await supabase
          .from('profiles')
          .select(`
            full_name,
            school:school_id (
              name
            ),
            class:class_id (
              name
            )
          `)
          .eq('id', user.id)
          .single()

        if (profileError) throw profileError
        setProfile(data)
      } catch (error) {
        console.error('Error fetching profile:', error)
        toast({
          title: 'Error',
          description: 'Failed to load your profile. Please try again.',
          variant: 'destructive'
        })
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [router, toast])

  const handleContinue = () => {
    router.push('/dashboard')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="h-8 w-8 animate-spin text-[#FF0099]" />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="flex justify-center mb-4">
            <CheckCircle2 className="h-16 w-16 text-green-500" />
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            You're All Set!
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Welcome to NALI, {profile?.full_name}! Let's start your learning journey.
          </p>
        </motion.div>

        <Card>
          <CardContent className="p-6">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Your Setup Summary
              </h2>

              <div className="space-y-4">
                <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                  <UserRound className="h-6 w-6 text-[#FF0099] mr-4" />
                  <div>
                    <h3 className="font-medium text-gray-900">Your Name</h3>
                    <p className="text-gray-600">{profile?.full_name}</p>
                  </div>
                </div>

                <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                  <School className="h-6 w-6 text-[#FF0099] mr-4" />
                  <div>
                    <h3 className="font-medium text-gray-900">Your School</h3>
                    <p className="text-gray-600">{profile?.school?.name || 'Not set'}</p>
                  </div>
                </div>

                <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                  <Users className="h-6 w-6 text-[#FF0099] mr-4" />
                  <div>
                    <h3 className="font-medium text-gray-900">Your Class</h3>
                    <p className="text-gray-600">{profile?.class?.name || 'Not set'}</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg mt-6">
                <h3 className="text-sm font-medium text-blue-800 mb-2">
                  What's Next?
                </h3>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Explore your personalized dashboard</li>
                  <li>• Start your first learning journey</li>
                  <li>• Connect with classmates</li>
                  <li>• Track your progress</li>
                </ul>
              </div>
            </div>
          </CardContent>
          <CardFooter className="p-6 bg-gray-50">
            <Button
              className="w-full bg-[#FF0099] hover:bg-[#FF0099]/90"
              onClick={handleContinue}
            >
              Go to Dashboard
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
} 