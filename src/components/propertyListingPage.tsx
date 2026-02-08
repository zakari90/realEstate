"use client";

import { PropertyDTO } from "@/_actions/client/actions";
import EmailLink from "@/components/emailComponent";
import PhoneCallLink from "@/components/phoneCallComponent";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import WhatsAppLink from "@/components/whatsAppComponents";
import { Agent } from "@prisma/client";
import {
  Bath,
  Bed,
  CalendarRange,
  CheckCircle2,
  Home,
  MapPin,
  Maximize,
  Share2,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import MediaCard from "./mediaCrads";
import { ContactDialog } from "./propertyContactDialog";

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
  const mapUrl = property.mapUrl ? property.mapUrl : "";
  const [lat, lng] = mapUrl.split(",").map((v) => Number(v.trim()));
  const mapSrc = `https://www.google.com/maps?q=${lat},${lng}&z=15&output=embed`;
  const features: string[] = property.features
    ? JSON.parse(property.features)
    : [];

  const [agent, setAgent] = useState<Agent>();
  const [isShareTooltipOpen, setIsShareTooltipOpen] = useState(false);

  useEffect(() => {
    if (property && property.agent) {
      setAgent(property.agent);
    }
  }, [property]);

  const arPurpose = property.sellingBy
    ? selectItems[property.sellingBy as keyof typeof selectItems]
    : "";

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("تم نسخ الرابط بنجاح");
    setIsShareTooltipOpen(true);
    setTimeout(() => setIsShareTooltipOpen(false), 2000);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("ar-MA", {
      style: "currency",
      currency: "MAD",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20 font-sans" dir="rtl">
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[500px] w-full bg-slate-900 overflow-hidden">
        <Image
          src={
            images[0] ||
            "https://images.unsplash.com/photo-1516281717304-181e285c6e58?q=80&w=2070&auto=format&fit=crop"
          }
          alt={property.type || "Property"}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>

        <div className="container relative h-full mx-auto px-4 flex flex-col justify-end pb-12 z-10">
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge className="bg-white/90 text-slate-900 hover:bg-white border-none px-3 py-1 text-sm backdrop-blur-md rounded-full font-bold">
              {arPurpose}
            </Badge>
            {property.available && (
              <Badge className="bg-emerald-500/90 text-white hover:bg-emerald-600 border-none px-3 py-1 text-sm backdrop-blur-md rounded-full">
                <CheckCircle2 className="w-3.5 h-3.5 ml-1.5" />
                متاح للبيع
              </Badge>
            )}
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2 max-w-3xl">
              <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                {property.type}
              </h1>
              <div className="flex items-center gap-2 text-slate-200 text-lg">
                <MapPin className="w-5 h-5 text-teal-400" />
                <span>{property.address}</span>
              </div>
            </div>

            <div className="text-right md:text-left">
              <p className="text-slate-300 text-sm mb-1">السعر الإجمالي</p>
              <p className="text-4xl font-bold text-white dir-ltr">
                {formatCurrency(property.price || 0)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Key Specs */}
            <div className="grid grid-cols-3 gap-4">
              <Card className="border-none shadow-md bg-white/80 backdrop-blur text-center py-4">
                <CardContent className="p-2 space-y-1">
                  <Maximize className="w-6 h-6 mx-auto text-teal-600" />
                  <p className="text-sm text-slate-500">المساحة</p>
                  <p className="font-bold text-slate-800">{property.area} م²</p>
                </CardContent>
              </Card>
              <Card className="border-none shadow-md bg-white/80 backdrop-blur text-center py-4">
                <CardContent className="p-2 space-y-1">
                  <Bed className="w-6 h-6 mx-auto text-teal-600" />
                  <p className="text-sm text-slate-500">غرف النوم</p>
                  <p className="font-bold text-slate-800">
                    {property.bedrooms}
                  </p>
                </CardContent>
              </Card>
              <Card className="border-none shadow-md bg-white/80 backdrop-blur text-center py-4">
                <CardContent className="p-2 space-y-1">
                  <Bath className="w-6 h-6 mx-auto text-teal-600" />
                  <p className="text-sm text-slate-500">الحمامات</p>
                  <p className="font-bold text-slate-800">
                    {property.bathrooms}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Description */}
            <Card className="border-none shadow-lg overflow-hidden">
              <CardHeader className="border-b bg-white/50 p-6">
                <CardTitle className="text-xl font-bold text-slate-800">
                  وصف العقار
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 md:p-8">
                <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed whitespace-pre-line text-lg">
                  {property.description}
                </div>

                <div className="mt-6 flex items-center text-sm text-slate-400">
                  <CalendarRange className="w-4 h-4 ml-2" />
                  <span>
                    نشر في {property.createdAt.toLocaleDateString("ar-MA")}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Features */}
            {features.length > 0 && (
              <Card className="border-none shadow-lg overflow-hidden">
                <CardHeader className="border-b bg-white/50 p-6">
                  <CardTitle className="text-xl font-bold text-slate-800">
                    المميزات ووسائل الراحة
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 md:p-8">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    {features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 text-slate-700 p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors"
                      >
                        <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 flex-shrink-0">
                          <Home className="w-4 h-4" />
                        </div>
                        <span className="font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Media */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-800 px-2">
                معرض الوسائط
              </h2>
              <MediaCard
                propertyUrl={videoUrl}
                youtubeUrl={ytVideo}
                images={images}
                panoramaUrl={panoramaUrl}
              />
            </div>

            {/* Map */}

            <Card className="border-none shadow-lg overflow-hidden">
              <CardHeader className="border-b bg-white/50 p-6">
                <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-teal-600" />
                  الموقع على الخريطة
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 h-[400px] relative">
                <iframe
                  src={mapSrc}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Make Offer Card */}
            <Card className="border-none shadow-xl bg-gradient-to-br from-indigo-50 to-white border border-indigo-100 sticky top-24">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center mb-2">
                  <Badge
                    variant="outline"
                    className="text-indigo-600 border-indigo-200 bg-indigo-50"
                  >
                    فرصة مميزة
                  </Badge>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-slate-400 hover:text-indigo-600"
                    onClick={handleShare}
                  >
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
                <CardTitle className="text-2xl font-bold text-slate-800">
                  هل أنت مهتم؟
                </CardTitle>
                <p className="text-slate-500 text-sm leading-relaxed">
                  لا تفوت هذه الفرصة! قدم عرضك الآن أو تواصل مباشرة مع الوكيل
                  العقاري.
                </p>
              </CardHeader>
              <CardContent className="space-y-4 pt-4">
                <div className="pt-2">
                  <div className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-all shadow-md hover:shadow-lg">
                    <ContactDialog property={property} />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Agent Card */}
            <Card className="border-none shadow-lg overflow-hidden">
              <CardHeader className="bg-slate-50 border-b p-6">
                <CardTitle className="text-lg font-bold text-slate-800">
                  تواصل مع الوكيل
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-4">
                    <div className="absolute inset-0 bg-teal-500 rounded-full blur-md opacity-20"></div>
                    <Image
                      width={100}
                      height={100}
                      src={agent?.image || "/placeholder-user.jpg"}
                      alt={agent?.name || "Agent"}
                      className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md relative z-10"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">
                    {agent?.name}
                  </h3>
                  <p className="text-slate-500 text-sm">وكيل عقاري معتمد</p>
                </div>

                <div className="flex justify-center gap-3">
                  <div className="transform hover:scale-110 transition-transform duration-200">
                    <PhoneCallLink phone={agent?.phone || ""} />
                  </div>
                  <div className="transform hover:scale-110 transition-transform duration-200">
                    <WhatsAppLink
                      productName={`${property.type} - ${property.address}`}
                    />
                  </div>
                  <div className="transform hover:scale-110 transition-transform duration-200">
                    <EmailLink />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
