import { PropertyDTO } from "@/_actions/client/actions"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { ContactDialog } from "./propertyContactDialog"

export default function PropertyCard({ property }: { property: PropertyDTO }) {

const images  = property.images? property.images.split(",") : [];

  return (
    <Card className="w-full max-w-[280px] mx-auto overflow-hidden mb-2">
            <div className="relative h-40">
              <Image
                src={images[0] || "placeholder-image.jpg"}
                width={300}
                height={160}
                alt={`صورة العقار`}
                className="w-full h-40 object-cover"
              />
            </div>
          <CardTitle className="text-xl font-bold text-white text-center px-2">
            {property.type}</CardTitle>
      <CardHeader className="p-3">
        <div className="flex justify-between items-start">
          <CardDescription className="mt-1 text-xs line-clamp-2">
            {property.description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 p-3">
        <div className="flex items-center space-x-1">
          <MapPin className="w-3 h-3 text-muted-foreground" />
          <span className="text-xs text-muted-foreground truncate">{property.address}</span>
        </div>
              <p className="font-medium"> السعر الإجمالي بالدرهم <span className="text-sm font-bold"> {property.price || 0}</span> </p>

        <div className="flex items-center space-x-1">
          <Users className="w-3 h-3 text-muted-foreground m-2" />
          <span className="text-xs text-muted-foreground">
            {property.numContributors} مساهم {property.numContributors !== 1 ? 'ين' : ''} مطلوبين
          </span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between gap-1 p-3 pt-0">
        <Button variant="outline" size="sm" className="w-full text-xs">
          <Link href={`/properties/${property.id}`}>
            اعرف المزيد
          </Link>
        </Button>
        <ContactDialog property={property} />
      </CardFooter>
    </Card>
  )
}
