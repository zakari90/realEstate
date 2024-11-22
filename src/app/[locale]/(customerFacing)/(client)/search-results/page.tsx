"use client";

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation'; // Access query parameters from the URL
import { Pagination, PaginationContent, PaginationItem } from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { searchPropertiesByLocation, searchInvestmentsByLocation, PropertyDTO, InvestmentDTO } from "@/_actions/client/actions";
import CardSkeleton from '../investments/_components/cardSkeleton';
import { PropertyCard } from '../properties/_components/propertyCard';
import InvestmentCard from '../investments/_components/investorsCard';

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

  // Fetch the data based on the query parameters
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      if (isProperty && location) {
        const propertyResults = await searchPropertiesByLocation(location);
        setProperties(propertyResults);
      }

      if (isInvestment && location) {
        const investmentResults = await searchInvestmentsByLocation(location);
        setInvestments(investmentResults);
      }

      setLoading(false);
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
        <h1 className="text-3xl font-bold text-center mb-6">Search Results for: {location}</h1>

        {/* Loading skeleton or content */}
        {loading ? (
          <div className="grid grid-cols-1 mx-auto md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </div>
        ) : (
          <>
            {/* Show Properties Section */}
            {isProperty && properties.length > 0 && (
              <div>
                <h2 className="text-2xl font-semibold mb-4">Properties</h2>
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
            {isInvestment && investments.length > 0 && (
              <div>
                <h2 className="text-2xl font-semibold mb-4">Investments</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {investments.slice(startIndex, endIndex).map((investment) => (
                    <div key={investment.id}>
                      <InvestmentCard investment={investment} /> {/* Modify PropertyCard to handle investments */}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* No results */}
            {properties.length === 0 && investments.length === 0 && (
              <div className="text-center">
                <p>No results found.</p>
              </div>
            )}
          </>
        )}

        {/* Pagination */}
        {(properties.length > 0 || investments.length > 0) && (
          <Pagination className="mt-3 mb-3">
            <PaginationContent>
              <PaginationItem>
                <Button onClick={handlePrevious} disabled={startIndex === 0}>
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </PaginationItem>

              <PaginationItem>
                <Button onClick={handleNext} disabled={endIndex >= properties.length + investments.length}>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </section>
  );
}
