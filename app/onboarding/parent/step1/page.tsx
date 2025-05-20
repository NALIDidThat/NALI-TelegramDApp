"use client"

import { useRouter } from "next/navigation"

export default function ParentStep1() {
  const router = useRouter()
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <h1 className="text-2xl font-bold mb-4 text-[#f20789]">Parent Onboarding: Step 1</h1>
      <p className="mb-8 text-gray-700 text-center">Welcome! Let's get started on your parent journey.</p>
      <button
        className="bg-[#f20789] text-white font-semibold px-8 py-3 rounded-full text-lg shadow-md hover:bg-[#FF0099] transition"
        onClick={() => router.push('/onboarding/parent/step2')}
      >
        Next
      </button>
    </div>
  )
} 