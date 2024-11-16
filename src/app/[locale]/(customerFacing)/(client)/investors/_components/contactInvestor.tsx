"use client"
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";

import { InvestmentDTO, PropertyDTO } from "@/_actions/client/actions";
import { InvestorOfferForm } from "./investorContactForm";
import { useState } from "react";
export function ContactInvestor({ investment }: { investment: InvestmentDTO }){
  const [open, setOpen] = useState(false)

    return(
      <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full">Make an offer</Button>
        </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Contact the seller</DialogTitle>
              {/* <DialogDescription>
              Never send money in advance to the seller for goods on the site.          
              </DialogDescription> */}
            </DialogHeader>
            <InvestorOfferForm 
            investment={investment}
            onClose={() => setOpen(false)}/>
          </DialogContent>
      </Dialog>
    )
  }
