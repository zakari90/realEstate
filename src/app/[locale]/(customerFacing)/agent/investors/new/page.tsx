"use client";

import { createInvestment } from "@/_actions/agent/actions";
import { investementForm, investementFormSchema } from "@/types/zodSchema";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Loader2, MapPin, Users, Info } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const selectItems = {
  housing: "للسكن",
  investment: "للاستثمار",
  commercial: "للاستخدام التجاري",
  other: "أخرى",
};

export default function PropertyOpportunityForm() {
  const [loading, setLoading] = useState(false);

  const form = useForm<investementForm>({
    resolver: zodResolver(investementFormSchema),
    defaultValues: {
      title: "",
      description: "",
      price: undefined,
      contribution: undefined,
      numContributors: undefined,
      location: "",
      purpose: undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof investementFormSchema>) {
    setLoading(true);

    try {
      const investmentData = {
        ...values,
      };

      const response = await createInvestment(investmentData);

      toast({
        title: "تم نشر الفرصة",
        description: "تم نشر فرصة الاستثمار بنجاح.",
        duration: 1000,
        variant: "default",
      });
      redirect(`/investments/${response.message}`);
    } catch (error) {
      console.error("خطأ أثناء نشر الفرصة:", error);
      toast({
        title: "خطأ",
        description: "فشل نشر الفرصة. يرجى المحاولة مرة أخرى.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="w-full max-w-3xl mx-auto shadow-2xl border-none overflow-hidden ring-1 ring-slate-100">
        <div className="absolute top-0 w-full h-2 bg-gradient-to-r from-teal-500 via-emerald-500 to-teal-500"></div>

        <CardHeader className="bg-slate-50/50 pb-8 pt-10 border-b border-slate-100 mb-6">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-teal-100 to-emerald-100 rounded-2xl flex items-center justify-center mb-4 shadow-sm">
              <LayoutDashboard className="w-8 h-8 text-teal-600" />
            </div>
            <CardTitle className="text-3xl font-bold text-slate-800 mb-2">
              نشر فرصة استثمارية
            </CardTitle>
            <CardDescription className="text-base text-slate-500 max-w-md mx-auto">
              شارك فرصة استثمارية جديدة مع شبكة المساهمين المتنامية لدينا بأسلوب
              احترافي.
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="px-6 md:px-10 pb-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Basic Info Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-700 flex items-center gap-2 pb-2 border-b border-slate-100">
                  <span className="w-8 h-8 rounded-full bg-teal-50 flex items-center justify-center text-teal-600 text-sm">
                    01
                  </span>
                  المعلومات الأساسية
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel>عنوان الفرصة</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="مثال: شقة فاخرة للإيجار بوسط المدينة"
                            {...field}
                            className="h-12 border-slate-200 focus:border-teal-500 focus:ring-teal-500/20"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>الموقع</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <MapPin className="absolute right-3 top-3.5 w-5 h-5 text-slate-400" />
                            <Input
                              placeholder="المدينة، الحي"
                              {...field}
                              className="pr-10 h-12 border-slate-200 focus:border-teal-500 focus:ring-teal-500/20"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="purpose"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>الغرض من الاستثمار</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="h-12 border-slate-200 focus:border-teal-500 focus:ring-teal-500/20">
                              <SelectValue placeholder="اختر الغرض" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {Object.entries(selectItems).map(
                              ([value, label]) => (
                                <SelectItem key={value} value={value}>
                                  {label}
                                </SelectItem>
                              ),
                            )}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel>الوصف التفصيلي</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="صف الميزات الرئيسية والعائد المتوقع..."
                            className="resize-none min-h-[120px] border-slate-200 focus:border-teal-500 focus:ring-teal-500/20 p-4"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Financial Info Section */}
              <div className="space-y-4 pt-4">
                <h3 className="text-lg font-semibold text-slate-700 flex items-center gap-2 pb-2 border-b border-slate-100">
                  <span className="w-8 h-8 rounded-full bg-teal-50 flex items-center justify-center text-teal-600 text-sm">
                    02
                  </span>
                  التفاصيل المالية
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>المبلغ الإجمالي</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <span className="absolute left-3 top-3.5 text-slate-400 text-sm font-semibold">
                              د.م
                            </span>
                            <Input
                              type="number"
                              placeholder="0.00"
                              {...field}
                              onChange={(e) =>
                                field.onChange(Number(e.target.value))
                              }
                              className="pl-12 h-12 border-slate-200 focus:border-teal-500 focus:ring-teal-500/20 font-mono"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="contribution"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>مساهمتك الحالية</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <span className="absolute left-3 top-3.5 text-slate-400 text-sm font-semibold">
                              د.م
                            </span>
                            <Input
                              type="number"
                              placeholder="0.00"
                              {...field}
                              onChange={(e) =>
                                field.onChange(Number(e.target.value))
                              }
                              className="pl-12 h-12 border-slate-200 focus:border-teal-500 focus:ring-teal-500/20 font-mono"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="numContributors"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>عدد الشركاء المطلوب</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Users className="absolute right-3 top-3.5 w-5 h-5 text-slate-400" />
                            <Input
                              type="number"
                              placeholder="مثال: 3"
                              {...field}
                              onChange={(e) =>
                                field.onChange(Number(e.target.value))
                              }
                              className="pr-10 h-12 border-slate-200 focus:border-teal-500 focus:ring-teal-500/20"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="pt-6">
                <Button
                  type="submit"
                  className="w-full h-14 text-lg bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white shadow-lg rounded-xl transition-all duration-300"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="ml-2 h-5 w-5 animate-spin" />
                      جارٍ النشر...
                    </>
                  ) : (
                    "نشر الفرصة الاستثمارية"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="bg-slate-50/50 p-6 flex justify-center border-t border-slate-100">
          <p className="text-sm text-slate-400 flex items-center gap-2">
            <Info className="w-4 h-4" />
            جميع الحقول مطلوبة لضمان جودة الفرص المعروضة على المنصة
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

const CustomToast = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <div className="flex flex-col gap-1">
    <h3 className="font-semibold text-lg">{title}</h3>
    <p className="text-sm text-gray-500">{description}</p>
  </div>
);
