'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { OnboardingLayout } from '@/components/onboarding/OnboardingLayout'
import { supabase } from '@/lib/supabase'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function HubManagerCenterPage() {
  const router = useRouter()
  const [centers, setCenters] = useState<any[]>([])
  const [newCenterName, setNewCenterName] = useState('')
  const [newCenterAddress, setNewCenterAddress] = useState('')
  const [newCenterCity, setNewCenterCity] = useState('')
  const [newCenterCountry, setNewCenterCountry] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchCenters()
  }, [])

  const fetchCenters = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session?.user) {
      router.push('/auth/signin')
      return
    }

    try {
      // Fetch learning centers managed by the hub manager
      const { data, error } = await supabase
        .from('learning_centers')
        .select('*')
        .eq('manager_id', session.user.id)

      if (error) throw error
      setCenters(data || [])
    } catch (err) {
      console.error('Error fetching centers:', err)
      setError('Failed to fetch learning centers. Please try again.')
    }
  }

  const handleCreateCenter = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { data: { session } } = await supabase.auth.getSession()
    if (!session?.user) {
      router.push('/auth/signin')
      return
    }

    try {
      // Create new learning center
      const { error } = await supabase
        .from('learning_centers')
        .insert({
          name: newCenterName,
          address: newCenterAddress,
          city: newCenterCity,
          country: newCenterCountry,
          manager_id: session.user.id
        })

      if (error) throw error

      // Refresh centers list
      await fetchCenters()
      setNewCenterName('')
      setNewCenterAddress('')
      setNewCenterCity('')
      setNewCenterCountry('')
    } catch (err) {
      console.error('Error creating center:', err)
      setError('Failed to create learning center. Please try again.')
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
      // Update hub manager's profile
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
      title="Manage Learning Centers"
      description="Create and manage your learning centers"
      currentStep={2}
      totalSteps={2}
    >
      <div className="space-y-6">
        <form onSubmit={handleCreateCenter} className="space-y-4">
          <div>
            <label htmlFor="centerName" className="block text-sm font-medium text-gray-700">
              Center Name
            </label>
            <Input
              id="centerName"
              value={newCenterName}
              onChange={(e) => setNewCenterName(e.target.value)}
              placeholder="e.g., Downtown Learning Center"
              required
              className="mt-1"
            />
          </div>

          <div>
            <label htmlFor="centerAddress" className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <Input
              id="centerAddress"
              value={newCenterAddress}
              onChange={(e) => setNewCenterAddress(e.target.value)}
              placeholder="Street address"
              required
              className="mt-1"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="centerCity" className="block text-sm font-medium text-gray-700">
                City
              </label>
              <Input
                id="centerCity"
                value={newCenterCity}
                onChange={(e) => setNewCenterCity(e.target.value)}
                placeholder="City"
                required
                className="mt-1"
              />
            </div>

            <div>
              <label htmlFor="centerCountry" className="block text-sm font-medium text-gray-700">
                Country
              </label>
              <Input
                id="centerCountry"
                value={newCenterCountry}
                onChange={(e) => setNewCenterCountry(e.target.value)}
                placeholder="Country"
                required
                className="mt-1"
              />
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Creating...' : 'Create Center'}
          </Button>
        </form>

        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}

        <div className="space-y-2">
          <h3 className="font-semibold">Your Learning Centers</h3>
          {centers.map((center) => (
            <div
              key={center.id}
              className="p-4 border rounded-lg"
            >
              <h4 className="font-medium">{center.name}</h4>
              <p className="text-sm text-gray-500">
                {center.address}, {center.city}, {center.country}
              </p>
            </div>
          ))}

          {centers.length === 0 && (
            <p className="text-center text-gray-500">No learning centers created yet.</p>
          )}
        </div>

        <Button
          onClick={handleCompleteOnboarding}
          className="w-full"
          disabled={loading || centers.length === 0}
        >
          {loading ? 'Completing...' : 'Complete Onboarding'}
        </Button>
      </div>
    </OnboardingLayout>
  )
} 