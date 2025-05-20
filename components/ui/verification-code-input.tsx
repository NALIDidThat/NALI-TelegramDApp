import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Loader2 } from 'lucide-react'

interface VerificationCodeInputProps {
  onVerify: (code: string) => void
  isLoading?: boolean
}

export function VerificationCodeInput({ onVerify, isLoading = false }: VerificationCodeInputProps) {
  const [code, setCode] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (code.length === 6) {
      onVerify(code)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="verification-code" className="block text-sm font-medium">
          Verification Code
        </label>
        <Input
          id="verification-code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter 6-digit code"
          className="w-full text-center text-lg tracking-widest"
          maxLength={6}
          pattern="[0-9]{6}"
          inputMode="numeric"
          required
          disabled={isLoading}
        />
      </div>
      <Button
        type="submit"
        className="w-full bg-[#FF0099] hover:bg-[#FF0099]/90 text-white font-medium text-lg py-6 rounded-full"
        disabled={isLoading || code.length !== 6}
      >
        {isLoading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin mr-2" />
            Verifying...
          </>
        ) : (
          "Verify Code"
        )}
      </Button>
    </form>
  )
} 