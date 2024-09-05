'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bed, Bath, Maximize, Home, MapPin, Calendar, Phone, Mail, ChevronRight, Video, Image as ImageIcon, Map } from "lucide-react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { ClientProperty } from '../../_components/property/propertiesSection'
import Image from 'next/image'

export default function PropertyListingPage({property}:{property:ClientProperty}) {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)

  const images = property?.images
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
                    width={100}
                    height={100}
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
              <h1 className="text-3xl font-bold">Charming Family Home</h1>
              <Badge className="text-lg px-3 py-1">For Sale</Badge>
            </div>
            <p className="text-2xl font-bold">$450,000</p>
            <div className="flex items-center text-muted-foreground">
              <MapPin className="w-5 h-5 mr-2" />
              <span>123 Main St, Anytown, USA 12345</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="flex items-center">
                <Bed className="w-5 h-5 mr-2 text-muted-foreground" />
                <span>3 Bedrooms</span>
              </div>
              <div className="flex items-center">
                <Bath className="w-5 h-5 mr-2 text-muted-foreground" />
                <span>2 Bathrooms</span>
              </div>
              <div className="flex items-center">
                <Maximize className="w-5 h-5 mr-2 text-muted-foreground" />
                <span>1,500 sqft</span>
              </div>
              <div className="flex items-center">
                <Home className="w-5 h-5 mr-2 text-muted-foreground" />
                <span>Single Family</span>
              </div>
            </div>

            <p className="text-muted-foreground">
              This charming family home offers a perfect blend of comfort and style. 
              With its spacious layout, modern amenities, and prime location, it's an 
              ideal choice for those seeking a welcoming environment to call home.
            </p>
          </div>
{/* TODO : add the fllwing table */}
          <Card>
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
          </Card>

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
                  <TabsTrigger value="map">
                    <Map className="w-4 h-4 mr-2" />
                    Map
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="video" className="mt-4">
                  <div className="aspect-video">
                    <iframe
                      width="100%"
                      height="100%"
                      src={videoUrl}
                      title="Property Video Tour"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </TabsContent>
                <TabsContent value="panorama" className="mt-4">
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                    <p className="text-muted-foreground">360° Panorama View Placeholder</p>
                  </div>
                </TabsContent>
                <TabsContent value="map" className="mt-4">
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                    <p className="text-muted-foreground">Google Maps Embed Placeholder</p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <h2 className="text-xl font-semibold">Contact Agent</h2>
              <img
                src="/placeholder.svg?height=100&width=100&text=Agent"
                alt="Agent"
                className="w-24 h-24 rounded-full mx-auto"
              />
              <div className="text-center">
                <p className="font-semibold">Jane Doe</p>
                <p className="text-sm text-muted-foreground">Luxury Real Estate Specialist</p>
              </div>
              <div className="space-y-2">
                <Button className="w-full">
                  <Phone className="mr-2 h-4 w-4" /> Call Agent
                </Button>
                <Button variant="outline" className="w-full">
                  <Mail className="mr-2 h-4 w-4" /> Email Agent
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
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
          </Card>

          <Card>
            <CardContent className="p-6 space-y-4">
              <h2 className="text-xl font-semibold">Mortgage Calculator</h2>
              <p className="text-sm text-muted-foreground">
                Estimated monthly payment: <span className="font-semibold">$2,100</span>
              </p>
              <Button variant="outline" className="w-full">
                Calculate Mortgage
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}