'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { BookOpen, Star, Users, MapPin } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export default function StudentExperiencesPage() {
  const router = useRouter()
  
  const experiences = [
    {
      id: 1,
      title: 'Financial Literacy Quiz',
      description: 'Test your knowledge about personal finance and earn XP',
      category: 'Education',
      xp: 30,
      icon: <BookOpen className="h-6 w-6" />,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      id: 2,
      title: 'Community Garden Project',
      description: 'Join your local community in creating a sustainable garden',
      category: 'Community',
      xp: 50,
      icon: <Users className="h-6 w-6" />,
      color: 'bg-green-100 text-green-600'
    },
    {
      id: 3,
      title: 'Local History Tour',
      description: 'Explore and learn about your local area\'s history',
      category: 'Local',
      xp: 40,
      icon: <MapPin className="h-6 w-6" />,
      color: 'bg-purple-100 text-purple-600'
    }
  ]

  return (
    <div className="p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Student Experiences</h1>
        <Badge variant="outline" className="bg-[#FF0099]/10 text-[#FF0099]">
          <Star className="h-4 w-4 mr-1" />
          Level 5
        </Badge>
      </div>

      <div className="grid gap-4">
        {experiences.map((experience) => (
          <motion.div
            key={experience.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card className="p-4">
              <div className="flex gap-4">
                <div className={`p-3 rounded-lg ${experience.color}`}>
                  {experience.icon}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{experience.title}</h3>
                      <p className="text-sm text-gray-500">{experience.description}</p>
                    </div>
                    <Badge>+{experience.xp} XP</Badge>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <Badge variant="outline" className="bg-gray-50">
                      {experience.category}
                    </Badge>
                    <Button
                      size="sm"
                      onClick={() => router.push(`/experiences/student/${experience.id}`)}
                    >
                      Start Now
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
} 