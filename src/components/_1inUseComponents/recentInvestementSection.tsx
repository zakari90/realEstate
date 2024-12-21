"use client";
import { getAllInvestments, InvestmentDTO } from "@/_actions/client/actions";
import { PageHeader } from "@/components/pageHeader";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, useState } from "react";
import InvestmentCard from "./investorsCard";

export default function RecentInvestmentSection() {
  const [investments, setinvestments] = useState<InvestmentDTO[]>([]);
  
  useEffect(() => {
    const fetchProperties = async () => {
      const p = await getAllInvestments();
      if (p.length > 4) {
        setinvestments(p.slice(-4));
      }
      setinvestments(p)
    };

    fetchProperties();
  }, []);
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1)
    }
  }

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }


  return (
    <section id="investments" className="space-y-4 mt-8 pb-4 pt-4 bg-yellow-50 md:mt-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-4">
          <PageHeader>الاستثمارات
          </PageHeader>
          <Button asChild size="sm">
            <Link href="/investments">
              عرض الكل
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="relative w-full max-w-5xl mx-auto px-4 py-8">
      <div 
        ref={scrollContainerRef} 
        className="flex overflow-x-auto space-x-4 scrollbar-hide"
        onScroll={handleScroll}
      >
          {investments.map(investment => (
            <div key={investment.id}>
              <InvestmentCard investment={investment} />
            </div>
          ))}
    </div>
      {/* <Button
        variant="outline"
        size="icon"
        className={`absolute left-0 top-1/2 -translate-y-1/2 ${!canScrollLeft && 'opacity-50 cursor-not-allowed'}`}
        onClick={() => scroll('left')}
        disabled={!canScrollLeft}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className={`absolute right-0 top-1/2 -translate-y-1/2 ${!canScrollRight && 'opacity-50 cursor-not-allowed'}`}
        onClick={() => scroll('right')}
        disabled={!canScrollRight}
      >
        <ChevronRight className="h-4 w-4" />
      </Button> */}
    </div>
      </div>
    </section>
  );
}

