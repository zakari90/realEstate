import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { MapPin, Users, DollarSign, Target } from "lucide-react"
import Link from "next/link"

export interface PropertyInvestmentCardProps {
  id: string
  title: string
  description: string
  price: number | undefined
  contribution: number | undefined
  numContributors: number
  location: string
  purpose: string
  currentContribution: number
}

export default function PropertyInvestmentCard({
  id,
  title,
  description,
  price,
  contribution,
  numContributors,
  location,
  purpose,
  currentContribution
}: PropertyInvestmentCardProps) {
  const progressPercentage = price ? (currentContribution / price) * 100 : 0

  const capitalizedPurpose = purpose 
    ? purpose.charAt(0).toUpperCase() + purpose.slice(1) 
    : 'Not specified'

  const formatCurrency = (value: number | undefined) => {
    return value !== undefined ? value.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) : 'N/A'
  }

  const getBackgroundColor = (price: number | undefined) => {
    if (price === undefined) return 'from-blue-500 to-purple-500'
    if (price > 1000000) return 'from-red-300 to-red-500'
    if (price > 500000) return 'from-green-300 to-green-500'
    if (price > 100000) return 'from-yellow-300 to-yellow-500'
    return 'from-blue-500 to-purple-500'
  }

  const backgroundColorClass = getBackgroundColor(price)

  return (
    <Card className="w-full max-w-[280px] mx-auto overflow-hidden">
      <div className={`relative w-full h-[120px] bg-gradient-to-r ${backgroundColorClass} overflow-hidden`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <CardTitle className="text-xl font-bold text-white text-center px-2">{title}</CardTitle>
        </div>
      </div>
      <CardHeader className="p-3">
        <div className="flex justify-between items-start">
          <CardDescription className="mt-1 text-xs line-clamp-2">{description}</CardDescription>
          <Badge variant="secondary" className="text-xs">
            {capitalizedPurpose}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 p-3">
        <div className="flex items-center space-x-1">
          <MapPin className="w-3 h-3 text-muted-foreground" />
          <span className="text-xs text-muted-foreground truncate">{location}</span>
        </div>
        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <span className="text-xs font-medium">Investment Progress</span>
            <span className="text-xs font-medium">{progressPercentage.toFixed(0)}%</span>
          </div>
          <Progress value={progressPercentage} className="w-full h-2" />
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center space-x-1">
            <DollarSign className="w-3 h-3 text-muted-foreground" />
            <div>
              <p className="font-medium">Total Price</p>
              <p className="text-sm font-bold">{formatCurrency(price)}</p>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Target className="w-3 h-3 text-muted-foreground" />
            <div>
              <p className="font-medium">Goal</p>
              <p className="text-sm font-bold">{formatCurrency(contribution)}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <Users className="w-3 h-3 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">
            {numContributors} contributor{numContributors !== 1 ? 's' : ''} needed
          </span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between p-3 pt-0">
        <Button variant="outline" size="sm" className="w-full text-xs">
        <Link href={`/investors/${id}`}>
          Learn More
        </Link>
        </Button>
        <Button size="sm" className="w-full ml-2 text-xs">
          Invest Now
        </Button>
      </CardFooter>
    </Card>
  )
}

// function name() {
//   return(
//     <Card className="w-full max-w-[300px] mx-auto overflow-hidden">
//     <div className={`relative w-full h-[150px] bg-gradient-to-r ${backgroundColorClass} overflow-hidden`}>
//       <div className="absolute inset-0 flex items-center justify-center">
//         <CardTitle className="text-xl font-bold text-white text-center px-2">{title}</CardTitle>
//       </div>
//     </div>
//     <CardHeader className="p-3">
//       <div className="flex justify-between items-start">
//         <CardDescription className="text-xs mt-1 line-clamp-2">{description}</CardDescription>
//         <Badge variant="secondary" className="text-xs">
//           {capitalizedPurpose}
//         </Badge>
//       </div>
//     </CardHeader>
//     <CardContent className="space-y-3 p-3">
//       <div className="flex items-center space-x-1">
//         <MapPin className="w-3 h-3 text-muted-foreground" />
//         <span className="text-xs text-muted-foreground truncate">{location}</span>
//       </div>
//       <div className="space-y-1">
//         <div className="flex justify-between items-center">
//           <span className="text-xs font-medium">Investment Progress</span>
//           <span className="text-xs font-medium">{progressPercentage.toFixed(0)}%</span>
//         </div>
//         <Progress value={progressPercentage} className="w-full h-2" />
//       </div>
//       <div className="grid grid-cols-2 gap-2 text-xs">
//         <div className="flex items-center space-x-1">
//           <DollarSign className="w-3 h-3 text-muted-foreground" />
//           <div>
//             <p className="font-medium">Total Price</p>
//             <p className="text-sm font-bold">{formatCurrency(price)}</p>
//           </div>
//         </div>
//         <div className="flex items-center space-x-1">
//           <Target className="w-3 h-3 text-muted-foreground" />
//           <div>
//             <p className="font-medium">Goal</p>
//             <p className="text-sm font-bold">{formatCurrency(contribution)}</p>
//           </div>
//         </div>
//       </div>
//       <div className="flex items-center space-x-1">
//         <Users className="w-3 h-3 text-muted-foreground" />
//         <span className="text-xs text-muted-foreground">
//           {numContributors} contributor{numContributors !== 1 ? 's' : ''} needed
//         </span>
//       </div>
//     </CardContent>
//     <CardFooter className="flex justify-between p-3 pt-0">
//       <Button variant="outline" size="sm" className="w-full text-xs">
//         Learn More
//       </Button>
//       <Button size="sm" className="w-full ml-2 text-xs">
//         Invest Now
//       </Button>
//     </CardFooter>
//   </Card>
//   )
// }