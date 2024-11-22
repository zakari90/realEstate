
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
import { ClientOfferForm } from "./clientOfferForm";
import { useState } from "react";
export function ContactDialog({ property }: { property: PropertyDTO }){
  const [open, setOpen] = useState(false)
  return(
  <Dialog open={open} onOpenChange={setOpen}>
    <DialogTrigger asChild>
    <Button size="sm" className="w-full ml-2 text-xs">
    Make an offer
    </Button>
      </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Contact the seller</DialogTitle>
            {/* <DialogDescription>
            Never send money in advance to the seller for goods on the site.          
            </DialogDescription> */}
          </DialogHeader>
          
          <ClientOfferForm property={property} 
          onClose={() => setOpen(false)}/>
      </DialogContent>
  </Dialog>
  )
}
