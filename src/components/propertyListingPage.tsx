"use client";

import { PropertyDTO } from "@/_actions/client/actions";
import EmailLink from "@/components/emailComponent";
import PhoneCallLink from "@/components/phoneCallComponent";
import WhatsAppLink from "@/components/whatsAppComponents";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Agent } from "@prisma/client";
import { CalendarRange, Home, MapPin, MapPinOff } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import MediaCard from "./mediaCrads";
import { ContactDialog } from "./propertyContactDialog";
import { Badge } from "./ui/badge";

const selectItems = {
  coownership: "ملكية مشتركة",
  installment: "دفعات",
};

export default function PropertyListingPage({
  property,
}: {
  property: PropertyDTO;
}) {
  const images = property.images ? property.images.split(",") : [];
  const videoUrl = property.video ? property.video : "";
  const ytVideo = property.ytVideo ? property.ytVideo : "";
  const panoramaUrl = property.panorama ? property.panorama : "";

  const features: string[] = property.features
    ? JSON.parse(property.features)
    : [];

  const [agent, setAgent] = useState<Agent>();

  useEffect(() => {
    if (property && property.agent) {
      setAgent(property.agent);
    }
  }, [property]);

  const arPurpose = property.sellingBy
    ? selectItems[property.sellingBy as keyof typeof selectItems]
    : "";

  return (
    <>
      <div className="min-h-screen bg-background">
        <div className="relative h-[40vh] md:h-[60vh] w-full bg-muted">
          <Image
            src={
              images[0] ||
              "https://images.unsplash.com/photo-1516281717304-181e285c6e58?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            alt={""}
            fill
            className="object-cover"
          />
          <Badge variant="outline" className="absolute top-2 left-2 bg-white">
            {arPurpose}
          </Badge>
          <div className="absolute bottom-8 text-white p-4 bg-black bg-opacity-30 rounded-md z-10">
            <h1 className="text-4xl font-bold mb-2">{property.type}</h1>
            <div className="flex items-center gap-2">
              {property.mapUrl ? (
                <a
                  href={property.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MapPin className="h-5 w-5" color="blue" />{" "}
                </a>
              ) : (
                <MapPinOff className="h-5 w-5" />
              )}
              <p className="text-lg">{property.address}</p>
            </div>
          </div>
        </div>
        <div className=" relative max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 max-w-full ">
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 mr-4">
                  {property.type}
                </h2>
                <p className="text-muted-foreground mr-2 overflow-auto ">
                  {property.description}
                </p>
              </div>
              <div className=" mr-2 flex items-center text-muted-foreground">
                <CalendarRange className="w-5 h-5 ml-2" aria-hidden="true" />
                <span>{property.createdAt.toLocaleDateString()}</span>
              </div>
              <Separator className="mb-6" />
              <div className="mb-12">
                {features.length > 0 ? (
                  <h2 className="text-2xl font-semibold mb-4 mr-4">
                    وسائل الراحة
                  </h2>
                ) : (
                  ""
                )}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {features.map((feature, index) => (
                    <div
                      key={index}
                      className="mr-2 flex items-center gap-2 text-muted-foreground"
                    >
                      <Home className="h-4 w-4" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              <Separator className="mb-4" />
              <MediaCard
                propertyUrl={videoUrl}
                youtubeUrl={ytVideo}
                images={images}
                panoramaUrl={panoramaUrl}
              />
            </div>
            <div className="m-auto ">
              <Card className="mb-3 animate-pulse bg-yellow-50">
                <CardContent className="p-6 space-y-4">
                  <h2 className="text-xl font-semibold">قدّم عرضاً</h2>
                  <p className="text-sm text-muted-foreground">
                    يمكنك تقديم عرض يناسبك لكي يتواصل معك الناشر.
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
                    src={
                      agent?.image ||
                      "https://utfs.io/f/5fc9f0eb-0403-4072-9003-ca31cdab076d-24goo2.jpg"
                    }
                    alt="Agent"
                    className="w-24 h-24 rounded-full mx-auto"
                  />
                  <div className="text-center">
                    <p className="font-semibold">{agent?.name}</p>
                  </div>
                  <div className="space-y-2 flex justify-around items-center">
                    <PhoneCallLink phone={agent?.phone || ""} />
                    <WhatsAppLink
                      productName={property.type + " " + property.address}
                    />
                    <EmailLink />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
