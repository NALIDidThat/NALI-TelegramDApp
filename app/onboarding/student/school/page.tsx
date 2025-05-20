'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { useOnboarding } from '@/hooks/useOnboarding'
import { supabase } from '@/lib/supabase'
import { Search, Loader2 } from 'lucide-react'

interface School {
  id: string
  name: string
  city: string
  country: string
}

export default function StudentSchoolPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { updateProgress } = useOnboarding()
  const [searchQuery, setSearchQuery] = useState('')
  const [schools, setSchools] = useState<School[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedSchool, setSelectedSchool] = useState<string | null>(null)

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        setLoading(true)
        let query = supabase
          .from('schools')
          .select('id, name, city, country')
          
        if (searchQuery) {
          query = query.ilike('name', `%${searchQuery}%`)
        }
        
        const { data, error } = await query.limit(10)
        
        if (error) throw error
        setSchools(data || [])
      } catch (error) {
        console.error('Error fetching schools:', error)
        toast({
          title: 'Error',
          description: 'Failed to fetch schools. Please try again.',
          variant: 'destructive'
        })
      } finally {
        setLoading(false)
      }
    }

    const debounce = setTimeout(fetchSchools, 300)
    return () => clearTimeout(debounce)
  }, [searchQuery, toast])

  const handleSchoolSelect = async () => {
    if (!selectedSchool) {
      toast({
        title: 'Error',
        description: 'Please select a school to continue.',
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

      // Update user's school in profile
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ school_id: selectedSchool })
        .eq('id', user.id)

      if (updateError) throw updateError

      // Update onboarding progress
      await updateProgress('school')
    } catch (error) {
      console.error('Error selecting school:', error)
      toast({
        title: 'Error',
        description: 'Failed to select school. Please try again.',
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
            Find Your School
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Connect with your school to join your class
          </p>
        </motion.div>

        <Card>
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search for your school..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="mt-6 space-y-4">
              {loading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-[#FF0099]" />
                </div>
              ) : schools.length > 0 ? (
                schools.map((school) => (
                  <motion.div
                    key={school.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`p-4 rounded-lg cursor-pointer transition-colors ${
                      selectedSchool === school.id
                        ? 'bg-[#FF0099]/10 border-[#FF0099] border'
                        : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'
                    }`}
                    onClick={() => setSelectedSchool(school.id)}
                  >
                    <h3 className="font-medium text-gray-900">{school.name}</h3>
                    <p className="text-sm text-gray-500">
                      {school.city}, {school.country}
                    </p>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No schools found. Try a different search term.
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="p-6 bg-gray-50">
            <Button
              className="w-full bg-[#FF0099] hover:bg-[#FF0099]/90"
              onClick={handleSchoolSelect}
              disabled={!selectedSchool || loading}
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