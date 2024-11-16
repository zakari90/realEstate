"use client";

import { InvestmentDTO, getAllInvestments } from "@/_actions/client/actions"; // Ensure you import the correct action
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { CardSkeleton } from "../_components/property/propertyCard";
import PropertyInvestmentCard from "./_components/investorsCard";

function Page() {
  const rowsPerPage = 12;
  const [startIndex, setStartIndex] = useState(0);
  const [investmentsData, setInvestmentsData] = useState<InvestmentDTO[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvestments = async () => {
      setLoading(true);
      try {
        const investmentsData = await getAllInvestments();
        setInvestmentsData(investmentsData);
      } catch (error) {
        console.error("Failed to fetch investments:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchInvestments();
  }, []);

  const endIndex = Math.min(startIndex + rowsPerPage, investmentsData.length);

  const handlePrevious = () => {
    setStartIndex((prev) => Math.max(prev - rowsPerPage, 0));
  };

  const handleNext = () => {
    setStartIndex((prev) => Math.min(prev + rowsPerPage, investmentsData.length - rowsPerPage));
  };

  return (
    <>
        <section id="investments" className="space-y-4 mt-8 md:mt-16">
      <div className="container mx-auto px-4">
        {loading ? (
          <div className="grid grid-cols-1 mx-auto md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </div>
        ) : (
          <div className="grid grid-cols-1 mx-auto md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {investmentsData.slice(startIndex, endIndex).map((investment) => (
              <div key={investment.id}>
                <PropertyInvestmentCard
                  id={investment.id}
                  title={investment.title || ""}
                  description={investment.description || ""}
                  price={investment.price || 0}
                  contribution={investment.contribution || 0}
                  numContributors={investment.numContributors || 0}
                  location={investment.location || ""}
                  purpose={investment.purpose || ""}
                  currentContribution={10}
                />
              </div>
            ))}
          </div>
        )}
        <Pagination className="mt-3 mb-3">
          <PaginationContent>
            <PaginationItem>
              <Button onClick={handlePrevious} disabled={startIndex === 0}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </PaginationItem>

            <PaginationItem>
              <Button
                onClick={handleNext}
                disabled={endIndex >= investmentsData.length}
              >
                <ArrowRight className="h-4 w-4" />
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </section>
    </>

  );
}


export default Page