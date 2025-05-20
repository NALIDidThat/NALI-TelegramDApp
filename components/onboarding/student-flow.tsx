"use client"

import { motion } from "framer-motion"
import { School, Users, User, CheckCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

interface StudentFlowProps {
  theme: {
    bg_color: string
    text_color: string
    hint_color: string
    button_color: string
    button_text_color: string
  }
}

const steps = [
  {
    id: "school",
    title: "Select Your School",
    description: "Choose your school from our network of educational institutions",
    icon: School,
    path: "/onboarding/student/school"
  },
  {
    id: "class",
    title: "Choose Your Class",
    description: "Select your class to connect with your peers and teachers",
    icon: Users,
    path: "/onboarding/student/class"
  },
  {
    id: "parent",
    title: "Connect with Parent",
    description: "Link your account with your parent for supervision and support",
    icon: User,
    path: "/onboarding/student/parent"
  },
  {
    id: "complete",
    title: "Complete Profile",
    description: "Finalize your profile to start your learning journey",
    icon: CheckCircle,
    path: "/dashboard"
  }
]

export default function StudentFlow({ theme }: StudentFlowProps) {
  const router = useRouter()

  const handleStepClick = async (step: typeof steps[0]) => {
    // Check if user is authenticated
    const { data: { session } } = await supabase.auth.getSession()
    if (!session?.user) {
      router.push('/auth/signin')
      return
    }

    // Navigate to the step's path
    router.push(step.path)
  }

  return (
    <div className="flex flex-col h-full">
      <div className="bg-[#FF0099] h-1/3 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-2xl font-bold text-white mb-2">Student Onboarding</h1>
          <p className="text-white/80">Complete these steps to get started</p>
        </motion.div>
      </div>

      <div
        className="bg-white h-2/3 rounded-t-3xl -mt-6 p-6 flex flex-col"
        style={{ backgroundColor: theme.bg_color }}
      >
        <div className="space-y-4">
          {steps.map((step, index) => (
            <motion.button
              key={step.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => handleStepClick(step)}
              className="w-full p-4 rounded-xl border border-gray-200 hover:border-[#FF0099] transition-colors flex items-start gap-4"
              style={{ backgroundColor: theme.bg_color }}
            >
              <div className="p-3 rounded-lg bg-blue-500/10 text-blue-500">
                <step.icon className="w-6 h-6" />
              </div>
              <div className="text-left flex-1">
                <h3 className="font-semibold" style={{ color: theme.text_color }}>
                  {step.title}
                </h3>
                <p className="text-sm" style={{ color: theme.hint_color }}>
                  {step.description}
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  )
} 