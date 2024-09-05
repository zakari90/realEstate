import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowUpRight, BathIcon, BedIcon, MapPinIcon, MessageSquareTextIcon, RulerIcon, SendHorizonalIcon } from 'lucide-react';
import React, { useState } from 'react';

import { createClientOffer } from '@/app/_actions/actions';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { PropertyFeature, PropertyLocation } from '@prisma/client';
import { DialogClose } from '@radix-ui/react-dialog';
import Autoplay from "embla-carousel-autoplay";
import Image from 'next/image';
import Link from 'next/link';
import { PageHeader } from "@/components/pageHeader";
import { ClientOfferForm } from "./clientOfferForm";
import { ClientProperty } from "./propertiesSection";
export function ContactDialog({ property }: { property: ClientProperty }){
    return(
      <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full">Schedule a Viewing</Button>
     
        
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
    )
  }