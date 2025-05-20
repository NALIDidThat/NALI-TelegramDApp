'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { OnboardingLayout } from '@/components/onboarding/OnboardingLayout'
import { supabase } from '@/lib/supabase'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function ParentChildConnectionPage() {
  const router = useRouter()
  const [children, setChildren] = useState<any[]>([])
  const [childEmail, setChildEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchChildren()
  }, [])

  const fetchChildren = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session?.user) {
      router.push('/auth/signin')
      return
    }

    try {
      // Fetch connected children
      const { data, error } = await supabase
        .from('student_parents')
        .select(`
          student_id,
          status,
          profiles:student_id (
            id,
            email,
            full_name,
            school:school_id (
              name
            )
          )
        `)
        .eq('parent_id', session.user.id)

      if (error) throw error
      setChildren(data || [])
    } catch (err) {
      console.error('Error fetching children:', err)
      setError('Failed to fetch children. Please try again.')
    }
  }

  const handleAddChild = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { data: { session } } = await supabase.auth.getSession()
    if (!session?.user) {
      router.push('/auth/signin')
      return
    }

    try {
      // Check if child exists
      const { data: childProfile } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', childEmail)
        .eq('role', 'student')
        .single()

      if (!childProfile) {
        setError('No student account found with this email. Please ask your child to sign up first.')
        setLoading(false)
        return
      }

      // Check if relationship already exists
      const { data: existingRelationship } = await supabase
        .from('student_parents')
        .select('id')
        .eq('student_id', childProfile.id)
        .eq('parent_id', session.user.id)
        .single()

      if (existingRelationship) {
        setError('You are already connected to this child.')
        setLoading(false)
        return
      }

      // Create parent-child relationship
      const { error: relationshipError } = await supabase
        .from('student_parents')
        .insert({
          student_id: childProfile.id,
          parent_id: session.user.id,
          status: 'pending'
        })

      if (relationshipError) throw relationshipError

      // Refresh children list
      await fetchChildren()
      setChildEmail('')
    } catch (err) {
      console.error('Error adding child:', err)
      setError('Failed to add child. Please try again.')
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
      // Update parent's profile
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
      title="Connect with Your Children"
      description="Add your children's email addresses to connect with them"
      currentStep={2}
      totalSteps={2}
    >
      <div className="space-y-6">
        <form onSubmit={handleAddChild} className="space-y-4">
          <div>
            <label htmlFor="childEmail" className="block text-sm font-medium text-gray-700">
              Child's Email
            </label>
            <Input
              id="childEmail"
              type="email"
              value={childEmail}
              onChange={(e) => setChildEmail(e.target.value)}
              placeholder="child@example.com"
              required
              className="mt-1"
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Adding...' : 'Add Child'}
          </Button>
        </form>

        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}

        <div className="space-y-2">
          <h3 className="font-semibold">Your Children</h3>
          {children.map((child) => (
            <div
              key={child.student_id}
              className="p-4 border rounded-lg"
            >
              <h4 className="font-medium">{child.profiles.full_name}</h4>
              <p className="text-sm text-gray-500">
                {child.profiles.email} • {child.profiles.school.name}
              </p>
              <p className="text-sm text-gray-500">
                Status: {child.status}
              </p>
            </div>
          ))}

          {children.length === 0 && (
            <p className="text-center text-gray-500">No children added yet.</p>
          )}
        </div>

        <Button
          onClick={handleCompleteOnboarding}
          className="w-full"
          disabled={loading || children.length === 0}
        >
          {loading ? 'Completing...' : 'Complete Onboarding'}
        </Button>
      </div>
    </OnboardingLayout>
  )
} 