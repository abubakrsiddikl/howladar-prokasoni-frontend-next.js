import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="p-6 space-y-6">
      {/* 1. Welcome Banner Skeleton */}
      <div className="flex justify-between items-center border-b pb-4">
        <Skeleton className="h-10 w-[250px]" /> {/* Welcome text */}
      </div>

      {/* 2. Overview Card Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card 1 Skeleton: Active Orders (Blue background match) */}
        <Card className="bg-blue-50/50 border-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-5 w-5 rounded-md" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-10 mb-2" />
            <Skeleton className="h-3 w-[120px]" />
          </CardContent>
        </Card>

        {/* Card 2 & 3 Skeleton: Total Orders & Lifetime Spend */}
        {Array.from({ length: 2 }).map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-4 w-[100px]" />
              <Skeleton className="h-5 w-5 rounded-md" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-[60px] mb-2" />
              <Skeleton className="h-3 w-[120px]" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 3. Detailed Tracking Card Skeleton */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
             <Skeleton className="w-6 h-6 rounded-md" /> {/* Icon */}
             <Skeleton className="h-6 w-[180px]" /> {/* Title */}
          </div>
          <Skeleton className="h-4 w-[140px]" /> {/* Order ID */}
        </CardHeader>
        <CardContent className="flex justify-between items-center">
          <div className="space-y-2">
            <Skeleton className="h-7 w-[150px]" /> {/* Status Text */}
            <Skeleton className="h-4 w-[200px]" /> {/* Subtext */}
          </div>
          <Skeleton className="h-10 w-[140px] rounded-md" /> {/* Button */}
        </CardContent>
      </Card>
    </div>
  )
}