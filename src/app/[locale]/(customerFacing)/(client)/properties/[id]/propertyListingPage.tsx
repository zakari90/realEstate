'use client'

import { PropertyDTO } from "@/_actions/client/actions"
import EmailLink from "@/components/emailComponent"
import PhoneCallLink from "@/components/phoneCallComponent"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import WhatsAppLink from "@/components/whatsAppComponents"
import { Agent } from "@prisma/client"
import { Bath, Bed, Image as ImageIcon, MapPin, Maximize, Video } from "lucide-react"
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { ContactDialog } from "../_components/propertyContactDialog"

export default function PropertyListingPage({
  property,
}: {
  property: PropertyDTO;
}) {

  
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const images  = property.images? property.images.split(",") : [];
  const videoUrl = property.video
  useEffect(() => {
    if (!api) {
      return
    }

    setCurrent(api.selectedScrollSnap())

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])
  const features  = property.features? property.features.split(",") : [];
  
  const mapIconSize = 40; 
  const fallbackIconSize =  30;
  const [agent, setAgent] = useState<Agent>();
  useEffect(() => {
    if (property && property.agent) {
      setAgent(property.agent)
    }
  }, [property]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="space-y-4">
            <Carousel setApi={setApi} className="w-full max-w-3xl mx-auto">
              <CarouselContent>
                {images.map((src, index) => (
                  <CarouselItem key={index}>
                    <Image
                    src={src}
                    width={600}
                    height={600}
                    alt={`Property image ${index + 1}`}
                    className="w-full aspect-video object-cover rounded-lg"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
            <div className="flex justify-center space-x-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === current ? 'bg-primary' : 'bg-primary/20'
                  }`}
                  onClick={() => api?.scrollTo(index)}
                />
              ))}
            </div>
            <div className="flex space-x-2 overflow-x-auto py-2">
              {images.map((src, index) => (
                <button
                  key={index}
                  className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden ${
                    index === current ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => api?.scrollTo(index)}
                >
   
                  <Image
                    src={src}
                    width={100}
                    height={100}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <h1 className="text-3xl font-bold">{property.type} </h1>
              <Badge className="text-lg px-3 py-1">{property.status}</Badge>
            </div>
            <p className="text-2xl font-bold">{property.price} MAD</p>
            <div className="flex items-center text-muted-foreground">
            <div>

            {property.mapUrl ? (
        <a
          href={property.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
          }}
          aria-label="View on Google Maps"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Google Maps"
            role="img"
            viewBox="0 0 512 512"
            style={{
              width: '100%', // Ensures SVG scales to container size
              height: '100%', // Ensures SVG scales to container size
              maxWidth: mapIconSize, // Maximum size constraint
              maxHeight: mapIconSize, // Maximum size constraint
            }}
          >
            <rect width="512" height="512" rx="15%" fill="#ffffff"></rect>
            <clipPath id="a">
              <path d="M375 136a133 133 0 00-79-66 136 136 0 00-40-6 133 133 0 00-103 48 133 133 0 00-31 86c0 38 13 64 13 64 15 32 42 61 61 86a399 399 0 0130 45 222 222 0 0117 42c3 10 6 13 13 13s11-5 13-13a228 228 0 0116-41 472 472 0 0145-63c5-6 32-39 45-64 0 0 15-29 15-68 0-37-15-63-15-63z"></path>
            </clipPath>
            <g strokeWidth="130" clipPath="url(#a)">
              <path stroke="#fbbc04" d="M104 379l152-181"></path>
              <path stroke="#4285f4" d="M256 198L378 53"></path>
              <path stroke="#34a853" d="M189 459l243-290"></path>
              <path stroke="#1a73e8" d="M255 120l-79-67"></path>
              <path stroke="#ea4335" d="M76 232l91-109"></path>
            </g>
            <circle cx="256" cy="198" r="51" fill="#ffffff"></circle>
          </svg>
        </a>) : (
        <MapPin
          style={{
            width: fallbackIconSize,
            height: fallbackIconSize,
            color: '#000000', // Default color for fallback icon
          }}
          aria-label="Location Pin"
        />
      )}
            </div>

              
              <span>{property.address} </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="flex items-center">
                <Bed className="w-5 h-5 mr-2 text-muted-foreground" />
                <span>{property.bedrooms} Bedrooms</span>
              </div>
              <div className="flex items-center">
                <Bath className="w-5 h-5 mr-2 text-muted-foreground" />
                <span>{property.bathrooms} Bathrooms</span>
              </div>
              <div className="flex items-center">
                <Maximize className="w-5 h-5 mr-2 text-muted-foreground" />
                <span>{property.area} m<sup>2</sup></span>
              </div>

            </div>

            <p className="text-muted-foreground">
              {property.description}
            </p>
          </div>
{/* TODO : add the fllwing table */}
          {/* <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Property Details</h2>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Year Built</TableCell>
                    <TableCell>2015</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Lot Size</TableCell>
                    <TableCell>0.25 acres</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Heating</TableCell>
                    <TableCell>Forced air</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Cooling</TableCell>
                    <TableCell>Central air</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Parking</TableCell>
                    <TableCell>2 car garage</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card> */}
          {features.map((feature, index) => (
        <Badge className="gap-3" key={index} variant="outline">
          {feature}
        </Badge>
      ))}
          <Card>
            <CardContent className="p-6">
              <Tabs defaultValue="video" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="video">
                    <Video className="w-4 h-4 mr-2" />
                    Video Tour
                  </TabsTrigger>
                  <TabsTrigger value="panorama">
                    <ImageIcon className="w-4 h-4 mr-2" />
                    360° View
                  </TabsTrigger>
                  {/* <TabsTrigger value="map">
                    <Map className="w-4 h-4 mr-2" />
                    Map
                  </TabsTrigger> */}
                </TabsList>
                <TabsContent value="video" className="mt-4">
                  <div className="aspect-video">
                    <iframe
                      width="100%"
                      height="100%"
                      src={videoUrl || ""}
                      title="Property Video Tour"
                      
                      allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </TabsContent>
                <TabsContent value="panorama" className="mt-4">
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                    <p className="text-muted-foreground">360° Panorama View Placeholder</p>
                  </div>
                </TabsContent>
                {/* <TabsContent value="map" className="mt-4">
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                    <p className="text-muted-foreground">Google Maps Embed Placeholder</p>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d1574.3173229769047!2d-5.687383368973645!3d33.87584251621207!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzPCsDUyJzMyLjMiTiA1wrA0MScxNS42Ilc!5e1!3m2!1sen!2sma!4v1726392154192!5m2!1sen!2sma" width="600" height="450" 
                     loading="lazy"></iframe>
                  </div>
                </TabsContent> */}
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
        <Card className="animate-pulse bg-yellow-200">
            <CardContent className="p-6 space-y-4">
              <h2 className="text-xl font-semibold">Make an offer</h2>
              <p className="text-sm text-muted-foreground">
              You can make an offer that suits you best in terms of price and payment period.
              </p>
              <ContactDialog property={property}/>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 space-y-4">
              <h2 className="text-xl font-semibold">Contact Publisher</h2>
              <Image
                width={200}
                height={200}
                src={agent?.image ||"https://utfs.io/f/5fc9f0eb-0403-4072-9003-ca31cdab076d-24goo2.jpg"}
                alt="Agent"
                className="w-24 h-24 rounded-full mx-auto"
              />
              <div className="text-center">
                <p className="font-semibold">{agent?.name}</p>
                {/* TODO: add agent description to db */}
                {/* <p className="text-sm text-muted-foreground">Luxury Real Estate Specialist</p> */}
              </div>
              <div className="space-y-2 flex justify-around items-center">
                <PhoneCallLink phone={agent?.phone || ""}/>
                <WhatsAppLink productName={property.type + " " + property.address} />
                <EmailLink />
   
            </div>
            </CardContent>
          </Card>
{/* TODO: add Schedule a Viewing*/}
          {/* <Card>
            <CardContent className="p-6 space-y-4">
              <h2 className="text-xl font-semibold">Schedule a Viewing</h2>
              <div className="flex items-center text-muted-foreground">
                <Calendar className="w-5 h-5 mr-2" />
                <span>Next available: Tomorrow, 2 PM</span>
              </div>
              <Button className="w-full">
                Book Appointment <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card> */}


        </div>
      </div>
    </div>
  )
}
