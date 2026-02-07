"use client";
import { getAllInvestments, InvestmentDTO } from "@/_actions/client/actions";
import { PageHeader } from "@/components/pageHeader";
import { Button } from "@/components/ui/button";
import { ArrowLeft, TrendingUp } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import InvestmentCard from "./investorsCard";

export default function RecentInvestmentSection() {
  const [investments, setInvestments] = useState<InvestmentDTO[]>([]);

  useEffect(() => {
    const fetchInvestments = async () => {
      const data = await getAllInvestments();
      if (data.length > 4) {
        setInvestments(data.slice(-4));
      } else {
        setInvestments(data);
      }
    };

    fetchInvestments();
  }, []);

  return (
    <section
      id="investments"
      className="py-16 md:py-24 bg-rose-50/50 relative overflow-hidden"
    >
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-rose-100/40 to-transparent pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-rose-200/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="p-1.5 bg-rose-100/80 rounded-lg">
                <TrendingUp className="w-5 h-5 text-rose-600" />
              </span>
              <span className="text-sm font-semibold text-rose-600 tracking-wide uppercase">
                فرص استثمارية
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              أحدث مشاريع الاستثمار
            </h2>
          </div>

          <Button
            asChild
            variant="ghost"
            className="group text-rose-700 hover:text-rose-800 hover:bg-rose-100 hidden md:flex"
          >
            <Link href="/investments" className="flex items-center gap-2">
              عرض جميع الفرص
              <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
            </Link>
          </Button>
        </div>

        {investments.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {investments.map((investment) => (
              <div key={investment.id} className="h-full">
                <InvestmentCard investment={investment} />
              </div>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center bg-white/50 rounded-2xl border border-dashed border-rose-200">
            <p className="text-slate-500">لا توجد مشاريع استثمارية حالياً</p>
          </div>
        )}

        <div className="mt-8 text-center md:hidden">
          <Button
            asChild
            variant="outline"
            className="w-full border-rose-200 text-rose-700 hover:bg-rose-50"
          >
            <Link href="/investments">عرض الكل</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
