"use client"

import { createInvestmentOffer } from "@/_actions/agent/actions"
import { InvestmentDTO } from "@/_actions/client/actions"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { InvestmentOffer } from "@prisma/client"
import { DialogClose } from '@radix-ui/react-dialog'
import { AlertCircle, CheckCircle2, ChevronDown, SendHorizontal } from 'lucide-react'
import { useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"

const formSchema = z.object({
  investmentId: z.string(),
  clientPhone: z.string().regex(/^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/, {
    message: "Please enter a valid phone number",
  }),
  clientOffer: z.string().min(1, "Offer is required").transform(Number).refine((n) => n > 0, {
    message: "Offer must be greater than 0",
  }),
  // clientPeriod: z.string().transform(Number).refine((n) => n >= 0, {
  //   message: "Payment period must be 0 or greater",
  // }),
  clientName: z.string().optional(),
  clientEmail: z.string().email("Invalid email address").optional(),
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
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>Your offer has been submitted successfully!</AlertDescription>
        </Alert>
      )}

      {status === 'error' && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>There was an error submitting your offer.</AlertDescription>
        </Alert>
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

  
          {/* Phone Number */}
          <FormField control={form.control} name="clientPhone" render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="Enter your phone number" {...field} />
              </FormControl>
              <FormDescription>Please enter a valid phone number.</FormDescription>
              <FormMessage />
            </FormItem>
          )} />
  
          {/* Offer Amount */}
          <FormField control={form.control} name="clientOffer" render={({ field }) => (
            <FormItem>
              <FormLabel>Your Offer</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
  
          {/* Accordion for Optional Fields */}
          <Accordion type="single" collapsible className="border rounded-md">
            <AccordionItem value="optional-fields">
              <AccordionTrigger className="px-4">
                Optional fields
              </AccordionTrigger>
              <AccordionContent className="p-4 space-y-4">
                <FormField control={form.control} name="clientName" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
  
                <FormField control={form.control} name="clientEmail" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
  
          {/* Submit Button */}
          <Button type="submit" className="w-full flex items-center justify-center" disabled={form.formState.isSubmitting}>
            <DialogClose />
            <SendHorizontal className="h-4 w-4 ml-2" />
            {form.formState.isSubmitting ? "Submitting..." : "Submit Offer"}
          </Button>
        </form>
      </Form>
    </div>
  );  
}