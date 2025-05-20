'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { useOnboarding } from '@/hooks/useOnboarding'
import { supabase } from '@/lib/supabase'
import { Loader2, Mail } from 'lucide-react'

export default function StudentParentPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { updateProgress } = useOnboarding()
  const [parentEmail, setParentEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const handleParentConnect = async () => {
    if (!parentEmail) {
      toast({
        title: 'Error',
        description: 'Please enter your parent\'s email address.',
        variant: 'destructive'
      })
      return
    }

    try {
      setLoading(true)
      
      // Get current user
      const { data: { user }, error: userError } = await supabase.auth.getUser()
      if (userError) throw userError
      
      if (!user) {
        router.push('/auth/signin')
        return
      }

      // Check if parent exists
      const { data: parentProfile, error: parentError } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', parentEmail)
        .eq('role', 'parent')
        .single()

      if (parentError && parentError.code !== 'PGRST116') { // PGRST116 is "not found"
        throw parentError
      }

      if (!parentProfile) {
        // Create invitation for parent
        const { error: inviteError } = await supabase
          .from('student_parents')
          .insert([
            {
              student_id: user.id,
              parent_email: parentEmail,
              status: 'pending'
            }
          ])

        if (inviteError) throw inviteError

        toast({
          title: 'Invitation Sent',
          description: 'We\'ll notify your parent to create an account and connect with you.',
        })
      } else {
        // Create connection with existing parent
        const { error: connectionError } = await supabase
          .from('student_parents')
          .insert([
            {
              student_id: user.id,
              parent_id: parentProfile.id,
              status: 'pending'
            }
          ])

        if (connectionError) throw connectionError

        toast({
          title: 'Connection Request Sent',
          description: 'Your parent will need to approve the connection.',
        })
      }

      // Update onboarding progress
      await updateProgress('parent')
    } catch (error) {
      console.error('Error connecting with parent:', error)
      toast({
        title: 'Error',
        description: 'Failed to connect with parent. Please try again.',
        variant: 'destructive'
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSkip = async () => {
    try {
      setLoading(true)
      await updateProgress('parent')
    } catch (error) {
      console.error('Error skipping parent connection:', error)
      toast({
        title: 'Error',
        description: 'Failed to skip. Please try again.',
        variant: 'destructive'
      })
    } finally {
      setLoading(false)
    }
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
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            Connect with Your Parent
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Let your parent track your progress and support your learning journey
          </p>
        </motion.div>

        <Card>
          <CardContent className="p-6">
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  Enter Your Parent's Email
                </h2>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    type="email"
                    placeholder="parent@example.com"
                    value={parentEmail}
                    onChange={(e) => setParentEmail(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-blue-800 mb-2">
                  What happens next?
                </h3>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• We'll send an invitation to your parent</li>
                  <li>• They'll create an account or log in</li>
                  <li>• Once connected, they can view your progress</li>
                </ul>
              </div>
            </div>
          </CardContent>
          <CardFooter className="p-6 bg-gray-50 flex flex-col space-y-4">
            <Button
              className="w-full bg-[#FF0099] hover:bg-[#FF0099]/90"
              onClick={handleParentConnect}
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                'Connect with Parent'
              )}
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={handleSkip}
              disabled={loading}
            >
              Skip for Now
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
} 