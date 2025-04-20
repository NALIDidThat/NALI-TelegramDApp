"use client"

import { motion } from "framer-motion"
import { Zap } from "lucide-react"

interface WelcomeScreenProps {
  theme: {
    bg_color: string
    text_color: string
    hint_color: string
    button_color: string
    button_text_color: string
  }
}

export default function WelcomeScreen({ theme }: WelcomeScreenProps) {
  return (
    <div className="flex flex-col h-full bg-[#FF0099] text-white p-6">
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="bg-white/20 w-24 h-24 rounded-full flex items-center justify-center mx-auto">
            <Zap className="w-12 h-12" />
          </div>
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-3xl font-bold mb-4"
        >
          Welcome to NALI
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-lg max-w-xs"
        >
          Your personal journey to growth and community impact starts here
        </motion.p>
      </div>
    </div>
  )
}
