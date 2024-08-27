"use client"
import { fetchProperties, fetchPropertyDetails, fetchPropertyImages, selectProperties, selectPropertyImages, selectStatus } from '@/lib/features/dataForVisitors/dataForVisitors';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Home, Phone, Mail, MapPin, Star, Key, Search, Building, Warehouse, MapPinIcon, RulerIcon, ContactIcon, ShieldMinus, MessageSquareCodeIcon, MessageSquare, MessageSquareIcon, MessageSquareTextIcon, SendHorizonalIcon, PlusSquareIcon } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { BathIcon, BedIcon, Pin, PinIcon, Ruler} from 'lucide-react';

import Link from 'next/link'
import Image from 'next/image'
import db from '@/db/db'
import { PropertyFeature, PropertyImage, PropertyLocation } from '@prisma/client';
import WhatsAppLink from '@/components/whatsAppComponents';
import EmailjsComponent from '@/components/emailjsComponent';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import {  createClientOffer } from '@/app/_actions/actions';
import { DialogClose } from '@radix-ui/react-dialog';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
interface ClientProperty {
  id: string | null,
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
const phoneNumberPattern = /^0[+]?[0-9]{1,4}[-\s.]?[0-9]+[-\s.]?[0-9]+[-\s.]?[0-9]+$|^[+]?[1-9][0-9]{1,14}[-\s.]?[0-9]*$/;
const MIN_LENGTH = 10;
const MAX_LENGTH = 15;
function PropertiesSection( {properties}: {properties :ClientProperty[]}) {

  return (
    <section id="properties" className="space-y-4">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">title </h2>
        <div className=" hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">     
         {properties.map(property => (
        <Card key={property.id} className='flex overflow-hidden relative'>
          <Link href={`/`} className=" w-1/2 aspect-square ">
          <Image
            width={200}
            height={200}
              className=" h-full w-full rounded-lg"
              src={property?.images?.[0] ||""}
              alt="Card Image"
            />
          </Link>
        <div className='w-1/2'>   
          <CardHeader>
            <CardTitle>{property.type} {property.status} </CardTitle>
            <CardDescription className='flex gap-1'>
                <MapPinIcon className="size-4" />
                <span>{`${property?.location?.city}`} </span>              
            </CardDescription>
          </CardHeader>
          <CardContent>
            <span className='bg-yellow-500 rounded-sm p-1'>{property.price} DH</span>
          </CardContent>
          <CardFooter >
          <div className='flex flex-wrap gap-5'>
          <div className='flex items-center gap-1' > 
            <RulerIcon className="w-4 h-4" />
            <span>{property?.feature?.area} m<sup>2</sup></span>
          </div>
          <div className='flex items-center gap-1' > 
            <BedIcon className="w-4 h-4" />
            <span>{property?.feature?.bedrooms}</span>
          </div>
          <div className='flex items-center gap-1' > 
            <BathIcon className="w-4 h-4" />
            <span>{property?.feature?.bathrooms}</span>
          </div>
          </div>

          </CardFooter>  
        </div>
        <div className='absolute bottom-0 right-0 hover:cursor-pointer'>
          <Dialog>
          <DialogTrigger asChild>
            <MessageSquareTextIcon className='animate-pulse text-cyan-700' />
            </DialogTrigger>
            
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Contact the seller</DialogTitle>
                  {/* <DialogDescription>
                  Never send money in advance to the seller for goods on the site.          
                  </DialogDescription> */}
                </DialogHeader>
                <ClientOfferForm property={property}/>
              </DialogContent>
          </Dialog>
        </div>
        </Card>    
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
              <Card key={property.id} className='flex overflow-hidden relative'>
          <Link href={`/`} className=" w-1/2 aspect-square ">
          <Image
            width={200}
            height={200}
              className=" h-full w-full rounded-lg"
              src={property?.images?.[0] || ""} 
              alt="Card Image"
            />
          </Link>
        <div className='w-1/2'>   
          <CardHeader>
            <CardTitle>{property.type} {property.status} </CardTitle>
            <CardDescription className='flex gap-1'>
                <MapPinIcon className="size-4" />
                <span>{`${property?.location?.city}`} </span>              
            </CardDescription>
          </CardHeader>
          <CardContent>
            <span className='bg-yellow-500 rounded-sm p-1'>{property.price} DH</span>
          </CardContent>
          <CardFooter >
          <div className='flex flex-wrap gap-5'>
          <div className='flex items-center gap-1' > 
            <RulerIcon className="w-4 h-4" />
            <span>{property?.feature?.area} m<sup>2</sup></span>
          </div>
          <div className='flex items-center gap-1' > 
            <BedIcon className="w-4 h-4" />
            <span>{property?.feature?.bedrooms}</span>
          </div>
          <div className='flex items-center gap-1' > 
            <BathIcon className="w-4 h-4" />
            <span>{property?.feature?.bathrooms}</span>
          </div>
          </div>

          </CardFooter>  
        </div>
        <div className='absolute bottom-0 right-0 hover:cursor-pointer'>
          <Dialog>
          <DialogTrigger asChild>
            <MessageSquareTextIcon className='animate-pulse text-cyan-700' />
            </DialogTrigger>
            
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Contact the seller</DialogTitle>
                  {/* <DialogDescription>
                  Never send money in advance to the seller for goods on the site.          
                  </DialogDescription> */}
                </DialogHeader>
                <ClientOfferForm property={property}/>
              </DialogContent>
          </Dialog>
        </div>
        </Card> 
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

export function ClientOfferForm({property} : {property:any}) {
  
  const [clientOffer, setClientOffer] = useState("");
  const [clientPhone, setClientPhone] = useState('');
  const [isValid, setIsValid] = useState(true);
  
  const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setClientPhone(value);

    // Validate phone number format and length
    const validFormat = phoneNumberPattern.test(value);
    const validLength = value.length >= MIN_LENGTH && value.length <= MAX_LENGTH;

    if (!validFormat || !validLength) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };
  return(
    <form action={createClientOffer}>
    <div className="grid gap-4 py-4">
    <Input className='hidden' id="propertyId" name="propertyId" type="text" defaultValue={property.id} readOnly />
    <div className="flex items-center">    
  
      <Label htmlFor="clientPhone" className='w-2/3'>
      Phone Number :
      </Label>
        <Input
          id="clientPhone"
          name="clientPhone"
          type="text"
          value={clientPhone}
          onChange={handleChange}
          placeholder="Enter your phone number"
        />
      </div>
      <div className="flex items-center">      
      <Label htmlFor="clientOffer" className='w-2/3'>
        Make an offer
      </Label>
        <Input
          id="clientOffer"
          name='clientOffer'
          
          defaultValue={property.price}
          type='number'
          value={clientOffer}
          onChange={(e)=>(setClientOffer(e.target.value))}
          
        />
      </div>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger >Optional fields :</AccordionTrigger>
          <AccordionContent className='py-3'>


              <div className="flex items-center mb-3">      
              <Label htmlFor="username" className='w-2/3'>
                Name
              </Label>
                <Input id="clientName" name='clientName' type='text' />
              </div>
              <div className="flex items-center">      
              <Label htmlFor="username" className='w-2/3'>
                Email
              </Label>
                <Input
                  id="clientEmail"
                  name='clientEmail'
                  type='text'
                />
              </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
    <Button disabled={isValid} type="submit" ><DialogClose/> <SendHorizonalIcon className='size-4'/></Button>
    </form>
  )
}
  
