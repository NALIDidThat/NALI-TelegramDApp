'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { OnboardingLayout } from '@/components/onboarding/OnboardingLayout'
import { supabase } from '@/lib/supabase'

export default function TeacherSchoolSelectionPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [schools, setSchools] = useState<any[]>([])
  const [selectedSchool, setSelectedSchool] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const searchSchools = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('schools')
        .select('*')
        .ilike('name', `%${searchQuery}%`)

      if (error) throw error
      setSchools(data || [])
    } catch (err) {
      console.error('Error searching schools:', err)
      setError('Failed to search schools. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleSchoolSelection = async (schoolId: string) => {
    setSelectedSchool(schoolId)
    setLoading(true)
    setError(null)

    const { data: { session } } = await supabase.auth.getSession()
    if (!session?.user) {
      router.push('/auth/signin')
      return
    }

    try {
      // Update teacher's school in the database
      const { error } = await supabase
        .from('profiles')
        .update({ school_id: schoolId })
        .eq('id', session.user.id)

      if (error) throw error

      router.push('/onboarding/teacher/classes')
    } catch (err) {
      console.error('Error updating school:', err)
      setError('Failed to update school. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <OnboardingLayout
      title="Select Your School"
      description="Search and select your school from the list below"
      currentStep={2}
      totalSteps={3}
    >
      <div className="space-y-4">
        <div className="flex space-x-2">
          <Input
            placeholder="Search for your school..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && searchSchools()}
          />
          <Button onClick={searchSchools} disabled={loading}>
            {loading ? 'Searching...' : 'Search'}
          </Button>
        </div>

        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}

        <div className="space-y-2">
          {schools.map((school) => (
            <div
              key={school.id}
              className={`p-4 border rounded-lg cursor-pointer ${
                selectedSchool === school.id ? 'border-primary bg-primary/5' : 'hover:bg-gray-50'
              }`}
              onClick={() => handleSchoolSelection(school.id)}
            >
              <h3 className="font-semibold">{school.name}</h3>
              <p className="text-sm text-gray-500">
                {school.address}, {school.city}, {school.country}
              </p>
            </div>
          ))}
        </div>

        {schools.length === 0 && searchQuery && !loading && (
          <p className="text-center text-gray-500">No schools found. Try a different search term.</p>
        )}
      </div>
    </OnboardingLayout>
  )
} 