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
        title: "Opportunity Posted",
        description: "Your property opportunity has been successfully posted.",
        duration: 5000,
        variant: "default",
        // action: <CustomToast title="Success!" description="Your investment opportunity is now live." />,
      });
      router.push("/")
    } catch (error) {
      console.error("Error posting opportunity:", error);
      toast({
        title: "Error",
        description: "Failed to post opportunity. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }
  

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Post Property Opportunity</CardTitle>
        <CardDescription>
          Share a new property investment opportunity with potential contributors.
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
                  <FormLabel>Property Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter property title" {...field} />
                  </FormControl>
                  <FormDescription>
                    Provide a concise title for the property opportunity.
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
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe the property"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Provide a detailed description of the property and investment opportunity.
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
                  <FormLabel>Total Property Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter total property price"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormDescription>
                    Enter the total price of the property in dollars.
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
                  <FormLabel>Your Contribution</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter your contribution"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormDescription>
                    Enter the amount you are willing to contribute in dollars.
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
                  <FormLabel>Additional Contributors Needed</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter number of additional contributors needed"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormDescription>
                    Specify how many additional contributors you are looking for.
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
                  <FormLabel>Property Location</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter property location" {...field} />
                  </FormControl>
                  <FormDescription>
                    Provide the location of the property (e.g., city, state).
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
                  <FormLabel>Investment Purpose</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select the purpose of this investment" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="housing">For Housing</SelectItem>
                      <SelectItem value="investment">For Investment</SelectItem>
                      <SelectItem value="commercial">For Commercial Use</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Choose the primary purpose for this property investment.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Posting..." : "Post Opportunity"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <p className="text-sm text-muted-foreground">
          All fields are required. Please ensure the information is accurate.
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

