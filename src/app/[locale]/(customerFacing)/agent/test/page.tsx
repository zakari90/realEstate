'use client'

import { useEffect } from 'react'
import { PageHeader } from "@/components/pageHeader"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

import { updateAgentData } from '@/_actions/agent/actions'
import { useAgentStore } from '@/context/store'
import MainTableComponent from '../properties/_components/mainTable'
import { Loader2 } from 'lucide-react'

export default function AgentDashboard() {
  const { agent, agentProperties, error, isLoading, fetchAgentData } = useAgentStore()

  useEffect(() => {
    fetchAgentData()
  }, [fetchAgentData])

  if (isLoading) return  <div className="flex justify-center"><Loader2 className="size-24 animate-spin" /></div>
  if (error) return <div>Error: {error}</div>
  const agentPhone = agent?.phone ? <></> : <form action={updateAgentData} className="m-auto md:w-1/3">
  <div className='flex'>
    <Input type="text" id="phoneNumber" name="phoneNumber" placeholder='Phone Number'/>   
    <Button className='ml-3' type="submit">Submit</Button>
  </div>
</form>
  return (
    <div className="container">
      <div className="flex justify-between items-center gap-4 mt-2">
        {agentPhone}
        
      </div>
      <div className="w-full mt-2">
            <div className="flex justify-between w-full ">
              <PageHeader>Properties</PageHeader>
              <Button>
                <Link href="/agent/properties/new">Add Property</Link>
              </Button>
            </div>
            <MainTableComponent properties={agentProperties.properties} />
          </div>
    </div>
  )
}