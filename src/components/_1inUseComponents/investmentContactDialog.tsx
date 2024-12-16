"use client"
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";

import { InvestmentDTO } from "@/_actions/client/actions";
import { useState } from "react";
import { InvestorOfferForm } from "./investorOfferForm";
export function ContactInvestor({ investment }: { investment: InvestmentDTO }){
  const [open, setOpen] = useState(false)

    return(
      <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" className="w-full ml-2 text-xs">
          قدم عرضاً
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>اتصل بالبائع</DialogTitle>
          {/* <DialogDescription>
          لا ترسل المال مقدماً للبائع مقابل السلع على الموقع.
          </DialogDescription> */}
        </DialogHeader>
        <InvestorOfferForm 
          investment={investment}
          onClose={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
    
    )
  }
