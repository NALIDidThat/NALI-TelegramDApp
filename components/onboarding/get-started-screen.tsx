import { Sparkles } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function GetStartedScreen() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-8 max-w-3xl mx-auto px-6">
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 rounded-full">
        <Sparkles className="w-16 h-16 text-yellow-300" />
      </div>
      <h2 className="text-2xl md:text-3xl font-bold text-center">Ready to Begin?</h2>
      <div className="bg-purple-800/30 p-6 rounded-lg w-full max-w-2xl">
        <div className="flex justify-between items-center mb-3">
          <p className="font-medium text-lg">Your first challenge:</p>
          <Badge variant="outline" className="bg-purple-700/50 text-base">
            +50 XP
          </Badge>
        </div>
        <p className="text-base text-gray-300">
          Complete a quick quiz about blockchain basics to earn your first XP points!
        </p>
      </div>
      <p className="text-base md:text-lg text-gray-300 text-center max-w-2xl">
        Start earning XP now and begin your journey in the NALI ecosystem. Your progress will be saved to your NALI ID.
      </p>
    </div>
  )
}
