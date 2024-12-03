"use client"
import { PageHeader } from '@/components/pageHeader'
import { Button } from '@/components/ui/button'
import { useAgentInvestmentStore } from '@/context/investementStore'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { updateAgentData } from '@/_actions/agent/actions'
import { Input } from '@/components/ui/input'
import InvestmentMainTableComponent from './_components/investmentTable'

export default function InvestmentPage() {
  const { agent, agentInvestments, error, isLoading, fetchAgentInvestemtData } = useAgentInvestmentStore()
  
  useEffect(() => {
    fetchAgentInvestemtData()
  }, [fetchAgentInvestemtData])

  if (isLoading) return  <div className="flex justify-center"><Loader2 className="size-24 animate-spin" /></div>
  if (error) return <div>خطأ: {error}</div>
  const agentTable= agent?.phone 
  ? <div>
    <div className='flex justify-between mt-2'>
      <PageHeader>الاستثمارات</PageHeader>
      <Button> <Link href="/agent/investors/new">إنشاء استثمار</Link> </Button> 
    </div>
    <InvestmentMainTableComponent investments={agentInvestments.investment}/>
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
  
)}
