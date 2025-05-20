'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { useOnboarding } from '@/hooks/useOnboarding'
import { supabase } from '@/lib/supabase'
import { Loader2 } from 'lucide-react'

interface Class {
  id: string
  name: string
  teacher: {
    full_name: string
  }
}

export default function StudentClassPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { updateProgress } = useOnboarding()
  const [classes, setClasses] = useState<Class[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedClass, setSelectedClass] = useState<string | null>(null)

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        setLoading(true)
        
        // Get current user's school
        const { data: { user }, error: userError } = await supabase.auth.getUser()
        if (userError) throw userError

        if (!user) {
          router.push('/auth/signin')
          return
        }

        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('school_id')
          .eq('id', user.id)
          .single()

        if (profileError) throw profileError
        if (!profile?.school_id) {
          router.push('/onboarding/student/school')
          return
        }

        // Fetch classes for the school
        const { data: classData, error: classError } = await supabase
          .from('classes')
          .select(`
            id,
            name,
            teacher:teacher_id (
              full_name
            )
          `)
          .eq('school_id', profile.school_id)

        if (classError) throw classError
        setClasses(classData || [])
      } catch (error) {
        console.error('Error fetching classes:', error)
        toast({
          title: 'Error',
          description: 'Failed to fetch classes. Please try again.',
          variant: 'destructive'
        })
      } finally {
        setLoading(false)
      }
    }

    fetchClasses()
  }, [router, toast])

  const handleClassSelect = async () => {
    if (!selectedClass) {
      toast({
        title: 'Error',
        description: 'Please select a class to continue.',
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

      // Update user's class in profile
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ class_id: selectedClass })
        .eq('id', user.id)

      if (updateError) throw updateError

      // Update onboarding progress
      await updateProgress('class')
    } catch (error) {
      console.error('Error selecting class:', error)
      toast({
        title: 'Error',
        description: 'Failed to select class. Please try again.',
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
            Join Your Class
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Select your class to connect with your teacher and classmates
          </p>
        </motion.div>

        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              {loading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-[#FF0099]" />
                </div>
              ) : classes.length > 0 ? (
                classes.map((classItem) => (
                  <motion.div
                    key={classItem.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`p-4 rounded-lg cursor-pointer transition-colors ${
                      selectedClass === classItem.id
                        ? 'bg-[#FF0099]/10 border-[#FF0099] border'
                        : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'
                    }`}
                    onClick={() => setSelectedClass(classItem.id)}
                  >
                    <h3 className="font-medium text-gray-900">{classItem.name}</h3>
                    <p className="text-sm text-gray-500">
                      Teacher: {classItem.teacher?.full_name || 'Not assigned'}
                    </p>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No classes found. Please contact your school administrator.
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="p-6 bg-gray-50">
            <Button
              className="w-full bg-[#FF0099] hover:bg-[#FF0099]/90"
              onClick={handleClassSelect}
              disabled={!selectedClass || loading}
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                'Continue'
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
} 