"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SendHorizonalIcon } from 'lucide-react';
import React, { useState } from 'react';

import { createClientOffer } from '@/app/_actions/actions';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { DialogClose } from '@radix-ui/react-dialog';
import { useFormState, useFormStatus } from "react-dom";
import { ClientProperty } from "./propertiesSection";
export function ClientOfferForm({property} : {property : ClientProperty}) {
   
    const phoneNumberPattern = /^0[+]?[0-9]{1,4}[-\s.]?[0-9]+[-\s.]?[0-9]+[-\s.]?[0-9]+$|^[+]?[1-9][0-9]{1,14}[-\s.]?[0-9]*$/;
    const MIN_LENGTH = 10;
    const MAX_LENGTH = 15;
    const {pending} = useFormStatus()
    const [clientOffer, setClientOffer] = useState("");
    const [clientPhone, setClientPhone] = useState('');
    const [isValid, setIsValid] = useState(true);
    const[error, action ] = useFormState(createClientOffer,{})

    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
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
    return(
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
            type="text"
            value={clientPhone}
            onChange={handleChange}
            placeholder="Enter your phone number"
          />
        </div>
        <div className="flex items-center">      
        <Label htmlFor="clientOffer" className='w-2/3'>
          Make an offer
        </Label>
          <Input
            id="clientOffer"
            name='clientOffer'
            type='number'
            defaultValue={property?.price || 0}
            onChange={(e)=>(setClientOffer(e.target.value))}
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
      <Button disabled={isValid ||pending } type="submit" ><DialogClose/> <SendHorizonalIcon className='size-4'/></Button>
      </form>
    )
  }