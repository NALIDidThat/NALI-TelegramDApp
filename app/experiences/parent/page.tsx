'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { BookOpen, Star, Users, MapPin, User } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export default function ParentExperiencesPage() {
  const router = useRouter()
  
  const children = [
    {
      id: 1,
      name: 'Alex',
      grade: '5th Grade',
      experiences: [
        {
          id: 1,
          title: 'Financial Literacy Quiz',
          status: 'In Progress',
          progress: 60,
          dueDate: '2024-03-20'
        },
        {
          id: 2,
          title: 'Community Garden Project',
          status: 'Not Started',
          progress: 0,
          dueDate: '2024-03-25'
        }
      ]
    },
    {
      id: 2,
      name: 'Sarah',
      grade: '3rd Grade',
      experiences: [
        {
          id: 3,
          title: 'Local History Tour',
          status: 'Completed',
          progress: 100,
          dueDate: '2024-03-15'
        }
      ]
    }
  ]

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold">Children's Experiences</h1>

      <div className="space-y-8">
        {children.map((child) => (
          <div key={child.id} className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-[#FF0099]/10 p-2 rounded-full">
                <User className="h-6 w-6 text-[#FF0099]" />
              </div>
              <div>
                <h2 className="font-semibold">{child.name}</h2>
                <p className="text-sm text-gray-500">{child.grade}</p>
              </div>
            </div>

            <div className="grid gap-4">
              {child.experiences.map((experience) => (
                <motion.div
                  key={experience.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card className="p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold">{experience.title}</h3>
                        <p className="text-sm text-gray-500">Due: {experience.dueDate}</p>
                      </div>
                      <Badge
                        variant="outline"
                        className={
                          experience.status === 'Completed'
                            ? 'bg-green-100 text-green-600'
                            : experience.status === 'In Progress'
                            ? 'bg-blue-100 text-blue-600'
                            : 'bg-gray-100 text-gray-600'
                        }
                      >
                        {experience.status}
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{experience.progress}%</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#FF0099] rounded-full"
                          style={{ width: `${experience.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="mt-4 flex justify-end">
                      <Button
                        size="sm"
                        onClick={() => router.push(`/experiences/parent/${child.id}/${experience.id}`)}
                      >
                        View Details
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 