"use client";

import {
  Banknote,
  CalendarRange,
  MapPin,
  MapPinOff,
  Target,
  Users,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { InvestmentDTO } from "@/_actions/client/actions";
import EmailLink from "@/components/emailComponent";
import PhoneCallLink from "@/components/phoneCallComponent";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import WhatsAppLink from "@/components/whatsAppComponents";
import { Agent, InvestmentOffer } from "@prisma/client";
import { ContactInvestor } from "./investmentContactDialog";

const selectItems = {
  housing: "للسكن",
  investment: "للاستثمار",
  commercial: "للاستخدام التجاري",
  other: "أخرى",
};
export default function InvestmentListingPage({
  investment,
  acceptedInvestmentOffersSum,
}: {
  investment: InvestmentDTO;
  acceptedInvestmentOffersSum: number;
}) {
  const [agent, setAgent] = useState<Agent | undefined>(undefined);
  const arPurpose = investment.purpose
    ? selectItems[investment.purpose as keyof typeof selectItems]
    : "";

  useEffect(() => {
    if (investment?.agent) {
      setAgent(investment.agent);
    }
  }, [investment]);

  if (!investment) {
    return (
      <div className="container mx-auto px-4 py-8">الاستثمار غير موجود</div>
    );
  }

  const progressPercentage = investment.price
    ? ((investment.contribution! + acceptedInvestmentOffersSum) /
        investment.price) *
      100
    : 0;

  const getBackgroundColor = (price: number | undefined) => {
    if (price === undefined) return "from-blue-500 to-purple-500";
    if (price > 1000000) return "from-red-300 to-red-500";
    if (price > 500000) return "from-green-300 to-green-500";
    if (price > 100000) return "from-yellow-300 to-yellow-500";
    return "from-blue-500 to-purple-500";
  };

  const backgroundColorClass = getBackgroundColor(investment.price || 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="p-0">
              <div
                className={`relative w-full h-[300px] bg-gradient-to-r ${backgroundColorClass} overflow-hidden`}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <CardTitle className="text-3xl font-bold text-white text-center px-2">
                    {investment.title}{" "}
                  </CardTitle>
                </div>
                <Badge
                  variant="outline"
                  className="absolute top-2 left-2 bg-white"
                >
                  {arPurpose}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <p className="text-2xl font-bold">{investment.price} درهم</p>

              <div className="flex items-center text-muted-foreground">
                <MapPinOff className="w-5 h-5 ml-2" aria-hidden="true" />
                <span>{investment.location}</span>
              </div>
              <div className="flex items-center">
                <Banknote
                  className="w-5 h-5 ml-2 text-muted-foreground"
                  aria-hidden="true"
                />
                <p className="font-bold">
                  مساهمة الناشر {investment.contribution} درهم
                </p>
              </div>
              <div className="flex items-center text-muted-foreground">
                <CalendarRange className="w-5 h-5 ml-2" aria-hidden="true" />
                <span>{investment.createdAt.toLocaleDateString()}</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">تقدم الاستثمار</span>
                  <span className="text-sm font-medium">
                    {progressPercentage.toFixed(0)}%
                  </span>
                </div>
                <Progress value={progressPercentage} className="w-full h-2" />
              </div>
              <div className="flex items-center">
                <Users
                  className="w-5 h-5 ml-2 text-muted-foreground"
                  aria-hidden="true"
                />
                <span className="text-sm text-muted-foreground">
                  {investment.numContributors} مساهم
                  {investment.numContributors !== 1 ? "ين" : ""} مطلوب
                </span>
              </div>
              <p className="text-muted-foreground">{investment.description}</p>
            </CardContent>
            <CardFooter></CardFooter>
          </Card>
        </div>
        <div className="space-y-6 m-auto">
          <Card className="bg-yellow-50 max-w-lg">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">
                قدّم عرضًا
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                يمكنك تقديم عرض يتناسب معك من حيث السعر وفترة الدفع.
              </p>
              <ContactInvestor investment={investment} />
            </CardContent>
          </Card>
          <Card className="max-w-lg">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">
                اتصل بالناشر
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Image
                width={96}
                height={96}
                src={agent?.image || "/placeholder.svg?height=96&width=96"}
                alt={agent?.name || "الوكيل"}
                className="w-24 h-24 rounded-full mx-auto object-cover"
              />
              <div className="text-center">
                <p className="font-semibold">
                  {agent?.name || "اسم الوكيل غير متوفر"}
                </p>
              </div>
              <div className="flex justify-around items-center">
                <PhoneCallLink phone={agent?.phone || ""} />
                <WhatsAppLink
                  productName={`${investment.title} ${investment.location}`}
                />
                <EmailLink />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
