"use client"

import { motion } from "framer-motion"

interface WelcomeScreenProps {
  theme: {
    bg_color: string
    text_color: string
    hint_color: string
    button_color: string
    button_text_color: string
  }
  onGetStarted?: () => void
}

export default function WelcomeScreen({ theme, onGetStarted }: WelcomeScreenProps) {
  return (
    <div className="flex flex-col min-h-screen w-full" style={{ background: '#f20789' }}>
      {/* Illustration */}
      <div className="flex flex-col items-center justify-center pt-16 pb-8">
        {/* Onboarding illustration image */}
        <img
          src="/images/rocket-illustration-v2.png"
          alt="Rocket launching from phone - NALI onboarding"
          className="w-48 h-48 object-contain mb-2"
        />
      </div>
      {/* Headings */}
      <div className="flex flex-col items-center justify-center px-6 text-center">
        <h1 className="text-2xl md:text-3xl font-extrabold text-white mb-4" style={{ letterSpacing: '-0.5px' }}>
          Welcome to the NALI App
        </h1>
        <p className="text-base md:text-lg text-white mb-8 max-w-md">
          Explore different journeys, designed to enhance the quality of your personal/professional life.
        </p>
      </div>
      {/* Spacer to push button to bottom */}
      <div className="flex-1" />
      {/* Get started button */}
      <div className="w-full flex justify-center px-4 pb-8">
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          onClick={onGetStarted}
          className="w-full max-w-xl py-4 rounded-2xl text-lg md:text-xl font-bold bg-white text-black shadow-md"
          style={{ boxShadow: '0 4px 14px rgba(0,0,0,0.10)' }}
        >
          Get started
        </motion.button>
      </div>
    </div>
  )
}
