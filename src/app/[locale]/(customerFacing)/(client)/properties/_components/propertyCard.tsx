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
import { ContactDialog } from "./propertyContactDialog";


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
                    alt={`صورة العقار ${index + 1}`}
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
                  alt="صورة بديلة"
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
            <span>{property.bedrooms} غرف نوم</span>
          </div>
          <div className="flex items-center">
            <Bath className="w-3 h-3 mr-1 text-muted-foreground" />
            <span>{property.bathrooms} حمام</span>
          </div>
          <div className="flex items-center">
            <Maximize className="w-3 h-3 mr-1 text-muted-foreground" />
            <span>{property.area} م²</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-3 pt-0 flex justify-between">
        <Button variant="outline" size="sm" className="w-full text-xs">
          <Link href={`/properties/${property.id}`}>
            عرض التفاصيل
          </Link>
        </Button>
        <ContactDialog property={property} />
      </CardFooter>
    </Card>
  );
}
