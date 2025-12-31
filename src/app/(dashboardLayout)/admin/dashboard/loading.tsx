
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="p-6 space-y-8">
      {/* Analytics Cards Skeleton */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="overflow-hidden border-none shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-4 w-[100px]" />
              <Skeleton className="h-4 w-4 rounded-full" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-[60px] mb-2" />
              <Skeleton className="h-3 w-[120px]" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Skeleton Section */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 border-none shadow-sm">
          <CardHeader>
            <Skeleton className="h-5 w-[180px] mb-2" />
            <Skeleton className="h-4 w-[250px]" />
          </CardHeader>
          <CardContent className="h-[350px] pt-4">
            <Skeleton className="h-full w-full rounded-xl" />
          </CardContent>
        </Card>

        <Card className="col-span-3 border-none shadow-sm">
          <CardHeader className="items-center">
            <Skeleton className="h-5 w-[150px] mb-2" />
            <Skeleton className="h-4 w-[200px]" />
          </CardHeader>
          <CardContent className="h-[350px] flex items-center justify-center">
            <Skeleton className="h-[220px] w-[220px] rounded-full" />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}