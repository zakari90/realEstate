"use client";
import { Button } from "@/components/ui/button";
import { useAgentInvestmentStore } from "@/context/investementStore";
import { useAgentStore } from "@/context/propertyStore";
import {
  ArrowUpRight,
  Building2,
  Loader2,
  Plus,
  TrendingUp,
  User,
} from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

function AgentPage() {
  const { agent, agentProperties, error, isLoading, fetchAgentData } =
    useAgentStore();
  const { agentInvestments, fetchAgentInvestemtData } =
    useAgentInvestmentStore();

  useEffect(() => {
    fetchAgentData();
    fetchAgentInvestemtData();
  }, [fetchAgentData, fetchAgentInvestemtData]);

  if (isLoading)
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="size-12 animate-spin text-teal-600" />
      </div>
    );
  if (error)
    return (
      <div className="text-red-500 font-semibold text-center py-10">
        خطأ: {error}
      </div>
    );

  const numberOfInvestments = agentInvestments.investment.length
    ? agentInvestments.investment.length + ""
    : "0";
  const numberOfProprties = agentProperties.properties.length
    ? agentProperties.properties.length + ""
    : "0";

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-teal-500 to-emerald-600 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border-2 border-white/30 shadow-inner">
              <User className="w-10 h-10 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-1">
                مرحباً، {agent?.name || "وكيل"} 👋
              </h1>
              <p className="text-teal-100 opacity-90">
                مرحباً بك في لوحة التحكم الخاصة بك
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button
              asChild
              className="bg-white/20 hover:bg-white/30 text-white border-0 backdrop-blur-md shadow-lg transition-all duration-300"
            >
              <Link href="/agent/properties/new">
                <Plus className="w-4 h-4 ml-2" />
                إضافة ملكية
              </Link>
            </Button>
            <Button
              asChild
              className="bg-white text-teal-700 hover:bg-gray-100 shadow-lg border-0 transition-all duration-300"
            >
              <Link href="/agent/investors/new">
                <Plus className="w-4 h-4 ml-2" />
                إنشاء استثمار
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col space-y-2">
        <h2 className="text-2xl font-bold text-slate-800">نظرة عامة</h2>
        <p className="text-slate-500">ملخص لأدائك الحالي</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DashboardCard
          title="الملكيات النشطة"
          count={numberOfProprties}
          href="/agent/properties"
          icon={Building2}
          color="from-blue-500 to-indigo-600"
          subtitle="إجمالي العقارات المعروضة"
        />
        <DashboardCard
          title="فرص الاستثمار"
          count={numberOfInvestments}
          href="/agent/investors"
          icon={TrendingUp}
          color="from-rose-500 to-pink-600"
          subtitle="مشاريع استثمارية جارية"
        />
      </div>
    </div>
  );
}

export default AgentPage;

type DashboardCardProps = {
  title: string;
  count: string;
  href: string;
  icon: any;
  color: string;
  subtitle: string;
};

function DashboardCard({
  title,
  count,
  href,
  icon: Icon,
  color,
  subtitle,
}: DashboardCardProps) {
  return (
    <Link href={href} className="group block h-full">
      <div className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-slate-100 h-full">
        <div
          className={`absolute top-0 right-0 w-2 h-full bg-gradient-to-b ${color}`}
        ></div>
        <div className="flex items-start justify-between">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-slate-600 mb-1">
                {title}
              </h3>
              <p className="text-3xl font-bold text-slate-900">{count}</p>
            </div>
            <p className="text-sm text-slate-400 font-medium">{subtitle}</p>
          </div>
          <div
            className={`p-4 rounded-2xl bg-gradient-to-br ${color} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}
          >
            <Icon className="w-8 h-8" />
          </div>
        </div>
        <div className="mt-6 flex items-center text-sm font-medium text-blue-600 group-hover:translate-x-1 transition-transform duration-300">
          عرض التفاصيل
          <ArrowUpRight className="w-4 h-4 mr-1" />
        </div>
      </div>
    </Link>
  );
}
