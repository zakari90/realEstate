import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

export default function CardSkeleton() {
  return (
    <Card className="w-full max-w-[280px] mx-auto overflow-hidden">
      <div className="relative w-full h-[120px] bg-gradient-to-r from-gray-200 to-gray-300">
        <Skeleton className="absolute inset-0" />
      </div>
      <CardHeader className="p-3">
        <div className="flex justify-between items-start">
          <Skeleton className="h-4 w-3/4" />
          <Badge variant="secondary" className="text-xs">
            <Skeleton className="h-4 w-16" />
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 p-3">
        <div className="flex items-center space-x-2">
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-4 w-1/2" />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-4 w-1/6" />
          </div>
          <Skeleton className="h-2 w-full" />
        </div>
        <div className="grid grid-cols-2 gap-2">
          {[0, 1].map((index) => (
            <div key={index} className="flex items-center space-x-2">
              <Skeleton className="h-4 w-4 rounded-full" />
              <div className="space-y-1">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-4 w-20" />
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center space-x-2">
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between p-3 pt-0">
        <Button variant="outline" size="sm" className="w-full">
          <Skeleton className="h-4 w-20" />
        </Button>
        <Button size="sm" className="w-full ml-2">
          <Skeleton className="h-4 w-16" />
        </Button>
      </CardFooter>
    </Card>
  )
}