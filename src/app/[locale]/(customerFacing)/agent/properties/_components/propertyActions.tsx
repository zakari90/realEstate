"use client"

import { deletePropertyById, updatePropertyStatus } from "@/_actions/agent/actions"
import { Button } from "@/components/ui/button"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { useAgentStore } from "@/context/propertyStore"
import { Trash } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useTransition } from "react"


export function ActiveToggleDropdownItem({id, status}:{
    id:string,
    status:boolean
}){

    const { agent, agentProperties, error, isLoading, fetchAgentData } = useAgentStore()

    const [isPending, startTransition] = useTransition()
    const router = useRouter()
    return <Button 
    className="w-full"
    variant="ghost"
    disabled={isPending}
    onClick={()=>{
        startTransition(async () => {
            await updatePropertyStatus(id, !status)
            fetchAgentData()
            router.refresh()           
        })
    }}>
      {status ? "تعطيل" : "تفعيل"}
    </Button>
}

export function DeleteDropdownItem(
    {id}:{ id:string }){
    const { agent, agentProperties, error, isLoading, fetchAgentData } = useAgentStore()

    const handleDelete = async (id: string) => {
        if (window.confirm("Are you sure you want to delete this ?")) {
          try {
            await deletePropertyById(id);
            fetchAgentData()
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