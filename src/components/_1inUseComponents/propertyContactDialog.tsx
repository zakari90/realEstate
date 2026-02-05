
"use client"
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";

import { PropertyDTO } from "@/_actions/client/actions";
import { useState } from "react";
import { ClientOfferFormCo_ownership, ClientOfferFormInstalment } from "./propertyOfferForm";
export function ContactDialog({ property }: { property: PropertyDTO }){
  const [open, setOpen] = useState(false)

  return(
    <Dialog open={open} onOpenChange={setOpen}>
    <DialogTrigger asChild>
      <Button size="sm" className="w-full ml-2 text-xs ">
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
        {
          property.sellingBy === "co-ownership" ? 
          <ClientOfferFormCo_ownership property={property} 
          onClose={() => setOpen(false)} />
          :
          <ClientOfferFormInstalment property={property} 
          onClose={() => setOpen(false)} />
        }     
    </DialogContent>
  </Dialog>
  
  )
}
