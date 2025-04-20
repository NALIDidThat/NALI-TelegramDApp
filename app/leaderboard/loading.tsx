import { Skeleton } from "@/components/ui/skeleton"

export default function LeaderboardLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFECB3] to-[#FFD54F] pb-24">
      <div className="max-w-md mx-auto bg-white/80 min-h-screen rounded-t-3xl shadow-lg overflow-hidden backdrop-blur-sm">
        {/* Header Skeleton */}
        <div className="p-4 flex items-center justify-center relative">
          <Skeleton className="absolute left-2 h-6 w-6 rounded-full" />
          <Skeleton className="h-7 w-32" />
        </div>

        {/* Filters Skeleton */}
        <div className="px-4 mb-6">
          <Skeleton className="h-10 w-full rounded-full" />
        </div>

        {/* Top 3 Podium Skeleton */}
        <div className="px-4 mb-8">
          <div className="flex justify-between items-end">
            {/* 2nd Place */}
            <div className="flex flex-col items-center w-1/3">
              <Skeleton className="h-16 w-16 rounded-full" />
              <Skeleton className="h-3 w-16 mt-2" />
              <Skeleton className="h-3 w-12 mt-1" />
            </div>

            {/* 1st Place */}
            <div className="flex flex-col items-center w-1/3 -mt-4">
              <Skeleton className="h-20 w-20 rounded-full" />
              <Skeleton className="h-4 w-16 mt-2" />
              <Skeleton className="h-3 w-12 mt-1" />
            </div>

            {/* 3rd Place */}
            <div className="flex flex-col items-center w-1/3">
              <Skeleton className="h-16 w-16 rounded-full" />
              <Skeleton className="h-3 w-16 mt-2" />
              <Skeleton className="h-3 w-12 mt-1" />
            </div>
          </div>
        </div>

        {/* Leaderboard List Skeleton */}
        <div className="px-4 space-y-4">
          {[1, 2, 3, 4, 5, 6, 7].map((i) => (
            <div key={i} className="flex items-center">
              <Skeleton className="h-4 w-4 mr-2" />
              <Skeleton className="h-3 w-3 mr-1" />
              <Skeleton className="h-10 w-10 rounded-full mr-3" />
              <Skeleton className="h-4 w-24 flex-1" />
              <Skeleton className="h-4 w-16" />
            </div>
          ))}
        </div>

        {/* Your Rank Skeleton */}
        <div className="px-4 mt-8">
          <Skeleton className="h-12 w-full rounded-full" />
        </div>

        {/* Button Skeleton */}
        <div className="px-4 mt-8">
          <Skeleton className="h-10 w-full rounded-md" />
        </div>

        {/* Weekly Challenge Skeleton */}
        <div className="p-4 mt-4">
          <Skeleton className="h-32 w-full rounded-xl" />
        </div>
      </div>
    </div>
  )
}
