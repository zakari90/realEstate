"use client";

import { getAllProperties, PropertyDTO } from "@/_actions/client/actions";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useState } from 'react';
import CardSkeleton from "./cardSkeleton";
import PropertyCard from "./propertyCard";

export default function MainPropertiesSection() {
  const rowsPerPage = 12;
  const [startIndex, setStartIndex] = useState(0);
  const [properties, setProperties] = useState<PropertyDTO[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      const p = await getAllProperties();
      setProperties(p);
      setLoading(false);
    };
    fetchProperties();
  }, []);
  
  const endIndex = Math.min(startIndex + rowsPerPage, properties.length);

  const handlePrevious = () => {
    setStartIndex((prev) => Math.max(prev - rowsPerPage, 0));
  };

  const handleNext = () => {
    setStartIndex((prev) => Math.min(prev + rowsPerPage, properties.length - rowsPerPage));
  };

  return (
    <section id="properties" className="space-y-4 mt-8 md:mt-16">
      <div className="container mx-auto px-4">
        {/* <PageHeader>All properties</PageHeader> */}
        {loading ? (
          <div className="grid grid-cols-1 mx-auto md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </div>
        ) : properties.length > 0 ? (
          <div className="grid grid-cols-1 mx-auto md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.slice(startIndex, endIndex).map(property => (
              <div key={property.id}>
                <PropertyCard property={property} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center">
            <p>لا توجد ملكيات</p>
          </div>
        )}

        <Pagination className="mt-3 mb-3">
          <PaginationContent>
            <PaginationItem>
              <Button
                onClick={handlePrevious}
                disabled={startIndex === 0}
              >
                <ArrowLeft className='h-4 w-4' />
              </Button>
            </PaginationItem>

            <PaginationItem>
              <Button
                onClick={handleNext}
                disabled={endIndex >= properties.length}
              >
                <ArrowRight className='h-4 w-4' />
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </section>
  );
}
