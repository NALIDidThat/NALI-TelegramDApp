"use client"

import { motion } from "framer-motion"
import { School, User, Building2, Users, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { UserRole } from "@/types/database"
import { useState, useEffect } from "react"
import { getTelegramUser, showAlert } from "@/lib/telegram"
import { TelegramLoginButton } from "../ui/telegram-login-button"
import { VerificationCodeInput } from "../ui/verification-code-input"

interface RoleSelectionScreenProps {
  theme: {
    bg_color: string
    text_color: string
    hint_color: string
    button_color: string
    button_text_color: string
  }
  onRoleSelected?: () => void
}

const roles = [
  {
    id: "student",
    title: "Student",
    description: "Join as a student to participate in experiences and earn rewards",
    icon: School,
    color: "bg-blue-500/10 text-blue-500",
    steps: [
      "Select your school",
      "Choose your class",
      "Connect with parent",
      "Complete profile"
    ],
    nextStep: "/onboarding/student/welcome"
  },
  {
    id: "teacher",
    title: "Teacher",
    description: "Join as a teacher to manage classes and track student progress",
    icon: User,
    color: "bg-green-500/10 text-green-500",
    steps: [
      "Select your school",
      "Create your classes",
      "Complete profile"
    ],
    nextStep: "/onboarding/teacher/school"
  },
  {
    id: "parent",
    title: "Parent",
    description: "Join as a parent to monitor your child's progress and achievements",
    icon: Users,
    color: "bg-purple-500/10 text-purple-500",
    steps: [
      "Add your children",
      "Complete profile"
    ],
    nextStep: "/onboarding/parent/children"
  },
  {
    id: "hub_manager",
    title: "Hub Manager",
    description: "Join as a hub manager to oversee local learning centers",
    icon: Building2,
    color: "bg-orange-500/10 text-orange-500",
    steps: [
      "Set up your learning center",
      "Complete profile"
    ],
    nextStep: "/onboarding/hub-manager/center"
  }
]

export default function RoleSelectionScreen({ theme, onRoleSelected }: RoleSelectionScreenProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null)
  const [authStep, setAuthStep] = useState<'initial' | 'verification' | 'role_selection'>('initial')
  const [verificationCode, setVerificationCode] = useState<string | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [telegramUserData, setTelegramUserData] = useState<any>(null)
  
  // Check if user is already authenticated via Telegram
  useEffect(() => {
    const checkTelegramAuth = () => {
      const user = getTelegramUser()
      if (user) {
        setTelegramUserData(user)
        setIsAuthenticated(true)
        setAuthStep('role_selection')
      }
    }
    
    checkTelegramAuth()
  }, [])

  const handleCodeReceived = (code: string) => {
    setVerificationCode(code)
    setAuthStep('verification')
  }

  const handleVerifyCode = async (inputCode: string) => {
    setIsLoading(true)
    setError(null)
    
    try {
      // In a real implementation, you would verify this code against what was sent
      // For demo purposes, we'll just check if it matches what we generated
      if (inputCode === verificationCode) {
        setIsAuthenticated(true)
        setAuthStep('role_selection')
        showAlert('Verification successful!')
      } else {
        setError('Invalid verification code. Please try again.')
      }
    } catch (error) {
      console.error('Error verifying code:', error)
      setError('An error occurred during verification. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleRoleSelection = async (role: UserRole) => {
    setIsLoading(true)
    setError(null)
    setSelectedRole(role)
    
    try {
      // Get the Telegram user
      const telegramUser = telegramUserData || getTelegramUser()
      
      if (!telegramUser) {
        setError('Telegram user not found. Please open this app from Telegram.')
        return
      }

      // Check if user already has a role
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', telegramUser.id)
        .single()

      if (profileError && profileError.code !== 'PGRST116') {
        // PGRST116 means "no rows returned" which is expected for new users
        throw new Error('Failed to fetch user profile')
      }

      if (profile?.role) {
        setError('You have already selected a role. Please contact support if you need to change it.')
        return
      }

      // Update user's role in the database
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ role })
        .eq('id', telegramUser.id)

      if (updateError) {
        throw new Error('Failed to update role')
      }

      // Find the selected role and navigate to its next step
      const selectedRole = roles.find(r => r.id === role)
      if (selectedRole) {
        router.push(selectedRole.nextStep)
        onRoleSelected?.()
      }
    } catch (error) {
      console.error('Error in role selection:', error)
      setError(error instanceof Error ? error.message : 'An unexpected error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-[#FF0099] pt-12 pb-16 px-4 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-3xl font-bold text-white mb-3">
            {authStep === 'initial' ? 'Telegram Verification' : 
             authStep === 'verification' ? 'Verify Your Code' : 
             'Choose Your Role'}
          </h1>
          <p className="text-white/90 text-lg">
            {authStep === 'initial' ? 'Verify your identity to continue' : 
             authStep === 'verification' ? 'Enter the verification code shown' : 
             'Select your role to begin your journey'}
          </p>
        </motion.div>
      </div>

      <div
        className="bg-white flex-1 rounded-t-3xl -mt-10 px-4 pt-6 pb-12 flex flex-col"
        style={{ backgroundColor: theme.bg_color }}
      >
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg"
          >
            {error}
          </motion.div>
        )}
        
        {authStep === 'initial' && (
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="my-6"
          >
            <TelegramLoginButton 
              onCodeReceived={handleCodeReceived} 
              isLoading={isLoading}
            />
          </motion.div>
        )}
        
        {authStep === 'verification' && (
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="my-6"
          >
            <VerificationCodeInput 
              onVerify={handleVerifyCode}
              isLoading={isLoading}
            />
          </motion.div>
        )}
        
        {authStep === 'role_selection' && (
          <div className="space-y-6">
            {roles.map((role, index) => (
              <motion.button
                key={role.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => handleRoleSelection(role.id as UserRole)}
                disabled={isLoading}
                className={`w-full p-5 rounded-xl border-2 hover:border-[#FF0099] transition-colors flex items-start gap-4 ${
                  isLoading ? 'opacity-50 cursor-not-allowed' : ''
                } ${selectedRole === role.id ? 'border-[#FF0099] bg-[#FF0099]/5' : 'border-gray-200'}`}
                style={{ backgroundColor: theme.bg_color }}
              >
                <div className={`p-4 rounded-lg ${role.color}`}>
                  {isLoading && selectedRole === role.id ? (
                    <Loader2 className="w-8 h-8 animate-spin" />
                  ) : (
                    <role.icon className="w-8 h-8" />
                  )}
                </div>
                <div className="text-left flex-1">
                  <h3 className="font-semibold text-lg mb-1" style={{ color: theme.text_color }}>
                    {role.title}
                  </h3>
                  <p className="text-base mb-3" style={{ color: theme.hint_color }}>
                    {role.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {role.steps.map((step, stepIndex) => (
                      <span
                        key={stepIndex}
                        className="text-sm px-3 py-1 rounded-full bg-gray-100"
                        style={{ color: theme.hint_color }}
                      >
                        {step}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
} 