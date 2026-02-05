import { PropertyDTO } from "@/_actions/client/actions"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowBigRight, MapPin, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { ContactDialog } from "./propertyContactDialog"
import { Separator } from "@radix-ui/react-select"

export default function PropertyCard({ property }: { property: PropertyDTO }) {

const images  = property.images? property.images.split(",") : [];

  return (
    <Card className="w-full max-w-[280px] mx-auto overflow-hidden mb-2">
            <div className="relative h-40">
            <Link href={`/properties/${property.id}`}>
              <Image
                src={images[0] || "/placeholder-image.jpg"}
                width={300}
                height={160}
                alt={`صورة العقار`}
                className="w-full h-40 object-cover"
              />
                <p className="font-medium absolute top-2 left-2 p-1 rounded-sm bg-slate-100"> <span className="text-sm font-bold"> {property.price || 0}</span> درهم </p>
            {/* <ArrowBigRight className="absolute top-4 right-4 text-white w-6 h-6" /> */}

              </Link>
            </div>
          <CardTitle className="text-xl font-bold text-black mr-4">
            {property.type}
          </CardTitle>
          <CardHeader className="hidden sm:block p-3">
            <CardDescription className="mt-1 text-xs line-clamp-2">
              {property.description}
            </CardDescription>
          </CardHeader>
        <CardContent className="hidden sm:block space-y-3 p-3">
        <div className="flex items-center space-x-1">
          <MapPin className="w-3 h-3 text-muted-foreground" />
          <span className="text-xs text-muted-foreground truncate">{property.address}</span>
        </div>
        {
          property.numContributors ? <div className="flex items-center space-x-1">
          <Users className="w-3 h-3 text-muted-foreground m-2" />
          <span className="text-xs text-muted-foreground">
            {property.numContributors} مساهم {property.numContributors !== 1 ? 'ين' : ''} مطلوبين
          </span>
        </div> : <Separator className="h-3"/>
        }
  
      </CardContent>
      <CardFooter className="flex justify-between gap-1 p-3 pt-2">
        <Button variant="outline" size="sm" className=" hidden sm:block w-full text-xs">
          <Link href={`/properties/${property.id}`}>
            اعرف المزيد
          </Link>
        </Button>
        <ContactDialog property={property} />
      </CardFooter>
    </Card>
  )
}
