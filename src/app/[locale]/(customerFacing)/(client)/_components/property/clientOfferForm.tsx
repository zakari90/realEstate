"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SendHorizonalIcon } from 'lucide-react';
import React, { useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { DialogClose } from '@radix-ui/react-dialog';
import { useFormState, useFormStatus } from "react-dom";
import { createClientOffer } from "@/app/_actions/agent/actions";
import { ClientProperty } from "@/app/_actions/client/actions";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";



// Component for the client offer form
export function ClientOfferForm({ property }: { property: ClientProperty }) {
   // Regular expression pattern for validating phone numbers
   const phoneNumberPattern = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;
   const MIN_LENGTH = 10; // Minimum length for phone number
   const MAX_LENGTH = 15; // Maximum length for phone number
 
   // Form state management hooks
   const { pending } = useFormStatus();
   const [clientOffer, setClientOffer] = useState(""); // Initialize with property price
   const [clientPhone, setClientPhone] = useState(''); // Initial empty phone number
   const [isValid, setIsValid] = useState(true); // Track validity of phone number
 
   // Form state and action hook
   const [state, action] = useFormState(createClientOffer, { status: '', message: '' });
 
   // Handler for phone number input change
   const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
     const value = e.target.value;
     setClientPhone(value);
 
     // Validate phone number format and length
     const validFormat = phoneNumberPattern.test(value);
     const validLength = value.length >= MIN_LENGTH && value.length <= MAX_LENGTH;
 
     if (!validFormat || !validLength) {
       setIsValid(true);
     } else {
       setIsValid(false);
     }
   };
 

  return (
    <>
      {/* Display success or error messages based on form submission state */}
      {state.status === 'success' && (
        <Alert variant="default">
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>{state.message}</AlertDescription>
        </Alert>
      )}
      {state.status === 'error' && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{state.message}</AlertDescription>
        </Alert>
      )}
      {/* Form submission */}
      
      <form action={action}>
      <div className="grid gap-4 py-4">
      <Input className='hidden' id="propertyId" name="propertyId" type="text" value={property.id} readOnly />
      
      <div className="flex items-center">    
    
        <Label htmlFor="clientPhone" className='w-2/3'>
        Phone Number :
        </Label>
          <Input
            id="clientPhone"
            name="clientPhone"
            type="tel"
            pattern={phoneNumberPattern+""}
            value={clientPhone}
            onChange={handlePhoneChange}
            placeholder="Enter your phone number"
          />
        </div>
        <div className="flex items-center">      
        <Label htmlFor="clientOffer" className='w-2/3'>
          Your offer
        </Label>
          <Input
            id="clientOffer"
            name='clientOffer'
            type='tel'
            required
            defaultValue={property?.price || 0}
            onChange={(e)=>(setClientOffer(e.target.value))}
          />
        </div>
        <div className="flex items-center">      
        <Label htmlFor="clientOffer" className='w-2/3'>
        Payment period in months.
        </Label>
          <Input
            id="clientPeriod"
            name='clientPeriod'
            type='number'
            required
            defaultValue="0"
          />
        </div>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger >Optional fields :</AccordionTrigger>
            <AccordionContent className='py-3'>  
                <div className="flex items-center mb-3">      
                <Label htmlFor="username" className='w-2/3'>
                  Name
                </Label>
                  <Input id="clientName" name='clientName' type='text' />
                </div>
                <div className="flex items-center">      
                <Label htmlFor="username" className='w-2/3'>
                  Email
                </Label>
                  <Input
                    id="clientEmail"
                    name='clientEmail'
                    type='text'
                  />
                </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <Button disabled={isValid || pending } type="submit" ><DialogClose/> <SendHorizonalIcon className='size-4'/></Button>
      </form>
    </>
  );
}
