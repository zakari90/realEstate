"use client"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BathIcon, BedIcon, ChevronLeft, ChevronRight, MapPinIcon, RulerIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import { ContactDialog } from "./contactDialog";
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bed, Bath, Maximize, Home } from "lucide-react"
import { useEffect, useState } from "react";
import { Property } from "@prisma/client";
import { ClientProperty } from "@/app/_actions/client/actions";
export function PropertyCard({ property }: { property: ClientProperty }) {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  useEffect(() => {
    if (!api) {
      return
    }

    setCurrent(api.selectedScrollSnap())

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])  
  
  const images =  property.images ? property.images.split(",") : [];

  return (
    <>
  <Card className="w-full max-w-sm mx-auto overflow-hidden">
      <CardHeader className="p-0">
        <div className="relative h-48">
       
          <Carousel setApi={setApi} className="w-full">
          <Link href={`/properties/${property.id}`} className=" w-1/2 aspect-square ">
            <CarouselContent>
              {images?.map((src, index) => (
                <CarouselItem key={index}>
                  <Image
                    src={src || ""}
                    width={200} 
                    height={200}
                    alt={`Property image ${index + 1}`}
                    className="w-full h-48 object-cover"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Link>

            <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2">
              <ChevronLeft className="h-4 w-4" />
            </CarouselPrevious>
            <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2">
              <ChevronRight
               className="h-4 w-4" />
            </CarouselNext>
            <div className="absolute bottom-2 left-0 right-0">
              <div className="flex items-center justify-center gap-2">
                {images?.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === current ? 'bg-white' : 'bg-white/50'
                    }`}
                    onClick={() => api?.scrollTo(index)}
                  />
                ))}
              </div>
            </div>
          </Carousel>
          <Badge className="absolute top-2 left-2 bg-green-500 hover:cursor-pointer">{property.type} {property.status}</Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-2xl font-bold">{property.price}</h3>
          <Badge variant="outline" className="text-blue-500 border-blue-500">New Listing</Badge>
        </div>
        <div className="flex mb-4">
        <MapPinIcon className="size-4" />
        <p className="text-muted-foreground ">{`${property?.address}`}</p>

        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center">
            <Bed className="w-5 h-5 mr-2 text-muted-foreground" />
            <span>{property?.bedrooms} Beds</span>
          </div>
          <div className="flex items-center">
            <Bath className="w-5 h-5 mr-2 text-muted-foreground" />
            <span>{property?.bathrooms} Baths</span>
          </div>
          <div className="flex items-center">
            <Maximize className="w-5 h-5 mr-2 text-muted-foreground" />
            <span>{property?.area} m<sup>2</sup></span>
          </div>
          <div className="flex items-center">
            <Home className="w-5 h-5 mr-2 text-muted-foreground" />
            <span>Single Family</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
      <ContactDialog property={property} />

        {/* <Button className="w-full">Schedule a Viewing</Button> */}
      </CardFooter>

    </Card>
      
    </>

    );
  }