"use client";

import { AgentPropertyData } from "@/_actions/agent/actions";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { useState } from "react";
import { PropertyInfoForm } from "./propertyInfoForm";
import { PropertyMediaForm } from "./propertyMediaForm";
import { Building2, Camera, Info, LayoutDashboard } from "lucide-react";

export default function PropertyListingForm() {
  const [propertyId, setPropertyId] = useState<string>("");
  const [step, setStep] = useState(1);

  const setstep = (step: number) => {
    setStep(step);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-2xl border-none overflow-hidden ring-1 ring-slate-100">
      <div className="absolute top-0 w-full h-2 bg-gradient-to-r from-teal-500 via-emerald-500 to-teal-500"></div>

      <CardHeader className="bg-slate-50/50 pb-8 pt-10 border-b border-slate-100 mb-6">
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-teal-100 to-emerald-100 rounded-2xl flex items-center justify-center mb-4 shadow-sm">
            <LayoutDashboard className="w-8 h-8 text-teal-600" />
          </div>
          <CardTitle className="text-3xl font-bold text-slate-800 mb-2">
            إضافة ملكية جديدة
          </CardTitle>
          <CardDescription className="text-base text-slate-500 max-w-md mx-auto">
            أضف تفاصيل العقار الجديد للبدء في عرضه للعملاء
          </CardDescription>
        </div>

        {/* Step Indicator */}
        <div className="flex justify-center items-center mt-8 gap-4">
          <div
            className={`flex flex-col items-center gap-2 ${step === 1 ? "text-teal-600" : "text-slate-400"}`}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${step === 1 ? "bg-teal-50 border-teal-500 shadow-md" : "bg-white border-slate-200"}`}
            >
              <Building2 className="w-5 h-5" />
            </div>
            <span className="text-sm font-medium">المعلومات الأساسية</span>
          </div>

          <div
            className={`w-24 h-1 rounded-full ${step >= 2 ? "bg-teal-200" : "bg-slate-100"}`}
          ></div>

          <div
            className={`flex flex-col items-center gap-2 ${step === 2 ? "text-teal-600" : "text-slate-400"}`}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${step === 2 ? "bg-teal-50 border-teal-500 shadow-md" : "bg-white border-slate-200"}`}
            >
              <Camera className="w-5 h-5" />
            </div>
            <span className="text-sm font-medium">الصور والوسائط</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="px-6 md:px-10 pb-8">
        {step === 1 ? (
          <PropertyInfoForm setstep={setstep} setPropertyId={setPropertyId} />
        ) : (
          <PropertyMediaForm propertyId={propertyId} />
        )}
      </CardContent>

      <CardFooter className="bg-slate-50/50 p-6 flex justify-center border-t border-slate-100">
        <p className="text-sm text-slate-400 flex items-center gap-2">
          <Info className="w-4 h-4" />
          جميع الحقول مطلوبة لضمان جودة العقارات المعروضة على المنصة
        </p>
      </CardFooter>
    </Card>
  );
}
