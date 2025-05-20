"use client"

import { useRouter } from "next/navigation"
import { School, User, Users, Building2 } from "lucide-react"

const roles = [
  {
    id: "student",
    title: "Student",
    description: "Join as a student to participate in experiences and earn rewards",
    icon: School,
    color: "bg-blue-100 text-blue-600",
    nextStep: "/onboarding/student/flow/screen1"
  },
  {
    id: "teacher",
    title: "Teacher",
    description: "Join as a teacher to manage classes and track student progress",
    icon: User,
    color: "bg-green-100 text-green-600",
    nextStep: "/onboarding/teacher/step1"
  },
  {
    id: "parent",
    title: "Parent",
    description: "Join as a parent to monitor your child's progress and achievements",
    icon: Users,
    color: "bg-purple-100 text-purple-600",
    nextStep: "/onboarding/parent/step1"
  },
  {
    id: "hub_manager",
    title: "Hub Manager",
    description: "Join as a hub manager to oversee local learning centers",
    icon: Building2,
    color: "bg-orange-100 text-orange-600",
    nextStep: "/onboarding/hub-manager/step1"
  }
]

export default function RolePicker() {
  const router = useRouter()
  return (
    <div className="w-full max-w-md mx-auto mt-8 mb-12">
      <h2 className="text-2xl font-bold text-center mb-6 text-[#f20789]">Choose your role</h2>
      <div className="grid gap-4">
        {roles.map((role) => (
          <button
            key={role.id}
            onClick={() => router.push(role.nextStep)}
            className={`flex items-center gap-4 p-5 rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#f20789]`}
          >
            <span className={`p-3 rounded-lg ${role.color} text-2xl flex items-center justify-center`}>
              <role.icon className="w-7 h-7" />
            </span>
            <div className="text-left flex-1">
              <div className="font-semibold text-lg text-[#222]">{role.title}</div>
              <div className="text-sm text-gray-500">{role.description}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
} 