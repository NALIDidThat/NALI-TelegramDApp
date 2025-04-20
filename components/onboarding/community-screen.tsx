import { Calendar, MessageSquare, Briefcase, UserPlus } from "lucide-react"

export default function CommunityScreen() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-8 max-w-4xl mx-auto px-6">
      <h2 className="text-2xl md:text-3xl font-bold text-center">Community & Growth</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full">
        <div className="flex flex-col items-center gap-3 p-4 bg-indigo-800/30 rounded-lg">
          <Calendar className="w-10 h-10 text-indigo-400" />
          <p className="text-sm md:text-base text-center">Events & RSVPs</p>
        </div>

        <div className="flex flex-col items-center gap-3 p-4 bg-indigo-800/30 rounded-lg">
          <MessageSquare className="w-10 h-10 text-indigo-400" />
          <p className="text-sm md:text-base text-center">Mentorship Forum</p>
        </div>

        <div className="flex flex-col items-center gap-3 p-4 bg-indigo-800/30 rounded-lg">
          <Briefcase className="w-10 h-10 text-indigo-400" />
          <p className="text-sm md:text-base text-center">Micro-Tasks</p>
        </div>

        <div className="flex flex-col items-center gap-3 p-4 bg-indigo-800/30 rounded-lg">
          <UserPlus className="w-10 h-10 text-indigo-400" />
          <p className="text-sm md:text-base text-center">NALI ID</p>
        </div>
      </div>
      <p className="text-base md:text-lg text-gray-300 text-center max-w-2xl">
        Connect, learn, and grow with the NALI community while earning XP for your contributions
      </p>
    </div>
  )
}
