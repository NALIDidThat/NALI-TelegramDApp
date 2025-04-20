"use client"

import { motion } from "framer-motion"
import { Compass } from "lucide-react"

interface ControlScreenProps {
  theme: {
    bg_color: string
    text_color: string
    hint_color: string
    button_color: string
    button_text_color: string
  }
}

export default function ControlScreen({ theme }: ControlScreenProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="bg-[#FF0099] h-1/2 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0, rotate: -5 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/20 w-24 h-24 rounded-full flex items-center justify-center"
        >
          <Compass className="w-12 h-12 text-white" />
        </motion.div>
      </div>

      <div
        className="bg-white h-1/2 rounded-t-3xl -mt-6 p-6 flex flex-col justify-center"
        style={{ backgroundColor: theme.bg_color }}
      >
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold mb-4"
          style={{ color: theme.text_color }}
        >
          Explore Your Local Hub
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-base"
          style={{ color: theme.hint_color }}
        >
          Discover experiences at local businesses, schools, libraries, and community centers to earn XP and make an
          impact.
        </motion.p>
      </div>
    </div>
  )
}
