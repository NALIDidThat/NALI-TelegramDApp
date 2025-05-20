'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { BookOpen, Star, Users, MapPin, Plus, Building2 } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export default function HubManagerExperiencesPage() {
  const router = useRouter()
  
  const experiences = [
    {
      id: 1,
      title: 'Digital Skills Workshop',
      description: 'Basic computer skills training for the community',
      location: 'Main Learning Center',
      participants: 15,
      capacity: 20,
      status: 'Active',
      startDate: '2024-03-20',
      icon: <BookOpen className="h-6 w-6" />,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      id: 2,
      title: 'Community Garden Project',
      description: 'Sustainable gardening workshop series',
      location: 'Community Center',
      participants: 25,
      capacity: 30,
      status: 'Upcoming',
      startDate: '2024-03-25',
      icon: <Users className="h-6 w-6" />,
      color: 'bg-green-100 text-green-600'
    },
    {
      id: 3,
      title: 'Local Heritage Tour',
      description: 'Guided tour of historical landmarks',
      location: 'City Center',
      participants: 18,
      capacity: 25,
      status: 'Planning',
      startDate: '2024-04-01',
      icon: <MapPin className="h-6 w-6" />,
      color: 'bg-purple-100 text-purple-600'
    }
  ]

  return (
    <div className="p-4 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Hub Experiences</h1>
          <p className="text-sm text-gray-500">Manage your learning center's experiences</p>
        </div>
        <Button onClick={() => router.push('/experiences/hub/create')}>
          <Plus className="h-4 w-4 mr-2" />
          Create Experience
        </Button>
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
                      <div className="flex items-center gap-2 mt-1">
                        <Building2 className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-500">{experience.location}</span>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className={
                        experience.status === 'Active'
                          ? 'bg-green-100 text-green-600'
                          : experience.status === 'Upcoming'
                          ? 'bg-blue-100 text-blue-600'
                          : 'bg-gray-100 text-gray-600'
                      }
                    >
                      {experience.status}
                    </Badge>
                  </div>
                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Participants</span>
                      <span>{experience.participants}/{experience.capacity}</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#FF0099] rounded-full"
                        style={{ width: `${(experience.participants / experience.capacity) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <div className="text-sm text-gray-500">
                      Starts: {experience.startDate}
                    </div>
                    <Button
                      size="sm"
                      onClick={() => router.push(`/experiences/hub/${experience.id}`)}
                    >
                      Manage
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