"use client"

import { motion } from "framer-motion"
import { User } from "lucide-react"
import { useState } from "react"
import { useForm, type SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

const nameSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  age: z.number().min(13, "You must be at least 13 years old").max(120, "Please enter a valid age"),
  location: z.string().min(2, "Please enter a valid location"),
  userType: z.enum(["student", "teacher", "parent", "other"], {
    required_error: "Please select your role",
  }),
})

type NameFormData = z.infer<typeof nameSchema>

interface NameRegistryScreenProps {
  theme: {
    bg_color: string
    text_color: string
    hint_color: string
    button_color: string
    button_text_color: string
  }
  onNameSubmit: (data: NameFormData) => void
}

export default function NameRegistryScreen({ theme, onNameSubmit }: NameRegistryScreenProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NameFormData>({
    resolver: zodResolver(nameSchema),
  })

  const onSubmit: SubmitHandler<NameFormData> = async (data) => {
    setIsSubmitting(true)
    try {
      // Store the user data in localStorage
      localStorage.setItem("userData", JSON.stringify(data))
      onNameSubmit(data)
    } catch (error) {
      console.error("Error saving user data:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="bg-[#FF0099] h-1/3 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white/20 w-24 h-24 rounded-full flex items-center justify-center"
        >
          <User className="w-12 h-12 text-white" />
        </motion.div>
      </div>

      <div
        className="bg-white h-2/3 rounded-t-3xl -mt-6 p-6 flex flex-col overflow-y-auto"
        style={{ backgroundColor: theme.bg_color }}
      >
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold mb-4"
          style={{ color: theme.text_color }}
        >
          Tell Us About Yourself
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-base mb-6"
          style={{ color: theme.hint_color }}
        >
          Let's personalize your NALI experience
        </motion.p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              {...register("firstName")}
              type="text"
              placeholder="First Name"
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FF0099]"
              style={{ backgroundColor: theme.bg_color, color: theme.text_color }}
            />
            {errors.firstName?.message && (
              <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
            )}
          </div>

          <div>
            <input
              {...register("lastName")}
              type="text"
              placeholder="Last Name"
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FF0099]"
              style={{ backgroundColor: theme.bg_color, color: theme.text_color }}
            />
            {errors.lastName?.message && (
              <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
            )}
          </div>

          <div>
            <input
              {...register("age", { valueAsNumber: true })}
              type="number"
              placeholder="Age"
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FF0099]"
              style={{ backgroundColor: theme.bg_color, color: theme.text_color }}
            />
            {errors.age?.message && (
              <p className="text-red-500 text-sm mt-1">{errors.age.message}</p>
            )}
          </div>

          <div>
            <input
              {...register("location")}
              type="text"
              placeholder="Location (City, Country)"
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FF0099]"
              style={{ backgroundColor: theme.bg_color, color: theme.text_color }}
            />
            {errors.location?.message && (
              <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>
            )}
          </div>

          <div>
            <select
              {...register("userType")}
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FF0099]"
              style={{ backgroundColor: theme.bg_color, color: theme.text_color }}
            >
              <option value="">Select your role</option>
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="parent">Parent</option>
              <option value="other">Other</option>
            </select>
            {errors.userType?.message && (
              <p className="text-red-500 text-sm mt-1">{errors.userType.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 px-4 rounded-lg font-medium transition-opacity"
            style={{
              backgroundColor: theme.button_color,
              color: theme.button_text_color,
              opacity: isSubmitting ? 0.7 : 1,
            }}
          >
            {isSubmitting ? "Saving..." : "Continue"}
          </button>
        </form>
      </div>
    </div>
  )
} 