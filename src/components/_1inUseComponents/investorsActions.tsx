"use client"

import { deleteInvestementById, updateInvestementOfferStatus, updateInvestmentStatus, updatePropertyStatus } from "@/_actions/agent/actions"
import { Button } from "@/components/ui/button"
import { useAgentInvestmentStore } from "@/context/investementStore"
import { useRouter } from "next/navigation"
import { useTransition } from "react"


export function InvestmentActionsItem({id, status}:{
    id:string,
    status:boolean
}){

  const { agent, agentInvestments, error, isLoading, fetchAgentInvestemtData } = useAgentInvestmentStore()
    const [isPending, startTransition] = useTransition()
    const router = useRouter()
    return <Button 
    className="w-full"
    variant="ghost"
    disabled={isPending}
    onClick={()=>{
      startTransition(async () => {
          await updateInvestmentStatus(id, !status)
          fetchAgentInvestemtData()
          router.refresh()
        })}
        }>
      {status ? "تعطيل" : "تفعيل"}
      </Button>
}

export function DeleteInvestmentItem(
    {id}:{ id:string }){
      const { agent, agentInvestments, error, isLoading, fetchAgentInvestemtData } = useAgentInvestmentStore()

    const handleDelete = async (id: string) => {
        if (window.confirm("Are you sure you want to delete this ?")) {
          try {
            await deleteInvestementById(id);
            fetchAgentInvestemtData()
            router.refresh()           
          } catch (error) {
            console.error("Error deleting:", error);
            // Handle the error (e.g., show an error message to the user)
          }
        }
      };
    const [isPending, startTransition] = useTransition()
    const router = useRouter()
    
    return <Button 
        className="w-full"
        variant="destructive"
        disabled={isPending}
        onClick={()=>{
            startTransition(async () => {
                await handleDelete(id) }) }}>
                حذف
      </Button>

}