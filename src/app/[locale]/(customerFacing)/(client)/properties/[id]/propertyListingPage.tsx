'use client'

import { PropertyDTO } from "@/_actions/client/actions"
import EmailLink from "@/components/emailComponent"
import PhoneCallLink from "@/components/phoneCallComponent"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import WhatsAppLink from "@/components/whatsAppComponents"
import { Agent } from "@prisma/client"
import { Home, MapPinIcon } from "lucide-react"
import Image from 'next/image'
import { useEffect, useState } from 'react'
import MediaCard from "../_components/mediaCrads"
import { ContactDialog } from "../_components/propertyContactDialog"

export default function PropertyListingPage({
  property,
}: {
  property: PropertyDTO;
}) {

  const images  = property.images? property.images.split(",") : [];
  const videoUrl = property.video ? property.video : ""
  const ytVideo = property.ytVideo ?property.ytVideo : ""
  const panoramaUrl = property.panorama ?property.panorama : ""

  const features  = property.features? property.features.split(",") : [];

  const [agent, setAgent] = useState<Agent>();
  
  useEffect(() => {
    if (property && property.agent) {
      setAgent(property.agent)
    }
  }, [property]);

  return (
    <>   
     <div className="min-h-screen bg-background">
    {/*hero section  */}
      <div className="relative h-[30vh] md:h-[60vh] w-full bg-muted">
        <Image
          src={images[0] || ""}
          alt={""}
          fill
          className="object-cover"
        />
        <div className="absolute bottom-8 text-white p-4 bg-black bg-opacity-30 rounded-md z-10">
          <h1 className="text-4xl font-bold mb-2">{property.type}</h1>
          <div className="flex items-center gap-2">
            <MapPinIcon className="h-5 w-5" />
            <p className="text-lg">{property.address}</p>
          </div>
        </div>
      </div>
      {/* main section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
          <Separator className="mb-8" />
            <div className="mb-12">
                <h2 className="text-2xl font-semibold mb-4">{property.type}</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {property.description}
                </p>
            </div>
            <Separator className="mb-6" />
          <div className="mb-12">
            {features.length > 0 ? <h2 className="text-2xl font-semibold mb-4">وسائل الراحة</h2>: ""}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {features.map((feature,index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-muted-foreground"
                >
                  <Home className="h-4 w-4" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
             <Separator className="mb-4" />
             <MediaCard propertyUrl ={videoUrl} youtubeUrl = {ytVideo} images = {images} panoramaUrl={panoramaUrl} />
          </div>
          <div className="m-auto ">
          <Card className="mb-3 animate-pulse bg-yellow-200">
            <CardContent className="p-6 space-y-4">
            <h2 className="text-xl font-semibold">قدّم عرضاً</h2>
            <p className="text-sm text-muted-foreground">
            يمكنك تقديم عرض يناسبك من حيث السعر وفترة الدفع.
            </p>
              <ContactDialog property={property} />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 space-y-4">
            <h2 className="text-xl font-semibold">اتصل بالناشر</h2>
            <Image
                width={200}
                height={200}
                src={agent?.image ||"https://utfs.io/f/5fc9f0eb-0403-4072-9003-ca31cdab076d-24goo2.jpg"}
                alt="Agent"
                className="w-24 h-24 rounded-full mx-auto"
              />
              <div className="text-center">
                <p className="font-semibold">{agent?.name}</p>
              </div>
              <div className="space-y-2 flex justify-around items-center">
                <PhoneCallLink phone={agent?.phone || ""}/>
                <WhatsAppLink productName={property.type + " " + property.address} />
                <EmailLink />
  
            </div>
            </CardContent>
          </Card>
          </div>
        </div>
      </div>
     </div>
    </>
  )
}