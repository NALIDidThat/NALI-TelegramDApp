'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { OnboardingLayout } from '@/components/onboarding/OnboardingLayout'
import { supabase } from '@/lib/supabase'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function TeacherClassManagementPage() {
  const router = useRouter()
  const [classes, setClasses] = useState<any[]>([])
  const [newClassName, setNewClassName] = useState('')
  const [newClassGrade, setNewClassGrade] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchClasses()
  }, [])

  const fetchClasses = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session?.user) {
      router.push('/auth/signin')
      return
    }

    try {
      // Get teacher's school
      const { data: profile } = await supabase
        .from('profiles')
        .select('school_id')
        .eq('id', session.user.id)
        .single()

      if (!profile?.school_id) {
        router.push('/onboarding/teacher/school')
        return
      }

      // Fetch classes for the school
      const { data, error } = await supabase
        .from('classes')
        .select('*')
        .eq('school_id', profile.school_id)

      if (error) throw error
      setClasses(data || [])
    } catch (err) {
      console.error('Error fetching classes:', err)
      setError('Failed to fetch classes. Please try again.')
    }
  }

  const handleCreateClass = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { data: { session } } = await supabase.auth.getSession()
    if (!session?.user) {
      router.push('/auth/signin')
      return
    }

    try {
      // Get teacher's school
      const { data: profile } = await supabase
        .from('profiles')
        .select('school_id')
        .eq('id', session.user.id)
        .single()

      if (!profile?.school_id) {
        router.push('/onboarding/teacher/school')
        return
      }

      // Create new class
      const { error } = await supabase
        .from('classes')
        .insert({
          name: newClassName,
          grade_level: newClassGrade,
          school_id: profile.school_id,
          teacher_id: session.user.id
        })

      if (error) throw error

      // Refresh classes list
      await fetchClasses()
      setNewClassName('')
      setNewClassGrade('')
    } catch (err) {
      console.error('Error creating class:', err)
      setError('Failed to create class. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleCompleteOnboarding = async () => {
    setLoading(true)
    setError(null)

    const { data: { session } } = await supabase.auth.getSession()
    if (!session?.user) {
      router.push('/auth/signin')
      return
    }

    try {
      // Update teacher's profile
      const { error } = await supabase
        .from('profiles')
        .update({ onboarding_complete: true })
        .eq('id', session.user.id)

      if (error) throw error

      router.push('/dashboard')
    } catch (err) {
      console.error('Error completing onboarding:', err)
      setError('Failed to complete onboarding. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <OnboardingLayout
      title="Manage Your Classes"
      description="Create and manage your classes"
      currentStep={3}
      totalSteps={3}
    >
      <div className="space-y-6">
        <form onSubmit={handleCreateClass} className="space-y-4">
          <div>
            <label htmlFor="className" className="block text-sm font-medium text-gray-700">
              Class Name
            </label>
            <Input
              id="className"
              value={newClassName}
              onChange={(e) => setNewClassName(e.target.value)}
              placeholder="e.g., Mathematics 101"
              required
              className="mt-1"
            />
          </div>

          <div>
            <label htmlFor="classGrade" className="block text-sm font-medium text-gray-700">
              Grade Level
            </label>
            <Input
              id="classGrade"
              value={newClassGrade}
              onChange={(e) => setNewClassGrade(e.target.value)}
              placeholder="e.g., Grade 10"
              required
              className="mt-1"
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Creating...' : 'Create Class'}
          </Button>
        </form>

        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}

        <div className="space-y-2">
          <h3 className="font-semibold">Your Classes</h3>
          {classes.map((classItem) => (
            <div
              key={classItem.id}
              className="p-4 border rounded-lg"
            >
              <h4 className="font-medium">{classItem.name}</h4>
              <p className="text-sm text-gray-500">Grade Level: {classItem.grade_level}</p>
            </div>
          ))}

          {classes.length === 0 && (
            <p className="text-center text-gray-500">No classes created yet.</p>
          )}
        </div>

        <Button
          onClick={handleCompleteOnboarding}
          className="w-full"
          disabled={loading || classes.length === 0}
        >
          {loading ? 'Completing...' : 'Complete Onboarding'}
        </Button>
      </div>
    </OnboardingLayout>
  )
} 