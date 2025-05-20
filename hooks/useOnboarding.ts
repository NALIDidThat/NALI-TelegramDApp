import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export type OnboardingStep = {
  id: string
  title: string
  path: string
  completed: boolean
}

export type RoleType = 'student' | 'teacher' | 'parent' | 'hub_manager'

const studentSteps: OnboardingStep[] = [
  { id: 'welcome', title: 'Welcome', path: '/onboarding/student/welcome', completed: false },
  { id: 'intro', title: 'Introduction', path: '/onboarding/student/intro', completed: false },
  { id: 'school', title: 'School', path: '/onboarding/student/school', completed: false },
  { id: 'class', title: 'Class', path: '/onboarding/student/class', completed: false },
  { id: 'parent', title: 'Parent', path: '/onboarding/student/parent', completed: false },
  { id: 'completed', title: 'Complete', path: '/onboarding/student/completed', completed: false }
]

const teacherSteps: OnboardingStep[] = [
  { id: 'welcome', title: 'Welcome', path: '/onboarding/teacher/welcome', completed: false },
  { id: 'school', title: 'School', path: '/onboarding/teacher/school', completed: false },
  { id: 'classes', title: 'Classes', path: '/onboarding/teacher/classes', completed: false },
  { id: 'completed', title: 'Complete', path: '/onboarding/teacher/completed', completed: false }
]

const parentSteps: OnboardingStep[] = [
  { id: 'welcome', title: 'Welcome', path: '/onboarding/parent/welcome', completed: false },
  { id: 'children', title: 'Children', path: '/onboarding/parent/children', completed: false },
  { id: 'completed', title: 'Complete', path: '/onboarding/parent/completed', completed: false }
]

const hubManagerSteps: OnboardingStep[] = [
  { id: 'welcome', title: 'Welcome', path: '/onboarding/hub-manager/welcome', completed: false },
  { id: 'center', title: 'Center', path: '/onboarding/hub-manager/center', completed: false },
  { id: 'completed', title: 'Complete', path: '/onboarding/hub-manager/completed', completed: false }
]

const stepsByRole = {
  student: studentSteps,
  teacher: teacherSteps,
  parent: parentSteps,
  hub_manager: hubManagerSteps
}

export function useOnboarding() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentStep, setCurrentStep] = useState<OnboardingStep | null>(null)
  const [steps, setSteps] = useState<OnboardingStep[]>([])
  const [role, setRole] = useState<RoleType | null>(null)

  useEffect(() => {
    const initializeOnboarding = async () => {
      try {
        setLoading(true)
        setError(null)

        // Get current user and profile
        const { data: { user }, error: userError } = await supabase.auth.getUser()
        if (userError) throw userError

        if (!user) {
          router.push('/auth/signin')
          return
        }

        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('role, onboarding_complete')
          .eq('id', user.id)
          .single()

        if (profileError) throw profileError

        // If onboarding is complete, redirect to dashboard
        if (profile?.onboarding_complete) {
          router.push('/dashboard')
          return
        }

        // Set role and steps
        if (profile?.role) {
          setRole(profile.role as RoleType)
          setSteps(stepsByRole[profile.role as RoleType])
        }

        // Find current step from URL
        const pathname = window.location.pathname
        const currentStepPath = pathname.split('/').pop() || ''
        
        const roleSteps = profile?.role ? stepsByRole[profile.role as RoleType] : []
        const step = roleSteps.find(s => s.path.includes(currentStepPath))
        
        if (step) {
          setCurrentStep(step)
        }
      } catch (error) {
        console.error('Onboarding initialization error:', error)
        setError(error instanceof Error ? error.message : 'Failed to initialize onboarding')
      } finally {
        setLoading(false)
      }
    }

    initializeOnboarding()
  }, [router])

  const updateProgress = async (stepId: string) => {
    try {
      setLoading(true)
      setError(null)

      const { data: { user }, error: userError } = await supabase.auth.getUser()
      if (userError) throw userError

      if (!user) {
        router.push('/auth/signin')
        return
      }

      // Update steps
      const updatedSteps = steps.map(step => ({
        ...step,
        completed: step.completed || step.id === stepId
      }))
      setSteps(updatedSteps)

      // Check if all steps are completed
      const allCompleted = updatedSteps.every(step => step.completed)
      if (allCompleted) {
        // Mark onboarding as complete
        const { error: updateError } = await supabase
          .from('profiles')
          .update({ onboarding_complete: true })
          .eq('id', user.id)

        if (updateError) throw updateError

        router.push('/dashboard')
        return
      }

      // Find next incomplete step
      const nextStep = updatedSteps.find(step => !step.completed)
      if (nextStep) {
        router.push(nextStep.path)
      }
    } catch (error) {
      console.error('Progress update error:', error)
      setError(error instanceof Error ? error.message : 'Failed to update progress')
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    error,
    role,
    steps,
    currentStep,
    updateProgress
  }
} 