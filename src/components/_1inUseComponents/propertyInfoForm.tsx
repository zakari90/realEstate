'use client'
import { addProperty } from '@/_actions/agent/actions'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { zodResolver } from '@hookform/resolvers/zod'
import { HelpCircle, Minus, Plus } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const propertySchema = z.object({
  type: z.string().min(1, { message: "نوع العقار مطلوب" }),
  sellingBy: z.string().min(1, { message: "طريقة البيع مطلوبة" }),
  numContributors: z.number().min(2, { message: "يجب أن يكون عدد المساهمين 2 على الأقل" }).optional(),
  price: z.number().positive({ message: "السعر يجب أن يكون رقمًا موجبًا" }),
  address: z.string().min(1, { message: "العنوان مطلوب" }),
  mapLink: z.string().url({ message: "يرجى إدخال رابط صالح" }).optional().or(z.literal('')),
  bedrooms: z.number().int().nonnegative({ message: "عدد غرف النوم يجب أن يكون رقمًا صحيحًا غير سالب" }).optional(),
  bathrooms: z.number().int().nonnegative({ message: "عدد الحمامات يجب أن يكون رقمًا صحيحًا غير سالب" }).optional(),
  area: z.number().positive({ message: "المساحة يجب أن تكون رقمًا موجبًا" }).optional(),
  description: z.string().optional(),
  features: z.array(z.string()).optional(),
})

export type PropertyFormData = z.infer<typeof propertySchema>

interface InputField {
  id: number;
  value: string;
}

export function PropertyInfoForm({setstep, setPropertyId}: {setstep: (step: number) => void ; setPropertyId: (id: string) => void}) {
  const [fields, setFields] = useState<InputField[]>([{ id: 0, value: '' }])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showContributorsInput, setShowContributorsInput] = useState(false)
  
  const form = useForm<PropertyFormData>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      type: '',
      sellingBy: '',
      numContributors: 1,
      price: 0,
      address: '',
      mapLink: '',
      bedrooms: 0,
      bathrooms: 0,
      area: 0,
      description: '',
      features: [],
    },
  })

  const addField = () => {
    const newId = fields.length > 0 ? Math.max(...fields.map(f => f.id)) + 1 : 0
    setFields([...fields, { id: newId, value: '' }])
  }

  const removeField = (id: number) => {
    setFields(fields.filter(field => field.id !== id))
  }

  const updateField = (id: number, value: string) => {
    setFields(fields.map(field => 
      field.id === id ? { ...field, value } : field
    ))
  }

  const onSubmit = async (data: PropertyFormData) => {    
    setIsSubmitting(true)

    try {
      const dataToSubmit = {
        ...data,
        features: fields.map(field => field.value).filter(Boolean),
      }

      const response = await addProperty(dataToSubmit)

      toast({
        title: "تم نشر العقار",
        description: "تم نشر إعلان العقار بنجاح.",
        duration: 5000,
      })

      if (response) { 
        setPropertyId(response.message)
        setstep(2)
      }

    } catch (error) {
      console.error("Error posting property:", error)
      toast({
        title: "خطأ",
        description: "فشل نشر العقار. يرجى المحاولة مرة أخرى.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>عنوان </FormLabel>
              <FormControl>
                <Input placeholder="نوع العقار..." {...field} />
              </FormControl>
              <FormDescription>
              شقة، أرض، منزل ...
              </FormDescription>
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
                  field.onChange(value)
                  setShowContributorsInput(value === 'coownership')
                  if (value !== 'coownership') {
                    form.setValue('numContributors', undefined)
                  }
                }} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر طريقة البيع" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="coownership">ملكية مشتركة</SelectItem>
                  <SelectItem value="installment">دفعات</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                اختر طريقة البيع: الملكية المشتركة أو بالتقسيط
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {showContributorsInput && (
          <FormField
            control={form.control}
            name="numContributors"
            render={({ field }) => (
              <FormItem>
                <FormLabel>عدد المساهمين المقبولين</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    min={2}
                  />
                </FormControl>
                <FormDescription>
                  أدخل عدد المساهمين المقبولين (2 على الأقل)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>بالدرهم السعر</FormLabel>
              <FormControl>
                <Input type="number" placeholder="450000 درهم" {...field} onChange={e => field.onChange(Number(e.target.value))} />
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
              <FormLabel>المساحة م<sup>2</sup></FormLabel>
              <FormControl>
                <Input type="number" placeholder="1500" {...field} onChange={e => field.onChange(Number(e.target.value))} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>العنوان</FormLabel>
              <FormControl>
                <Input placeholder="رقم 3، شارع، الدار البيضاء" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="mapLink"
          render={({ field }) => (
            <FormItem>
              <FormLabel>رابط الخريطة</FormLabel>
              <FormControl>
                <Input type="url" placeholder="https://maps.google.com/..." {...field} />
              </FormControl>
              <FormDescription>
              أضف رابطًا إلى خرائط جوجل أو خدمة خرائط أخرى توضح موقع العقار
              <MapHelper/>
              </FormDescription>
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
                  <Input type="number" placeholder="3" {...field} onChange={e => field.onChange(Number(e.target.value))} />
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
                  <Input type="number" placeholder="2" {...field} onChange={e => field.onChange(Number(e.target.value))} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>الوصف</FormLabel>
              <FormControl>
                <Textarea placeholder="صف العقار..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-2">
          <Label>الميزات</Label>
          {fields.map((field, index) => (
            <div key={field.id} className="flex items-center space-x-2">
              <Input
                value={field.value}
                onChange={(e) => updateField(field.id, e.target.value)}
                placeholder={`أدخل الميزة ${index + 1}`}
              />
              {fields.length > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => removeField(field.id)}
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
            className="mt-2"
          >
            <Plus className="h-4 w-4 ml-2" /> إضافة ميزة
          </Button>
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? 'جاري الإرسال...' : ' إضافة الوسائط'}
        </Button>
      </form>
    </Form>
  )
}

export function MapHelper() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <HelpCircle className="h-4 w-4 text-muted-foreground" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md w-64">
        <DialogHeader>
          <DialogDescription>
          <Image
            width={200}
            height={200}
            src="/mapHelper/phonemap2.jpeg"
            alt="مساعد الخريطة"
          />
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

