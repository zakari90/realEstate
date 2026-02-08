"use client";
import { addProperty } from "@/_actions/agent/actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { Label } from "@/components/ui/label";
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
import {
  HelpCircle,
  Minus,
  Plus,
  MapPin,
  Home,
  DollarSign,
  Maximize,
  Bed,
  Bath,
  FileText,
  Layers,
  Loader2,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const propertySchema = z.object({
  type: z.string().min(1, { message: "نوع العقار مطلوب" }),
  sellingBy: z.string().min(1, { message: "طريقة البيع مطلوبة" }),
  numContributors: z
    .number()
    .min(2, { message: "يجب أن يكون عدد المساهمين 2 على الأقل" })
    .optional(),
  price: z.number().positive({ message: "السعر يجب أن يكون رقمًا موجبًا" }),
  address: z.string().min(1, { message: "العنوان مطلوب" }),
  mapLink: z
    .string()
    .url({ message: "يرجى إدخال رابط صالح" })
    .optional()
    .or(z.literal("")),
  bedrooms: z
    .number()
    .int()
    .nonnegative({ message: "عدد غرف النوم يجب أن يكون رقمًا صحيحًا غير سالب" })
    .optional(),
  bathrooms: z
    .number()
    .int()
    .nonnegative({ message: "عدد الحمامات يجب أن يكون رقمًا صحيحًا غير سالب" })
    .optional(),
  area: z
    .number()
    .positive({ message: "المساحة يجب أن تكون رقمًا موجبًا" })
    .optional(),
  description: z.string().optional(),
  features: z.array(z.string()).optional(),
});

export type PropertyFormData = z.infer<typeof propertySchema>;

interface InputField {
  id: number;
  value: string;
}

export function PropertyInfoForm({
  setstep,
  setPropertyId,
}: {
  setstep: (step: number) => void;
  setPropertyId: (id: string) => void;
}) {
  const [fields, setFields] = useState<InputField[]>([{ id: 0, value: "" }]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showContributorsInput, setShowContributorsInput] = useState(false);

  const form = useForm<PropertyFormData>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      type: "",
      sellingBy: "",
      numContributors: 1,
      price: undefined,
      address: "",
      mapLink: "",
      bedrooms: undefined,
      bathrooms: undefined,
      area: undefined,
      description: "",
      features: [],
    },
  });

  const addField = () => {
    const newId =
      fields.length > 0 ? Math.max(...fields.map((f) => f.id)) + 1 : 0;
    setFields([...fields, { id: newId, value: "" }]);
  };

  const removeField = (id: number) => {
    setFields(fields.filter((field) => field.id !== id));
  };

  const updateField = (id: number, value: string) => {
    setFields(
      fields.map((field) => (field.id === id ? { ...field, value } : field)),
    );
  };

  const onSubmit = async (data: PropertyFormData) => {
    setIsSubmitting(true);

    try {
      const dataToSubmit = {
        ...data,
        features: fields.map((field) => field.value).filter(Boolean),
      };

      const response = await addProperty(dataToSubmit);

      toast({
        title: "تم حفظ المعلومات الأساسية",
        description: "انتقل الآن لإضافة صور ومقاطع فيديو للعقار.",
        duration: 3000,
      });

      if (response) {
        setPropertyId(response.message);
        setstep(2);
      }
    } catch (error) {
      console.error("Error posting property:", error);
      toast({
        title: "خطأ",
        description: "فشل نشر العقار. يرجى المحاولة مرة أخرى.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Section 1: Basic Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-slate-700 flex items-center gap-2 pb-2 border-b border-slate-100">
            <span className="w-8 h-8 rounded-full bg-teal-50 flex items-center justify-center text-teal-600 text-sm font-bold">
              01
            </span>
            تفاصيل العقار الأساسية
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>نوع العقار</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Home className="absolute right-3 top-3 w-5 h-5 text-slate-400" />
                      <Input
                        placeholder="مثال: شقة، فيلا، أرض..."
                        {...field}
                        className="pr-10 h-12"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="sellingBy"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>طريقة البيع</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      setShowContributorsInput(value === "coownership");
                      if (value !== "coownership") {
                        form.setValue("numContributors", undefined);
                      }
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="اختر طريقة البيع" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="coownership">ملكية مشتركة</SelectItem>
                      <SelectItem value="installment">دفعات</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {showContributorsInput && (
            <FormField
              control={form.control}
              name="numContributors"
              render={({ field }) => (
                <FormItem className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                  <FormLabel className="text-blue-800">
                    عدد المساهمين المقبولين
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                      min={2}
                      className="bg-white h-12"
                    />
                  </FormControl>
                  <FormDescription className="text-blue-600/70">
                    أدخل عدد الشركاء الذين تود مشاركتهم الملكية (2 على الأقل)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="col-span-2 md:col-span-1">
                  <FormLabel>العنوان</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <MapPin className="absolute right-3 top-3 w-5 h-5 text-slate-400" />
                      <Input
                        placeholder="رقم 3، شارع الحسن الثاني، الدار البيضاء"
                        {...field}
                        className="pr-10 h-12"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="mapLink"
              render={({ field }) => (
                <FormItem className="col-span-2 md:col-span-1">
                  <FormLabel className="flex justify-between items-center">
                    <span>رابط الخريطة</span>
                    <MapHelper />
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="url"
                      placeholder="33.875749, -5.686289"
                      {...field}
                      className="h-12 text-left"
                      dir="ltr"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Section 2: Specifications */}
        <div className="space-y-4 pt-4">
          <h3 className="text-lg font-semibold text-slate-700 flex items-center gap-2 pb-2 border-b border-slate-100">
            <span className="w-8 h-8 rounded-full bg-teal-50 flex items-center justify-center text-teal-600 text-sm font-bold">
              02
            </span>
            المواصفات المالية والتقنية
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>السعر (بالدرهم)</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <DollarSign className="absolute right-3 top-3 w-5 h-5 text-slate-400" />
                      <Input
                        type="number"
                        placeholder="0.00"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        className="pr-10 h-12 font-mono text-lg"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="area"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>المساحة (م²)</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Maximize className="absolute right-3 top-3 w-5 h-5 text-slate-400" />
                      <Input
                        type="number"
                        placeholder="120"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        className="pr-10 h-12 font-mono text-lg"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="bedrooms"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>غرف النوم</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Bed className="absolute right-3 top-3 w-4 h-4 text-slate-400" />
                        <Input
                          type="number"
                          placeholder="3"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                          className="pr-9 h-12 text-center"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bathrooms"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>الحمامات</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Bath className="absolute right-3 top-3 w-4 h-4 text-slate-400" />
                        <Input
                          type="number"
                          placeholder="2"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                          className="pr-9 h-12 text-center"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        {/* Section 3: Description & Features */}
        <div className="space-y-4 pt-4">
          <h3 className="text-lg font-semibold text-slate-700 flex items-center gap-2 pb-2 border-b border-slate-100">
            <span className="w-8 h-8 rounded-full bg-teal-50 flex items-center justify-center text-teal-600 text-sm font-bold">
              03
            </span>
            الوصف والإضافات
          </h3>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>وصف العقار</FormLabel>
                <FormControl>
                  <div className="relative">
                    <FileText className="absolute right-3 top-3 w-5 h-5 text-slate-400" />
                    <Textarea
                      placeholder="اكتب وصفاً جذاباً للعقار يوضح مميزاته..."
                      {...field}
                      className="min-h-[120px] pr-10 pt-3 resize-none"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-3">
            <Label className="flex items-center gap-2">
              <Layers className="w-4 h-4" />
              الميزات الإضافية
            </Label>
            <div className="bg-slate-50 p-4 rounded-xl space-y-3 border border-slate-100">
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="flex items-center space-x-2 rtl:space-x-reverse animate-in fade-in slide-in-from-top-2 duration-300"
                >
                  <Input
                    value={field.value}
                    onChange={(e) => updateField(field.id, e.target.value)}
                    placeholder={`ميزة رقم ${index + 1} (مثال: مسبح، حديقة، موقف سيارات...)`}
                    className="flex-1 h-11 bg-white"
                  />
                  {fields.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeField(field.id)}
                      className="text-red-500 hover:text-red-600 hover:bg-red-50"
                      aria-label={`إزالة الميزة ${index + 1}`}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addField}
                className="mt-2 text-teal-600 border-teal-200 hover:bg-teal-50 hover:text-teal-700"
              >
                <Plus className="h-4 w-4 ml-2" /> إضافة ميزة أخرى
              </Button>
            </div>
          </div>
        </div>

        <div className="pt-6">
          <Button
            type="submit"
            className="w-full h-14 text-lg bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white shadow-lg rounded-xl transition-all duration-300"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="ml-2 h-5 w-5 animate-spin" />
                جاري الحفظ...
              </>
            ) : (
              "حفظ ومتابعة لإضافة الصور"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export function MapHelper() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="h-6 w-6 p-0 rounded-full">
          <HelpCircle className="h-4 w-4 text-slate-400 hover:text-teal-600" />
        </Button>
      </DialogTrigger>
      <DialogContent className="text-center sm:max-w-md w-full max-w-[90vw] md:w-[500px] overflow-auto">
        <DialogHeader>
          <DialogTitle>كيفية إضافة رابط الخريطة</DialogTitle>
          <DialogDescription className="pt-2 flex flex-col justify-center">
            <p>1. انسخ رابط الخريطة من Google Maps</p>
            <p>2. انسخ القيمة</p>
            <Image
              width={400}
              height={400}
              src="/mapHelper/mapDesktop.png"
              alt="كيفية نسخ رابط الخريطة"
              className="hidden md:block rounded-lg shadow-md border border-slate-200"
            />
            <Image
              width={400}
              height={400}
              src="/mapHelper/mapMobile.png"
              alt="كيفية نسخ رابط الخريطة"
              className="md:hidden rounded-lg shadow-md border border-slate-200"
            />
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-center">
          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
              className="w-full sm:w-auto"
            >
              فهمت
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
