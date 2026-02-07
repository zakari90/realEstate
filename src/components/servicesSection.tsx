"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Home, DollarSign, TrendingUp, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { PageHeader } from "./pageHeader";

const services = [
  {
    title: "بيع عقارك",
    icon: DollarSign,
    description:
      "قم بإدراج عقارك وابدأ في الوصول إلى الآلاف من المشترين المحتملين.",
    action: "إدراج الآن",
    href: "/agent", // Keep as agent portal
    color: "teal",
  },
  {
    title: "شراء عقار",
    icon: Home,
    description: "ابحث عن منزل أحلامك من خلال قوائمنا الواسعة وقدم عروض مخصصة.",
    action: "تصفح العقارات",
    href: "/properties", // Corrected link
    color: "blue",
  },
  {
    title: "الاستثمار", // Changed title to be more clear
    icon: TrendingUp, // Changed icon to match Investment sections
    description: "اكتشف فرص استثمارية عقارية واعدة وحقق عوائد مجزية.",
    action: "فرص الاستثمار",
    href: "/investments", // Corrected link
    color: "rose",
  },
];

export default function ServiceSection() {
  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-white to-slate-50">
      {/* Decorative background blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-teal-100/30 rounded-full blur-3xl -translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-rose-100/30 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-sm font-bold text-teal-600 uppercase tracking-widest mb-3">
            خدمات شاملة
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            كل ما تحتاجه في عالم العقار
          </h3>
          <p className="text-slate-500 text-lg">
            نقدم حزمة متكاملة من الخدمات لتلبية جميع احتياجاتك العقارية سواء كنت
            بائعاً، مشترياً، أو مستثمراً.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => {
            const Icon = service.icon;

            // Dynamic color classes based on service type
            const iconBg = {
              teal: "bg-teal-50 text-teal-600 group-hover:bg-teal-600 group-hover:text-white",
              blue: "bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white",
              rose: "bg-rose-50 text-rose-600 group-hover:bg-rose-600 group-hover:text-white",
            }[service.color];

            const gradientLine = {
              teal: "from-teal-500",
              blue: "from-blue-500",
              rose: "from-rose-500",
            }[service.color];

            return (
              <Card
                key={service.title}
                className="group relative border-none shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white overflow-hidden rounded-2xl h-full flex flex-col"
              >
                <div
                  className={`absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r ${gradientLine} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                ></div>

                <CardHeader className="pt-10 pb-2 flex-grow-0">
                  <div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300 shadow-sm mx-auto ${iconBg}`}
                  >
                    <Icon className="w-8 h-8 transition-colors duration-300" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-center text-slate-800">
                    {service.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="flex flex-col items-center pb-10 px-8 flex-grow">
                  <p className="text-slate-500 text-center mb-8 leading-relaxed">
                    {service.description}
                  </p>
                  <div className="mt-auto w-full">
                    <Button
                      asChild
                      variant="outline"
                      className="w-full border-slate-200 hover:bg-slate-900 hover:text-white transition-all duration-300 rounded-xl h-12 group/btn"
                    >
                      <Link
                        href={service.href}
                        className="flex items-center justify-center gap-2"
                      >
                        {service.action}
                        <ArrowLeft className="w-4 h-4 transition-transform group-hover/btn:-translate-x-1" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
