'use client'

import { useEffect } from 'react'
import { PageHeader } from "@/components/pageHeader"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

import { updateAgentData } from '@/_actions/agent/actions'
import { useAgentStore } from '@/context/propertyStore'
import MainTableComponent from '../properties/_components/mainTable'
import { Loader2 } from 'lucide-react'

export default function AgentDashboard() {
  const { agent, agentProperties, error, isLoading, fetchAgentData } = useAgentStore()

  useEffect(() => {
    fetchAgentData()
  }, [fetchAgentData])

  if (isLoading) return  <div className="flex justify-center"><Loader2 className="size-24 animate-spin" /></div>
  if (error) return <div>خطأ: {error}</div>
  const agentTable = agent?.phone
  ? <div>
    <div className='flex justify-between mt-2'>
      <PageHeader>العقارات</PageHeader>
      <Button> <Link href="/agent/properties/new">إضافة عقار</Link> </Button> 
    </div>
    <MainTableComponent properties={agentProperties.properties} /> 
  </div> 
  : <form action={updateAgentData} className="m-auto md:w-1/3">
  <div className='flex justify-center items-center ml-auto mr-auto w-2/3'>
    <Input type="text" id="phoneNumber" name="phoneNumber" placeholder='رقم الهاتف'/>   
    <Button className='ml-3' type="submit">إرسال</Button>
  </div>
</form>
  return (
    <div className="container">
      {agentTable}           
    </div>
  )
}
