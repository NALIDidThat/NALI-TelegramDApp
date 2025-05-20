"use client"

import { useRouter } from "next/navigation"

export default function StudentOnboardingScreen8() {
  const router = useRouter()
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f20789] px-4 text-white">
      <h1 className="text-3xl font-extrabold mb-4 text-center">[Screen 8 Title]</h1>
      <p className="mb-8 text-lg text-center">[Screen 8 content goes here. Replace with actual onboarding step details.]</p>
      <button
        className="bg-white text-[#f20789] font-bold px-8 py-4 rounded-full text-lg shadow-md hover:bg-gray-100 transition"
        onClick={() => router.push('/onboarding/student/flow/screen9')}
      >
        Next
      </button>
    </div>
  )
} 