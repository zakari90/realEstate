"use client"
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from 'lucide-react';

import { PageHeader } from "@/components/pageHeader";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Link from 'next/link';
import { PropertyCard } from "./propertyCard";


function PropertiesSection( {properties}: {properties :any[]}) {

  return (
    <section id="properties" className="space-y-4 mt-8 md:mt-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
        <PageHeader>Reacently added </PageHeader>
          
          <Button asChild size="sm">
            <Link href="/properties">
              View All
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>    
        <div className=" hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">     
         {properties.map(property => (
          <div key={property.id}>
            <PropertyCard property={property} />  
          </div>
         ))} 
        </div>
        <div className="grid grid-cols-1 mx-auto md:hidden">
          <Carousel
          opts={{
            loop: true,
            align: "start",
          }}
          plugins={[
            Autoplay({
              delay: 5000,
            }),
          ]}
        >
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
      </div>
      
    </section>
  )
}

export default PropertiesSection

  
