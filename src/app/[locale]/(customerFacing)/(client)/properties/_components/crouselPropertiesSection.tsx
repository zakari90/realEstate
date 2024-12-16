"use client"

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import PropertyCard from "./propertyCard";

function CrouselPropertiesSection({properties}: {properties :any[]}) {
  return (
    <div className="grid grid-cols-1 mx-auto">
    <Carousel
        opts={{
        loop: true,
        align: "start",
        }}
        plugins={[
        Autoplay({
            delay: 5000,
        }),
        ]}>
    <CarouselContent>
      {properties.map((property, index) => (
        <CarouselItem key={index} className="  md:basis-1/3 lg:basis-1/4">  
        <PropertyCard property={property} />  
        </CarouselItem>
      ))}
    </CarouselContent>
    <CarouselPrevious className="absolute left-[-15px] top-1/2 -translate-y-1/2 fill-black" />
    <CarouselNext className="absolute right-[-15px] top-1/2 -translate-y-1/2 fill-black" />
    </Carousel>
  </div>
  )
}

export default CrouselPropertiesSection