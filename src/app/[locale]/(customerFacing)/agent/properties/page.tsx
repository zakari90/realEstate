"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Building2, Home, Loader2, Plus, Search } from "lucide-react";
import { PageHeader } from "@/components/pageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAgentStore } from "@/context/propertyStore";
import MainTableComponent from "@/components/mainTable";
import { PhoneRegistration } from "@/components/agent/PhoneRegistration";

export default function PropertiesPage() {
  const { agent, agentProperties, error, isLoading, fetchAgentData } =
    useAgentStore();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchAgentData();
  }, [fetchAgentData]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="size-12 animate-spin text-teal-600" />
          <p className="text-slate-500 font-medium">جارٍ تحميل العقارات...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-[50vh] text-center px-4">
        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
          <Building2 className="w-8 h-8 text-red-500" />
        </div>
        <h2 className="text-xl font-bold text-slate-800 mb-2">
          حدث خطأ أثناء تحميل البيانات
        </h2>
        <p className="text-slate-500 max-w-md mb-6">{error}</p>
        <Button
          onClick={() => fetchAgentData()}
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
          <span className="text-slate-600 font-medium">العقارات</span>
        </div>
      </div>

      {!agent?.phone ? (
        <PhoneRegistration onSuccess={fetchAgentData} />
      ) : (
        <>
          {/* Hero Banner */}
          <div className="bg-gradient-to-r from-teal-600 to-emerald-600 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-teal-900/10 rounded-full blur-2xl translate-y-1/3 -translate-x-1/4"></div>

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 shadow-inner">
                  <Building2 className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold mb-1">إدارة العقارات</h1>
                  <p className="text-teal-100 opacity-90 text-lg">
                    لديك {agentProperties.properties.length} عقار مسجل في قائمتك
                  </p>
                </div>
              </div>

              <Button
                asChild
                className="bg-white text-teal-700 hover:bg-teal-50 shadow-lg border-0 transition-all duration-300 h-12 px-6 text-base font-semibold group"
              >
                <Link href="/agent/properties/new">
                  <Plus className="w-5 h-5 ml-2 group-hover:rotate-90 transition-transform duration-300" />
                  إضافة عقار جديد
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
                  placeholder="بحث عن عقار..."
                  className="pr-10 h-11 bg-white border-slate-200 focus:border-teal-500 focus:ring-teal-500/20"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              {/* Add filter buttons here later if needed */}
            </div>

            {/* Table Content */}
            <div className="p-1">
              {agentProperties.properties.length > 0 ? (
                <MainTableComponent properties={agentProperties.properties} />
              ) : (
                <div className="py-20 flex flex-col items-center text-center">
                  <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                    <Home className="w-10 h-10 text-slate-300" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-700 mb-2">
                    لا توجد عقارات مضافة بعد
                  </h3>
                  <p className="text-slate-500 max-w-sm mb-8">
                    ابدأ بإضافة عقارك الأول إلى المنصة ليصل إلى آلاف العملاء
                    المهتمين.
                  </p>
                  <Button
                    asChild
                    variant="outline"
                    className="border-dashed border-2 border-teal-200 text-teal-700 hover:border-teal-500 hover:bg-teal-50 h-12 px-8"
                  >
                    <Link href="/agent/properties/new">
                      <Plus className="w-4 h-4 ml-2" />
                      إضافة عقار الآن
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
