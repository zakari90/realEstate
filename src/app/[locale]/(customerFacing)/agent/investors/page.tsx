"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Loader2, Plus, TrendingUp, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAgentInvestmentStore } from "@/context/investementStore";
import InvestmentMainTableComponent from "@/components/investmentTable";
import { PhoneRegistration } from "@/components/agent/PhoneRegistration";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function InvestmentPage() {
  const { agent, agentInvestments, error, isLoading, fetchAgentInvestemtData } =
    useAgentInvestmentStore();

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchAgentInvestemtData();
  }, [fetchAgentInvestemtData]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="size-12 animate-spin text-teal-600" />
          <p className="text-slate-500 font-medium">
            جارٍ تحميل الاستثمارات...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-[50vh] text-center px-4">
        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
          <Briefcase className="w-8 h-8 text-red-500" />
        </div>
        <h2 className="text-xl font-bold text-slate-800 mb-2">
          حدث خطأ أثناء تحميل البيانات
        </h2>
        <p className="text-slate-500 max-w-md mb-6">{error}</p>
        <Button
          onClick={() => fetchAgentInvestemtData()}
          variant="outline"
          className="border-slate-200 hover:bg-slate-50 text-slate-700"
        >
          إعادة المحاولة
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8 min-h-screen">
      {/* Breadcrumb / Header Section */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-sm text-slate-400">
          <Link href="/agent" className="hover:text-teal-600 transition-colors">
            الرئيسية
          </Link>
          <span>/</span>
          <span className="text-slate-600 font-medium">فرص الاستثمار</span>
        </div>
      </div>

      {!agent?.phone ? (
        <PhoneRegistration onSuccess={fetchAgentInvestemtData} />
      ) : (
        <>
          {/* Hero Banner */}
          <div className="bg-gradient-to-r from-rose-500 to-pink-600 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-rose-900/10 rounded-full blur-2xl translate-y-1/3 -translate-x-1/4"></div>

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 shadow-inner">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold mb-1">إعلانات الاستثمار</h1>
                  <p className="text-rose-100 opacity-90 text-lg">
                    لديك {agentInvestments.investment.length} فرصة استثمارية
                    نشطة
                  </p>
                </div>
              </div>

              <Button
                asChild
                className="bg-white text-rose-600 hover:bg-rose-50 shadow-lg border-0 transition-all duration-300 h-12 px-6 text-base font-semibold group"
              >
                <Link href="/agent/investors/new">
                  <Plus className="w-5 h-5 ml-2 group-hover:rotate-90 transition-transform duration-300" />
                  إنشاء استثمار جديد
                </Link>
              </Button>
            </div>
          </div>

          {/* Main Content Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            {/* Toolbar */}
            <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 bg-slate-50/30">
              <div className="relative w-full md:w-96">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input
                  placeholder="بحث في الاستثمارات..."
                  className="pr-10 h-11 bg-white border-slate-200 focus:border-rose-500 focus:ring-rose-500/20"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Table Content */}
            <div className="p-1">
              {agentInvestments.investment.length > 0 ? (
                <InvestmentMainTableComponent
                  investments={agentInvestments.investment}
                />
              ) : (
                <div className="py-20 flex flex-col items-center text-center">
                  <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                    <Briefcase className="w-10 h-10 text-slate-300" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-700 mb-2">
                    لا توجد مشاريع استثمارية
                  </h3>
                  <p className="text-slate-500 max-w-sm mb-8">
                    أنشئ فرصًا استثمارية جديدة واجذب المستثمرين إلى مشاريعك
                    العقارية المميزة.
                  </p>
                  <Button
                    asChild
                    variant="outline"
                    className="border-dashed border-2 border-rose-200 text-rose-600 hover:border-rose-500 hover:bg-rose-50 h-12 px-8"
                  >
                    <Link href="/agent/investors/new">
                      <Plus className="w-4 h-4 ml-2" />
                      إضافة استثمار الآن
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
