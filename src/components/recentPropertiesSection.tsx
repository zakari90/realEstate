"use client";
import { getAllProperties, PropertyDTO } from "@/_actions/client/actions";
import { PageHeader } from "@/components/pageHeader";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowUpRight, Building2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import PropertyCard from "./propertyCard";

export default function RecentPropertiesSection() {
  const [properties, setProperties] = useState<PropertyDTO[]>([]);

  useEffect(() => {
    const fetchProperties = async () => {
      const p = await getAllProperties();
      if (p.length > 4) {
        setProperties(p.slice(-4));
      } else {
        setProperties(p);
      }
    };

    fetchProperties();
  }, []);

  return (
    <section
      id="properties"
      className="py-16 md:py-24 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden"
    >
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="p-1.5 bg-teal-50 rounded-lg">
                <Building2 className="w-5 h-5 text-teal-600" />
              </span>
              <span className="text-sm font-semibold text-teal-600 tracking-wide uppercase">
                عقارات مميزة
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              أحدث الملكيات المضافة
            </h2>
          </div>

          <Button
            asChild
            variant="ghost"
            className="group text-teal-700 hover:text-teal-800 hover:bg-teal-50 hidden md:flex"
          >
            <Link href="/properties" className="flex items-center gap-2">
              عرض جميع العقارات
              <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
            </Link>
          </Button>
        </div>

        {properties.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {properties.map((property) => (
              <div key={property.id} className="flex justify-center h-full">
                <PropertyCard property={property} />
              </div>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200">
            <p className="text-slate-500">لا توجد عقارات لعرضها حالياً</p>
          </div>
        )}

        <div className="mt-8 text-center md:hidden">
          <Button
            asChild
            variant="outline"
            className="w-full border-teal-200 text-teal-700 hover:bg-teal-50"
          >
            <Link href="/properties">عرض الكل</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
