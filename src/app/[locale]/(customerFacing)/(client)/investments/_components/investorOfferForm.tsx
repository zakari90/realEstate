"use client"

import { createInvestmentOffer } from "@/_actions/agent/actions"
import { InvestmentDTO } from "@/_actions/client/actions"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { DialogClose } from '@radix-ui/react-dialog'
import { AlertCircle, CheckCircle2, SendHorizontal } from 'lucide-react'
import { useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"

const formSchema = z.object({
  investmentId: z.string(),
  clientPhone: z.string().regex(/^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/, {
    message: "يرجى إدخال رقم هاتف صالح",
  }),
  clientOffer: z.string().min(1, "العرض مطلوب").transform(Number).refine((n) => n > 0, {
    message: "يجب أن يكون العرض أكبر من 0",
  }),
  clientName: z.string().optional(),
  clientEmail: z.string().email().optional(),
})

export function InvestorOfferForm({ investment, onClose }: { investment: InvestmentDTO; onClose : () => void }) {
  // const [investmentOfferState, setInvestmentOfferState] = useState<boolean>()
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      investmentId: investment.id,
      clientPhone: "",
      clientOffer: investment?.price || 0,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await createInvestmentOffer(values);
      console.log("Response:", response);
      if (response) {
        form.reset();
        setStatus('success');
        setTimeout(() => {
          onClose();
        }, 1500);
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error("Error submitting offer", error);
      setStatus('error');
    }
  };

  return (
<div className="space-y-6">
  {status === 'success' && (
    <Alert variant="default" className="bg-green-50 border-green-200">
      <CheckCircle2 className="h-4 w-4 text-green-500" />
      <AlertTitle>نجاح</AlertTitle>
      <AlertDescription>تم تقديم عرضك بنجاح!</AlertDescription>
    </Alert>
  )}

  {status === 'error' && (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>خطأ</AlertTitle>
      <AlertDescription>حدث خطأ أثناء تقديم عرضك.</AlertDescription>
    </Alert>
  )}
  {status === 'idle' && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField control={form.control} name="clientPhone" render={({ field }) => (
              <FormItem>
                <FormLabel>رقم الهاتف</FormLabel>
                <FormControl>
                  <Input placeholder="أدخل رقم هاتفك" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="clientOffer" render={({ field }) => (
              <FormItem>
                <FormLabel>عرضك</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <Button type="submit" className="w-full flex items-center justify-center">
              <DialogClose />
              <SendHorizontal className="h-4 w-4 ml-2" />
              {form.formState.isSubmitting ? "جاري التقديم..." : "تقديم العرض"}
            </Button>
          </form>
        </Form>
      )}
</div>

  );  
}