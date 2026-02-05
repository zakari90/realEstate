"use client";

import { createInvestment } from "@/_actions/agent/actions";
import { Button } from "@/components/ui/button";
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

const investementFormSchema = z.object({
  title           : z.string().min(2, { message: "يجب أن يكون العنوان مكونًا من حرفين على الأقل.",}),
  description     : z.string().min(10, { message: "يجب أن يكون الوصف مكونًا من 10 أحرف على الأقل.",}),
  price           : z.number().positive({ message: "يجب أن يكون السعر رقمًا إيجابيًا.",}),
  contribution    : z.number().positive({ message: "يجب أن تكون المساهمة رقمًا إيجابيًا.",}),
  numContributors : z.number().int().positive({ message: "يجب أن يكون عدد المساهمين عددًا صحيحًا إيجابيًا.",}),
  location        : z.string().min(2, {message: "يجب أن يكون الموقع مكونًا من حرفين على الأقل.",}),
  purpose         :  z.string().min(1, { message: "يرجى اختيار غرض لهذا الاستثمار" }),
});

const selectItems = {
  housing: "للسكن",
  investment: "للاستثمار",
  commercial: "للاستخدام التجاري",
  other: "أخرى"
};
export type investementForm = z.infer<typeof investementFormSchema>

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
        description: "تم نشر فرصة الاستثمار ي بنجاح.",
        duration: 1000,
        variant: "default",
      });
      redirect(`/investments/${response.message}`)
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
    <Card className="w-full max-w-2xl mx-auto">
    <CardHeader>
      <CardTitle>نشر فرصة</CardTitle>
      <CardDescription>
        شارك فرصة استثمار جديدة مع المساهمين المحتملين.
      </CardDescription>
    </CardHeader>
    <CardContent>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>عنوان </FormLabel>
                <FormControl>
                  <Input placeholder="أدخل عنوان " {...field} />
                </FormControl>
                <FormDescription>
                  قدم عنوانًا موجزًا للاستثمار .
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>الوصف</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="وصف "
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  قدم وصفًا تفصيليًا للاستثمار.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>المبلغ الإجمالي </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="أدخل المبلغ الإجمالي "
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormDescription>
                  أدخل المبلغ الإجمالي  بالدرهم.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="contribution"
            render={({ field }) => (
              <FormItem>
                <FormLabel>مساهمتك</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="أدخل مساهمتك"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormDescription>
                  أدخل المبلغ الذي ترغب في المساهمة به بالدرهم.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="numContributors"
            render={({ field }) => (
              <FormItem>
                <FormLabel>عدد المستثمرين أو الشركاءالمطلوبين</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="أدخل عدد المستثمرين أو الشركاءالمطلوبين"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormDescription>
                  حدد عدد عدد المستثمرين أو الشركاءالذين تبحث عنهم.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>موقع </FormLabel>
                <FormControl>
                  <Input placeholder="أدخل موقع " {...field} />
                </FormControl>
                <FormDescription>
                  على سبيل المثال: المدينة، الجهة.
                </FormDescription>
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
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر الغرض من هذا الاستثمار" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                  {Object.entries(selectItems).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  اختر الغرض الرئيسي لهذا الاستثمار ي.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "جارٍ النشر..." : "نشر الفرصة"}
          </Button>
        </form>
      </Form>
    </CardContent>
    <CardFooter className="flex justify-between">
      <p className="text-sm text-muted-foreground">
        جميع الحقول مطلوبة. يرجى التأكد من دقة المعلومات.
      </p>
    </CardFooter>
  </Card>
  );
}


const CustomToast = ({ title, description }: { title: string; description: string }) => (
  <div className="flex flex-col gap-1">
    <h3 className="font-semibold text-lg">{title}</h3>
    <p className="text-sm text-gray-500">{description}</p>
  </div>
);
