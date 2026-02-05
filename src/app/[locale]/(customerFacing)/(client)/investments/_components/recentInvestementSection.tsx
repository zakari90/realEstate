"use client";
import { getAllInvestments, InvestmentDTO } from "@/_actions/client/actions";
import { PageHeader } from "@/components/pageHeader";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from "react";
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

  return (
    <section id="investments" className="space-y-4 mt-8 mb-5 bg-[#FFF8EF] md:mt-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <PageHeader>الاستثمارات
          </PageHeader>
          <Button asChild size="sm">
            <Link href="/investments">
              عرض الكل
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid-cols-2 lg:grid-cols-3 gap-8">
          {investments.map(investment => (
            <div key={investment.id}>
              <InvestmentCard investment={investment} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

