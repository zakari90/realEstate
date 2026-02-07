"use client";

import { InvestmentDTO, getAllInvestments } from "@/_actions/client/actions";
import CardSkeleton from "@/components/cardSkeleton";
import InvestmentCard from "@/components/investorsCard";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

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
    setStartIndex((prev) =>
      Math.min(prev + rowsPerPage, investmentsData.length - rowsPerPage),
    );
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
          ) : investmentsData.length > 0 ? (
            <div className="grid grid-cols-1 mx-auto md:grid md:grid-cols-3 lg:grid-cols-4 gap-4">
              {investmentsData.slice(startIndex, endIndex).map((investment) => (
                <div key={investment.id}>
                  <InvestmentCard investment={investment} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center">
              <p>لا توجد نتائج</p>
            </div>
          )}
          <Pagination className="mt-3 mb-3">
            <PaginationContent>
              <PaginationItem>
                <Button onClick={handlePrevious} disabled={startIndex === 0}>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </PaginationItem>

              <PaginationItem>
                <Button
                  onClick={handleNext}
                  disabled={endIndex >= investmentsData.length}
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </section>
    </>
  );
}

export default Page;
