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
import { PropertyFeature, PropertyLocation } from '@prisma/client';
import Autoplay from "embla-carousel-autoplay";
import Link from 'next/link';
import { PropertyCard } from "./propertyCard";
export interface ClientProperty {
  id: string ,
  type:string | null,
  description: string | null,
  price: number | null,
  agentId: string | null,
  status: string | null,
  locationId: string | null,
  featureId: string | null,
  video: string | null,
  panorama: string | null,
  createdAt: Date | null,
  updatedAt: Date | null,
  feature: PropertyFeature | null,
  location:PropertyLocation | null,
  images: (string | null)[] | null,
}

export default function MainPropertiesSection( {properties}: {properties :ClientProperty[]}) {

  return (
    <section id="properties" className="space-y-4 mt-8 md:mt-16">
      <div className="container mx-auto px-4">
        <PageHeader>All properties </PageHeader> 
        <div className=" grid grid-cols-1 mx-auto md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">     
         {properties.map(property => (
          <div key={property.id}>
            <PropertyCard property={property} />  
          </div>
         ))} 
        </div>
      </div>
      
    </section>
  )
}

