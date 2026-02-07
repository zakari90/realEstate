"use client";

import { InvestmentDTO } from "@/_actions/client/actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Banknote,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  Coins,
  MapPin,
  Share2,
  ShieldCheck,
  Target,
  Users,
  Wallet,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import { ContactInvestor } from "./investmentContactDialog";

interface InvestementListingPageProps {
  investment: InvestmentDTO;
  acceptedInvestmentOffersSum: number;
}

export default function InvestementListingPage({
  investment,
  acceptedInvestmentOffersSum,
}: InvestementListingPageProps) {
  const [isShareTooltipOpen, setIsShareTooltipOpen] = useState(false);

  // Calculate progress percentage
  const totalAmount = investment.price || 0;
  const collectedAmount = acceptedInvestmentOffersSum || 0;
  const progressPercentage = Math.min(
    (collectedAmount / totalAmount) * 100,
    100,
  );

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("تم نسخ الرابط بنجاح");
    setIsShareTooltipOpen(true);
    setTimeout(() => setIsShareTooltipOpen(false), 2000);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("ar-MA", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(date));
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
      <div className="relative h-[400px] w-full bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-10 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>

        {/* Background Pattern/Image */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-teal-500 via-slate-900 to-slate-900"></div>

        <div className="container relative h-full mx-auto px-4 flex flex-col justify-end pb-12 z-10">
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge className="bg-teal-500/10 text-teal-400 hover:bg-teal-500/20 border-teal-500/20 px-3 py-1 text-sm backdrop-blur-md">
              <Building2 className="w-3.5 h-3.5 ml-1.5" />
              فرصة استثمارية
            </Badge>
            {investment.status && (
              <Badge className="bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border-emerald-500/20 px-3 py-1 text-sm backdrop-blur-md">
                <CheckCircle2 className="w-3.5 h-3.5 ml-1.5" />
                متاحة للاستثمار
              </Badge>
            )}
          </div>

          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight max-w-4xl">
            {investment.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-slate-300 text-sm md:text-base">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-teal-400" />
              <span>{investment.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-teal-400" />
              <span>نشر في {formatDate(investment.createdAt)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview Card */}
            <Card className="border-none shadow-lg overflow-hidden">
              <CardHeader className="border-b bg-white/50 p-6">
                <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-2">
                  <Target className="w-5 h-5 text-teal-600" />
                  تفاصيل الاستثمار
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 md:p-8 space-y-8">
                {/* Investment Purpose */}
                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                  <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-teal-600" />
                    الغرض من الاستثمار
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-lg">
                    {investment.purpose}
                  </p>
                </div>

                {/* Description */}
                <div>
                  <h3 className="font-semibold text-slate-800 mb-4 text-lg">
                    وصف المشروع
                  </h3>
                  <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed whitespace-pre-line">
                    {investment.description}
                  </div>
                </div>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-teal-50 flex items-center justify-center text-teal-600">
                      <Banknote className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">قيمة المساهمة</p>
                      <p className="font-bold text-slate-800 dir-ltr text-right">
                        {formatCurrency(investment.contribution || 0)}
                      </p>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                      <Users className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">
                        المساهمين المطلوبين
                      </p>
                      <p className="font-bold text-slate-800">
                        {investment.numContributors} مساهمين
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Agent Card */}
            {investment.agent && (
              <Card className="border-none shadow-md overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 text-white">
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-right">
                    <Avatar className="w-24 h-24 border-4 border-white/10 shadow-xl">
                      <AvatarImage src={investment.agent.image || ""} />
                      <AvatarFallback className="bg-teal-600 text-xl font-bold">
                        {investment.agent.name?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 space-y-2">
                      <div className="inline-block px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-medium border border-teal-500/20 mb-2">
                        الوكيل المسؤول
                      </div>
                      <h3 className="text-2xl font-bold">
                        {investment.agent.name}
                      </h3>
                      <p className="text-slate-300 max-w-lg">
                        تواصل مع الوكيل الخبير للحصول على مزيد من المعلومات حول
                        هذه الفرصة الاستثمارية.
                      </p>
                    </div>

                    <Button
                      variant="outline"
                      className="min-w-[140px] bg-white text-slate-900 border-none hover:bg-teal-50 hover:text-teal-700"
                    >
                      تواصل الان
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Funding Progress Card */}
            <Card className="border-none shadow-xl bg-white sticky top-24">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center mb-2">
                  <Badge
                    variant="outline"
                    className="text-slate-500 border-slate-200"
                  >
                    <Clock className="w-3 h-3 ml-1" />
                    جاري التمويل
                  </Badge>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-slate-400 hover:text-teal-600"
                    onClick={handleShare}
                  >
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
                <CardTitle className="text-3xl font-bold text-teal-700 dir-ltr text-right">
                  {formatCurrency(totalAmount)}
                </CardTitle>
                <p className="text-sm text-slate-500 text-right">
                  إجمالي المبلغ المطلوب
                </p>
              </CardHeader>

              <CardContent className="space-y-6 pt-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-medium">
                    <span className="text-slate-700">
                      تم جمع {Math.round(progressPercentage)}%
                    </span>
                    <span className="text-slate-500 dir-ltr">
                      {formatCurrency(collectedAmount)}
                    </span>
                  </div>
                  <Progress
                    value={progressPercentage}
                    className="h-3 bg-slate-100"
                  />
                </div>

                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <div className="flex justify-between items-center py-2 px-3 bg-slate-50 rounded-lg">
                    <span className="text-sm text-slate-600 flex items-center gap-2">
                      <Wallet className="w-4 h-4 text-teal-600" />
                      أقل مساهمة ممكنة
                    </span>
                    <span className="font-bold text-slate-800 dir-ltr text-sm">
                      {formatCurrency(investment.contribution || 0)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-2 px-3 bg-slate-50 rounded-lg">
                    <span className="text-sm text-slate-600 flex items-center gap-2">
                      <Coins className="w-4 h-4 text-teal-600" />
                      الربح المتوقع
                    </span>
                    <span className="font-bold text-emerald-600 dir-ltr text-sm">
                      12% - 18% سنوياً
                    </span>
                  </div>
                </div>

                <div className="pt-2">
                  <ContactInvestor investment={investment} />
                </div>

                <p className="text-xs text-center text-slate-400 px-4 leading-relaxed">
                  بالاستثمار في هذا المشروع، أنت توافق على الشروط والأحكام
                  الخاصة بمنصة ZProperty.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
