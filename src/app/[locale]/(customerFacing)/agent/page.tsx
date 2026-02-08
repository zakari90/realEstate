"use client";
import { updateAgentData } from "@/_actions/agent/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { useAgentInvestmentStore } from "@/context/investementStore";
import { useAgentStore } from "@/context/propertyStore";
import {
  ArrowUpRight,
  Building2,
  Check,
  Loader2,
  Pencil,
  Phone,
  Plus,
  TrendingUp,
  User,
  X,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

function AgentPage() {
  const { agent, agentProperties, error, isLoading, fetchAgentData } =
    useAgentStore();
  const { agentInvestments, fetchAgentInvestemtData } =
    useAgentInvestmentStore();

  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchAgentData();
    fetchAgentInvestemtData();
  }, [fetchAgentData, fetchAgentInvestemtData]);

  useEffect(() => {
    if (agent?.phone) {
      setPhoneNumber(agent.phone);
    }
  }, [agent]);

  const handleSavePhone = async () => {
    if (!phoneNumber || phoneNumber.trim().length === 0) {
      toast({
        title: "خطأ",
        description: "رقم الهاتف مطلوب ولا يمكن أن يكون فارغاً",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);
    try {
      await updateAgentData(phoneNumber.trim());
      toast({
        title: "تم التحديث",
        description: "تم تحديث رقم الهاتف بنجاح",
      });
      setIsEditingPhone(false);
      fetchAgentData(); // Refresh agent data
    } catch (error) {
      toast({
        title: "خطأ",
        description: "فشل تحديث رقم الهاتف",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancelEdit = () => {
    setPhoneNumber(agent?.phone || "");
    setIsEditingPhone(false);
  };

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

      {/* Phone Number Section */}
      <div className="bg-white rounded-2xl p-6 shadow-md border border-slate-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 text-white shadow-lg">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800">
                رقم الهاتف
              </h3>
              <p className="text-sm text-slate-500">
                رقم الهاتف الذي سيظهر للعملاء
              </p>
            </div>
          </div>

          {isEditingPhone ? (
            <div className="flex items-center gap-3">
              <Input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="أدخل رقم الهاتف"
                className="w-48 h-10 text-left"
                dir="ltr"
                disabled={isSaving}
              />
              <Button
                size="icon"
                variant="ghost"
                onClick={handleSavePhone}
                disabled={isSaving}
                className="h-10 w-10 text-green-600 hover:text-green-700 hover:bg-green-50"
              >
                {isSaving ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Check className="w-5 h-5" />
                )}
              </Button>
              <Button
                size="icon"
                variant="ghost"
                onClick={handleCancelEdit}
                disabled={isSaving}
                className="h-10 w-10 text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <span className="text-lg font-medium text-slate-700" dir="ltr">
                {agent?.phone || "لم يتم تحديد رقم الهاتف"}
              </span>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setIsEditingPhone(true)}
                className="h-10 w-10 text-slate-500 hover:text-teal-600 hover:bg-teal-50"
              >
                <Pencil className="w-5 h-5" />
              </Button>
            </div>
          )}
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
