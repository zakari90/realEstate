"use client"

import { deleteInvestementById, deletePropertyById, updatePropertyStatus } from "@/_actions/agent/actions"
import { Button } from "@/components/ui/button"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { useAgentInvestmentStore } from "@/context/investementStore"
import { useAgentStore } from "@/context/propertyStore"
import { Trash } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useTransition } from "react"


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
            await updatePropertyStatus(id, !status)
            fetchAgentInvestemtData()
            router.refresh()})}
        }>
        {status ? "Deactivate" : "Activate"}
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
            Delete
      </Button>

}