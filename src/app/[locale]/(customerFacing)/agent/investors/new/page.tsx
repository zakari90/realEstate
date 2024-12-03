"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { createInvestment } from "@/_actions/agent/actions";
import Link from "next/link";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  price: z.number().positive({
    message: "Price must be a positive number.",
  }),
  contribution: z.number().positive({
    message: "Contribution must be a positive number.",
  }),
  numContributors: z.number().int().positive({
    message: "Number of contributors must be a positive integer.",
  }),
  location: z.string().min(2, {
    message: "Location must be at least 2 characters.",
  }),
  purpose: z.enum(["housing", "investment", "commercial", "other"], {
    required_error: "Please select a purpose for this investment.",
  }),
});

export default function PropertyOpportunityForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      contribution: 0,
      numContributors: 1,
      location: "",
      purpose: undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    console.log("------------------------");
    
    try {
      const investmentData = {
        ...values,
      };
  
      const response = await createInvestment(investmentData);
      console.log("Response from createInvestment:", response);
  
      toast({
        title: "تم نشر الفرصة",
        description: "تم نشر فرصة الاستثمار العقاري بنجاح.",
        duration: 5000,
        variant: "default",
      });
      router.push("/")
    } catch (error) {
      console.error("Error posting opportunity:", error);
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
      <CardTitle>نشر فرصة عقارية</CardTitle>
      <CardDescription>
        شارك فرصة استثمار عقاري جديدة مع المساهمين المحتملين.
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
                <FormLabel>عنوان العقار</FormLabel>
                <FormControl>
                  <Input placeholder="أدخل عنوان العقار" {...field} />
                </FormControl>
                <FormDescription>
                  قدم عنوانًا موجزًا لفرصة العقار.
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
                    placeholder="وصف العقار"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  قدم وصفًا تفصيليًا للعقار وفرصة الاستثمار.
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
                <FormLabel>السعر الإجمالي للعقار</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="أدخل السعر الإجمالي للعقار"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormDescription>
                  أدخل السعر الإجمالي للعقار بالدولار.
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
                  أدخل المبلغ الذي ترغب في المساهمة به بالدولار.
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
                <FormLabel>المساهمين الإضافيين المطلوبين</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="أدخل عدد المساهمين الإضافيين المطلوبين"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormDescription>
                  حدد عدد المساهمين الإضافيين الذين تبحث عنهم.
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
                <FormLabel>موقع العقار</FormLabel>
                <FormControl>
                  <Input placeholder="أدخل موقع العقار" {...field} />
                </FormControl>
                <FormDescription>
                  قدم موقع العقار (على سبيل المثال: المدينة، الولاية).
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
                    <SelectItem value="housing">للسكن</SelectItem>
                    <SelectItem value="investment">للاستثمار</SelectItem>
                    <SelectItem value="commercial">للاستخدام التجاري</SelectItem>
                    <SelectItem value="other">أخرى</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  اختر الغرض الرئيسي لهذا الاستثمار العقاري.
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
