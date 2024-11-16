"use client";
import { PropertyDTO } from "@/_actions/client/actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import { Bath, Bed, ChevronLeft, ChevronRight, Home, MapPin, MapPinIcon, Maximize } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from "react";
import { ContactDialog } from "./contactDialog";


export function PropertyCard({ property }: { property: PropertyDTO }) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const images = property.images ? property.images.split(",") : [];

  return (
<Card className="w-full max-w-[300px] mx-auto overflow-hidden">
      <div className="relative h-40">
        <Carousel setApi={setApi} className="w-full">
          <CarouselContent>
            {images.length > 0 ? (
              images.map((src, index) => (
                <CarouselItem key={index}>
                  <Image
                    src={src || "/placeholder-image.jpg"}
                    width={300}
                    height={160}
                    alt={`Property image ${index + 1}`}
                    className="w-full h-40 object-cover"
                  />
                </CarouselItem>
              ))
            ) : (
              <CarouselItem>
                <Image
                  src="/placeholder-image.jpg"
                  width={300}
                  height={160}
                  alt="Placeholder image"
                  className="w-full h-40 object-cover"
                />
              </CarouselItem>
            )}
          </CarouselContent>
          <CarouselPrevious className="absolute left-1 top-1/2 -translate-y-1/2 w-6 h-6">
            <ChevronLeft className="h-3 w-3" />
          </CarouselPrevious>
          <CarouselNext className="absolute right-1 top-1/2 -translate-y-1/2 w-6 h-6">
            <ChevronRight className="h-3 w-3" />
          </CarouselNext>
        </Carousel>
        <Badge className="absolute top-2 left-2 bg-green-500 text-xs">
          {property.type} {property.status}
        </Badge>
        <div className="absolute bottom-1 left-0 right-0">
          <div className="flex items-center justify-center gap-1">
            {images.map((_, index) => (
              <button
                key={index}
                className={`w-1.5 h-1.5 rounded-full transition-colors ${
                  index === current ? 'bg-white' : 'bg-white/50'
                }`}
                onClick={() => api?.scrollTo(index)}
              />
            ))}
          </div>
        </div>
      </div>
      <CardContent className="p-3">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold">{property.price}</h3>
          <Badge variant="outline" className="text-blue-500 border-blue-500 text-xs">
            {property.createdAt.toString()}
          </Badge>
        </div>
        <div className="flex items-center mb-2 text-xs text-muted-foreground">
          <MapPin className="w-3 h-3 mr-1" />
          <p className="truncate">{property.address}</p>
        </div>
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="flex items-center">
            <Bed className="w-3 h-3 mr-1 text-muted-foreground" />
            <span>{property.bedrooms} Beds</span>
          </div>
          <div className="flex items-center">
            <Bath className="w-3 h-3 mr-1 text-muted-foreground" />
            <span>{property.bathrooms} Baths</span>
          </div>
          <div className="flex items-center">
            <Maximize className="w-3 h-3 mr-1 text-muted-foreground" />
            <span>{property.area} m²</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-3 pt-0 flex justify-between">
        <ContactDialog property={property} />
        <Button variant="outline" size="sm" asChild className="w-1/2">
          <Link href={`/properties/${property.id}`}>
            View Details
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

// function name() {
//   return(
//     <>
//         <Card className="w-full max-w-sm mx-auto overflow-hidden">
//       <CardHeader className="p-0">
//         <div className="relative h-48">
//           <Carousel setApi={setApi} className="w-full">
//             <CarouselContent>
              
//               {images.length > 0 ? (
//                 images.map((src, index) => (
//                   <CarouselItem key={index}>
//                     <Image
//                       src={src || "/placeholder-image.jpg"} // Use src or fallback
//                       width={200}
//                       height={200}
//                       alt={`Property image ${index + 1}`}
//                       className="w-full h-48 object-cover"
//                     />
//                   </CarouselItem>
//                 ))
//               ) : (
//                 <CarouselItem>
//                   <Image
//                     src="/placeholder-image.jpg"
//                     width={200}
//                     height={200}
//                     alt="Placeholder image"
//                     className="w-full h-48 object-cover"
//                   />
//                 </CarouselItem>
//               )}
              
//             </CarouselContent>
//             <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2">
//               <ChevronLeft className="h-4 w-4" />
//             </CarouselPrevious>
//             <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2">
//               <ChevronRight className="h-4 w-4" />
//             </CarouselNext>
//             <div className="absolute bottom-2 left-0 right-0">
//               <div className="flex items-center justify-center gap-2">
//                 {images.map((_, index) => (
//                   <button
//                     key={index}
//                     className={`w-2 h-2 rounded-full transition-colors ${
//                       index === current ? 'bg-white' : 'bg-white/50'
//                     }`}
//                     onClick={() => api?.scrollTo(index)}
//                   />
//                 ))}
//               </div>
//             </div>
//           </Carousel>
//           <Badge className="absolute top-2 left-2 bg-green-500 hover:cursor-pointer">
//             {property.type} {property.status}
//           </Badge>
//         </div>
//       </CardHeader>
//       <CardContent className="p-4">
//         <div className="flex justify-between items-start mb-2">
//           <h3 className="text-2xl font-bold">{property.price}</h3>
//           <Badge variant="outline" className="text-blue-500 border-blue-500">
//             New Listing
//           </Badge>
//         </div>
//         <div className="flex mb-4">
//           <MapPinIcon className="size-4" />
//           <p className="text-muted-foreground">{property?.address}</p>
//         </div>
//         <div className="grid grid-cols-2 gap-4 mb-4">
//           <div className="flex items-center">
//             <Bed className="w-5 h-5 mr-2 text-muted-foreground" />
//             <span>{property?.bedrooms} Beds</span>
//           </div>
//           <div className="flex items-center">
//             <Bath className="w-5 h-5 mr-2 text-muted-foreground" />
//             <span>{property?.bathrooms} Baths</span>
//           </div>
//           <div className="flex items-center">
//             <Maximize className="w-5 h-5 mr-2 text-muted-foreground" />
//             <span>{property?.area} m<sup>2</sup></span>
//           </div>
//           <div className="flex items-center">
//             <Home className="w-5 h-5 mr-2 text-muted-foreground" />
//             <span>Single Family</span>
//           </div>
//         </div>
//       </CardContent>
//       <CardFooter className="p-4 pt-0 ">
//         <ContactDialog property={property}/>
//         <Button variant="outline" className="w-1/2">
//         <Link href={`/properties/${property.id}`} >
//            View Details
//         </Link>
//         </Button>
//       </CardFooter>
//     </Card>
//     </>
//   )
// }

export function CardSkeleton() {
  return (
    <Card className="w-full max-w-sm mx-auto">
      <CardHeader className="space-y-2">
        <Skeleton className="h-6 w-1/2" />
        <Skeleton className="h-4 w-3/4" />
      </CardHeader>
      <CardContent className="space-y-4">
        <Skeleton className="h-32 w-full rounded-md" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/6" />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Skeleton className="h-10 w-28" />
        <Skeleton className="h-10 w-28" />
      </CardFooter>
    </Card>
  )
}