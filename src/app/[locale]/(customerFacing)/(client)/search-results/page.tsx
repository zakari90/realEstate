"use client";

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation'; // Access query parameters from the URL
import { Pagination, PaginationContent, PaginationItem } from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { searchPropertiesByLocation, searchInvestmentsByLocation, PropertyDTO, InvestmentDTO } from "@/_actions/client/actions";
import CardSkeleton from '@/components/_1inUseComponents/cardSkeleton';
import InvestmentCard from '@/components/_1inUseComponents/investorsCard';
import PropertyCard from '@/components/_1inUseComponents/propertyCard';
import { Separator } from '@/components/ui/separator';

export default function SearchResultsPage() {
  const rowsPerPage = 12;
  const [startIndex, setStartIndex] = useState(0);
  const [properties, setProperties] = useState<PropertyDTO[]>([]);
  const [investments, setInvestments] = useState<InvestmentDTO[]>([]);
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const location = searchParams.get('location');
  const isProperty = searchParams.get('property') === 'true';
  const isInvestment = searchParams.get('investment') === 'true';


  useEffect(() => {
    setStartIndex(0);
    const fetchData = async () => {
      setLoading(true);

      try {
        if (location) {
          if (isProperty) {          
          setProperties(await searchPropertiesByLocation(location));
        }

        if (isInvestment) {
          setInvestments(await searchInvestmentsByLocation(location));
        }
        }

      } catch (error) {
        console.error("Error fetching data:", error);
        // You could handle errors, like setting an error state
      } finally {
        setLoading(false);
      }
    };

    if (location) {
      fetchData();
    }
  }, [location, isProperty, isInvestment]);

  // Pagination calculations
  const endIndex = Math.min(startIndex + rowsPerPage, properties.length + investments.length);

  const handlePrevious = () => {
    setStartIndex((prev) => Math.max(prev - rowsPerPage, 0));
  };

  const handleNext = () => {
    setStartIndex((prev) => Math.min(prev + rowsPerPage, properties.length + investments.length - rowsPerPage));
  };

  return (
    <section className="space-y-4 mt-8 md:mt-16">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <h1 className="text-3xl font-bold text-center mb-6">نتائج: {location}</h1>

        {loading ? (
          <div className="grid grid-cols-1 mx-auto md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: rowsPerPage }).map((_, index) => (
              <CardSkeleton key={index} />
            ))}
          </div>
        ) : (
          <>
            {/* Show Properties Section */}
            {isProperty && properties.length > 0 && (
              <div>
                <h2 className="text-2xl font-semibold mb-4">ملكيات</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {properties.slice(startIndex, endIndex).map((property) => (
                    <div key={property.id}>
                      <PropertyCard property={property} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Show Investments Section */}
            <Separator/>
            {isInvestment && investments.length > 0 && (
              <div>
                <h2 className="text-2xl font-semibold mb-4">الاستثمارات</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {investments.slice(startIndex, endIndex).map((investment) => (
                    <div key={investment.id}>
                      <InvestmentCard investment={investment} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* No results */}
            {properties.length === 0 && isProperty && (
              <div className="text-center">
                <p>لم يتم العثور على ملكيات.</p>
              </div>
            )}
            {investments.length === 0 && isInvestment && (
              <div className="text-center">
                <p>لم يتم العثور على استثمارات.</p>
              </div>
            )}

            {/* If both properties and investments are empty */}
            {properties.length === 0 && investments.length === 0 && (
              <div className="text-center">
                <p>لم يتم العثور على نتائج.</p>
              </div>
            )}
          </>
        )}

        {/* Pagination */}
        {(properties.length > 0 || investments.length > 0) && (
          <Pagination className="mt-3 mb-3">
            <PaginationContent>
              <PaginationItem>
                <Button onClick={handlePrevious} disabled={startIndex === 0} aria-label="Previous page">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </PaginationItem>

              <PaginationItem>
                <Button onClick={handleNext} disabled={endIndex >= properties.length + investments.length} aria-label="Next page">
                <ArrowLeft className="h-4 w-4" />

                </Button>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </section>
  );
}
