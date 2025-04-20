"use client"

import { motion } from "framer-motion"
import { Map } from "lucide-react"

interface JourneysScreenProps {
  theme: {
    bg_color: string
    text_color: string
    hint_color: string
    button_color: string
    button_text_color: string
  }
}

export default function JourneysScreen({ theme }: JourneysScreenProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="bg-[#FF0099] h-1/2 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0, rotate: 10 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/20 w-24 h-24 rounded-full flex items-center justify-center"
        >
          <Map className="w-12 h-12 text-white" />
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
          Personal Development Journeys
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-base"
          style={{ color: theme.hint_color }}
        >
          Follow guided paths to develop new skills, connect with your community, and achieve your personal goals.
        </motion.p>
      </div>
    </div>
  )
}
