"use client"

import { createInvestmentOffer } from "@/_actions/agent/actions"
import { InvestmentDTO } from "@/_actions/client/actions"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { DialogClose } from '@radix-ui/react-dialog'
import { SendHorizontal } from 'lucide-react'
import { useForm } from "react-hook-form"
import * as z from "zod"

const formSchema = z.object({
  investmentId: z.string(),
  clientPhone: z.string().regex(/^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/, {
    message: "Please enter a valid phone number",
  }),
  clientOffer: z.string().min(1, "Offer is required").transform(Number).refine((n) => n > 0, {
    message: "Offer must be greater than 0",
  })
})

export function InvestorOfferForm({ investment }: { investment: InvestmentDTO }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      investmentId: investment.id,
      clientPhone: "",
      clientOffer: investment?.price || 0,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("Submitting offer", values);
    try {
      const response = await createInvestmentOffer(values);
      console.log("======================================");
      console.log(response);
      if (response) {
        form.reset();
      }
    } catch (error) {
      console.error("Error submitting offer", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField 
          control={form.control} 
          name="investmentId" 
          render={({ field }) => (
            <FormItem className="hidden">
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )} 
        />

        <FormField 
          control={form.control} 
          name="clientPhone" 
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="Enter your phone number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} 
        />

        <FormField 
          control={form.control} 
          name="clientOffer" 
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Offer</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} 
        />

        <Button 
          type="submit" 
          className="w-full flex items-center justify-center gap-2" 
          disabled={form.formState.isSubmitting}
        >
          <DialogClose />
          <SendHorizontal className="h-4 w-4" />
          {form.formState.isSubmitting ? "Submitting..." : "Submit Offer"}
        </Button>
      </form>
    </Form>
  );
}