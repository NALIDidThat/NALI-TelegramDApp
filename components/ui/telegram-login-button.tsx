import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { showAlert } from '@/lib/telegram'
import { Loader2 } from 'lucide-react'

interface TelegramLoginButtonProps {
  onCodeReceived: (code: string) => void
  isLoading?: boolean
}

export function TelegramLoginButton({ onCodeReceived, isLoading = false }: TelegramLoginButtonProps) {
  const handleLogin = async () => {
    if (typeof window !== 'undefined' && window.Telegram) {
      try {
        // Get user data from Telegram Web App
        const user = window.Telegram.WebApp.initDataUnsafe?.user
        
        if (user) {
          // User is already authenticated with Telegram
          // Generate a verification code (in a real app, this would be sent via Bot API)
          const verificationCode = Math.floor(100000 + Math.random() * 900000).toString()
          
          // Show an alert with the code (simulating SMS or Telegram message)
          showAlert(`Your verification code is: ${verificationCode}`)
          
          // Pass the code to the parent component
          onCodeReceived(verificationCode)
        } else {
          // If user data is not available, show error
          showAlert('Unable to get user data from Telegram. Please ensure you opened this app from Telegram.')
        }
      } catch (error) {
        console.error('Error during Telegram login:', error)
        showAlert('Failed to authenticate with Telegram. Please try again.')
      }
    } else {
      showAlert('Telegram Web App is not available. Please open this app from Telegram.')
    }
  }

  return (
    <Button
      onClick={handleLogin}
      className="w-full bg-[#0088cc] hover:bg-[#0088cc]/90 text-white font-medium text-lg py-6 rounded-full flex items-center justify-center"
      disabled={isLoading}
    >
      {isLoading ? (
        <Loader2 className="h-5 w-5 animate-spin mr-2" />
      ) : (
        <svg
          className="h-5 w-5 mr-2"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21.2 7.78l-10.94 9.73a1.4 1.4 0 0 1-1.97 0l-4.9-4.36a1 1 0 0 1 0-1.48l1.12-1a1 1 0 0 1 1.32 0l2.5 2.21 8.59-7.65a1 1 0 0 1 1.32 0l1.12 1a1 1 0 0 1 0 1.48l-.16.07Z" />
        </svg>
      )}
      {isLoading ? "Verifying..." : "Verify with Telegram"}
    </Button>
  )
} 