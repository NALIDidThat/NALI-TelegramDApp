"use client"

import { motion } from "framer-motion"
import { User, School, Building2 } from "lucide-react"

interface UserTypeScreenProps {
  theme: {
    bg_color: string
    text_color: string
    hint_color: string
    button_color: string
    button_text_color: string
  }
  onSelect: (userType: string) => void
}

export default function UserTypeScreen({ theme, onSelect }: UserTypeScreenProps) {
  const userTypes = [
    {
      id: "student",
      title: "Student",
      description: "Learn, grow, and earn rewards through educational experiences",
      icon: School,
    },
    {
      id: "local",
      title: "Local",
      description: "Connect with your community and discover local experiences",
      icon: User,
    },
    {
      id: "business",
      title: "Business",
      description: "Create and manage experiences for your community",
      icon: Building2,
    },
  ]

  return (
    <div className="flex flex-col h-full">
      <div className="bg-[#FF0099] h-1/3 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-2xl font-bold text-white mb-2">Choose Your Path</h1>
          <p className="text-white/80">Select your role to get started</p>
        </motion.div>
      </div>

      <div
        className="bg-white h-2/3 rounded-t-3xl -mt-6 p-6 flex flex-col"
        style={{ backgroundColor: theme.bg_color }}
      >
        <div className="space-y-4">
          {userTypes.map((type, index) => (
            <motion.button
              key={type.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => onSelect(type.id)}
              className="w-full p-4 rounded-xl border border-gray-200 hover:border-[#FF0099] transition-colors flex items-start gap-4"
              style={{ backgroundColor: theme.bg_color }}
            >
              <div className="bg-[#FF0099]/10 p-3 rounded-lg">
                <type.icon className="w-6 h-6 text-[#FF0099]" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold" style={{ color: theme.text_color }}>
                  {type.title}
                </h3>
                <p className="text-sm" style={{ color: theme.hint_color }}>
                  {type.description}
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  )
} 