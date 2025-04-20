import { Star, ArrowUp } from "lucide-react"

export default function XpExplanationScreen() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-6 max-w-3xl mx-auto px-6">
      <div className="bg-indigo-700/30 p-6 rounded-full">
        <Star className="w-16 h-16 text-yellow-400" />
      </div>
      <h2 className="text-2xl md:text-3xl font-bold text-center">Introducing NALI XP</h2>
      <div className="space-y-6 w-full max-w-2xl">
        <div className="flex items-start gap-4">
          <ArrowUp className="w-6 h-6 mt-1 text-green-400" />
          <p className="text-base md:text-lg">
            <span className="font-semibold">Earn XP</span> by completing quizzes, challenges, and community activities
          </p>
        </div>
        <div className="flex items-start gap-4">
          <ArrowUp className="w-6 h-6 mt-1 text-green-400" />
          <p className="text-base md:text-lg">
            <span className="font-semibold">Track your progress</span> and compare with others on the leaderboard
          </p>
        </div>
        <div className="flex items-start gap-4">
          <ArrowUp className="w-6 h-6 mt-1 text-green-400" />
          <p className="text-base md:text-lg">
            <span className="font-semibold">Redeem your XP</span> for $NALI tokens and exclusive benefits
          </p>
        </div>
      </div>
    </div>
  )
}
