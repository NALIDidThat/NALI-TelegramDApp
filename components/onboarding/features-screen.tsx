import { BookOpen, Award, Users } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function FeaturesScreen() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-8 max-w-4xl mx-auto px-6">
      <h2 className="text-2xl md:text-3xl font-bold text-center">Key Features</h2>
      <div className="grid md:grid-cols-3 gap-6 w-full">
        <Card className="bg-purple-800/30 border-purple-700/50">
          <CardContent className="p-6 flex flex-col md:items-center gap-4">
            <BookOpen className="w-8 h-8 text-purple-400" />
            <div className="md:text-center">
              <h3 className="font-medium text-lg mb-2">Gamified Learning</h3>
              <p className="text-sm text-gray-300">Timed quizzes and challenges that reward XP</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-purple-800/30 border-purple-700/50">
          <CardContent className="p-6 flex flex-col md:items-center gap-4">
            <Award className="w-8 h-8 text-purple-400" />
            <div className="md:text-center">
              <h3 className="font-medium text-lg mb-2">Leaderboards & Ranks</h3>
              <p className="text-sm text-gray-300">Compete with others and climb the ranks</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-purple-800/30 border-purple-700/50">
          <CardContent className="p-6 flex flex-col md:items-center gap-4">
            <Users className="w-8 h-8 text-purple-400" />
            <div className="md:text-center">
              <h3 className="font-medium text-lg mb-2">Community Impact</h3>
              <p className="text-sm text-gray-300">Earn more XP through real-world engagement</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
