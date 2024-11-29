'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronRight, ChevronLeft, Book, Home, FileText, Handshake, LucideIcon } from 'lucide-react'
import { ScrollArea } from "@/components/ui/scroll-area"

type Step = {
    title: string;
    icon: LucideIcon;
    content: string;
  };
const steps : Step[]= [
  {
    // TODO:create a page to educate the use on how to purchase a property leagy paperwork
    title: "Learn What You Need to Know",
    icon: Book,
    content: "Before you begin your home-buying journey, it's essential to educate yourself about the process. Start by researching the local real estate market and familiarizing yourself with the legal conditions of real estate transactions. Watching informative YouTube videos or consulting with a real estate professional can provide you with valuable insights. This preparation will help you make informed decisions along the way."
  },
  {
    title: "Choose the Property You Like",
    icon: Home,
    content: "Once you're informed, start exploring available properties. Create a list of must-have features and desired amenities. Use online real estate platforms, work with a real estate agent. Don't rush this process - take the time to find a home that truly fits your needs and budget."
},
  {
    title: "Make Your Offer to the Seller",
    icon: FileText,
    content: "When you've found the right property, it s time to make an offer. Your offer—specifying the price and payment period—should reflect a fair value based on comparable properties in the area. Once submitted, the seller will typically contact you within three to five days to inform you if they accept your offer."
  },
  {
    title: "Complete the Purchase",
    icon: Handshake,
    content: "If the seller accepts your offer, you'll proceed with the purchase. This stage involves several steps: scheduling a property inspection, reviewing and signing legal documents, and potentially negotiating repairs or canceling the deal based on the inspection results. Once all conditions are met, you'll attend the closing, where you'll sign the final paperwork and officially receive the property."  
}
]

export default function StepsComponent() {
  const [currentStep, setCurrentStep] = useState(0)

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0))

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center items-center p-4">
     
      <Card className="w-full max-w-4xl h-[600px] flex flex-col">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center"> Process</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col">
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`w-1/4 h-2 rounded-full ${
                    index <= currentStep ? 'bg-primary' : 'bg-secondary'
                  }`}
                />
              ))}
            </div>
          </div>
          
          {/* <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="flex-grow flex flex-col"
          > */}
            <Card className="flex-grow flex flex-col">
              <CardHeader>
                <CardTitle className="ml-2 flex items-center text-2xl font-semibold">
                  
                  { steps[currentStep]?.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow overflow-hidden">
                <ScrollArea className="h-full">
                  <p className="text-muted-foreground">{steps[currentStep]?.content}</p>
                </ScrollArea>
              </CardContent>
            </Card>
          {/* </motion.div> */}

          <div className="flex justify-between mt-8">
            <Button onClick={prevStep} disabled={currentStep === 0}>
              <ChevronLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
            <Button onClick={nextStep} disabled={currentStep === steps.length - 1}>
              Next <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}