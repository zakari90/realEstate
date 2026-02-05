"use client";
import { getAllProperties, PropertyDTO } from "@/_actions/client/actions";
import { PageHeader } from "@/components/pageHeader";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from "react";
import PropertyCard from "./propertyCard";
import { Separator } from "@radix-ui/react-select";

export default function RecentPropertiesSection() {
  const [properties, setProperties] = useState<PropertyDTO[]>([]);

  useEffect(() => {
    const fetchProperties = async () => {
      const p = await getAllProperties();
      if (p.length > 4) {
        setProperties(p.slice(-4));
      }
      setProperties(p)
    };

    fetchProperties();
  }, []);

  return (
    <section id="properties" className="space-y-4 mt-8 md:mt-16">
      <div className="container mx-auto px-4">

        <div className="flex justify-between items-center mb-8">
          <PageHeader>ملكيات</PageHeader>
          <Button asChild size="sm">
            <Link href="/properties">
              عرض الكل
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <Separator/>
        <div className=" grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map(property => (
            <div key={property.id}>
              <PropertyCard property={property} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

