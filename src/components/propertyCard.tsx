import { PropertyDTO } from "@/_actions/client/actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { MapPin, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ContactDialog } from "./propertyContactDialog";

export default function PropertyCard({ property }: { property: PropertyDTO }) {
  const images = property.images ? property.images.split(",") : [];

  return (
    <Card className="w-full max-w-[280px] mx-auto overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-card/50 border-none">
      <div className="relative h-44 overflow-hidden group">
        <Link href={`/properties/${property.id}`}>
          <Image
            src={images[0] || "/placeholder-image.jpg"}
            width={300}
            height={176}
            alt={`صورة العقار`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-2 py-1 rounded-md shadow-sm">
            <p className="text-sm font-bold text-teal-700">
              {new Intl.NumberFormat("ar-MA").format(property.price || 0)}{" "}
              <span className="text-[10px] font-medium text-gray-500">
                درهم
              </span>
            </p>
          </div>
        </Link>
      </div>

      <div className="p-4 space-y-3">
        <CardTitle className="text-lg font-bold text-gray-900 line-clamp-1">
          {property.type}
        </CardTitle>

        <CardDescription className="text-xs line-clamp-2 leading-relaxed text-wrap">
          {property.description}
        </CardDescription>

        <div className="flex flex-col gap-2 pt-2 border-t border-border/50">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <MapPin className="w-3.5 h-3.5" />
            <span className="text-xs truncate">{property.address}</span>
          </div>

          {property.numContributors && (
            <div className="flex items-center gap-1.5 text-teal-600 bg-teal-50 px-2 py-1 rounded-md w-fit">
              <Users className="w-3.5 h-3.5" />
              <span className="text-[11px] font-semibold whitespace-nowrap">
                {property.numContributors}{" "}
                {property.numContributors === 1
                  ? "مساهم مطلوب"
                  : "مساهمين مطلوبين"}
              </span>
            </div>
          )}
        </div>
      </div>

      <CardFooter className="flex gap-2 p-4 pt-0">
        <Button
          asChild
          variant="outline"
          size="sm"
          className="flex-1 text-xs hover:bg-teal-50 hover:text-teal-700 transition-colors"
        >
          <Link href={`/properties/${property.id}`}>تفاصيل</Link>
        </Button>
        <ContactDialog property={property} />
      </CardFooter>
    </Card>
  );
}
