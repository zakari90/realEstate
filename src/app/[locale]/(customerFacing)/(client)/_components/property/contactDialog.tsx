import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";

import { ClientProperty } from "@/app/_actions/client/actions";
import { ClientOfferForm } from "./clientOfferForm";
export function ContactDialog({ property }: { property: ClientProperty }){
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
            <ClientOfferForm property={property}/>
          </DialogContent>
      </Dialog>
    )
  }
