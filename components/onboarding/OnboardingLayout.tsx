import { ReactNode } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

interface OnboardingLayoutProps {
  children: ReactNode
  title: string
  description: string
  currentStep: number
  totalSteps: number
}

export function OnboardingLayout({
  children,
  title,
  description,
  currentStep,
  totalSteps
}: OnboardingLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">{title}</CardTitle>
          <p className="text-sm text-gray-500 text-center mt-2">{description}</p>
          <div className="mt-4">
            <Progress value={(currentStep / totalSteps) * 100} className="h-2" />
            <p className="text-xs text-gray-500 text-center mt-2">
              Step {currentStep} of {totalSteps}
            </p>
          </div>
        </CardHeader>
        <CardContent>
          {children}
        </CardContent>
      </Card>
    </div>
  )
} 