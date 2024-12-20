'use client'

import { Loader2 } from 'lucide-react'
import Link from "next/link"
import { useRouter } from 'next/navigation'
import { useEffect, useState, useTransition } from 'react'
import { z } from 'zod'
import { updateAgentData } from '@/_actions/agent/actions'
import { PageHeader } from "@/components/pageHeader"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAgentInvestmentStore } from '@/context/investementStore'
import InvestmentMainTableComponent from '@/components/_1inUseComponents/investmentTable'
import DynamicBreadcrumb from '@/components/dynamicBreadcrumb'

const phoneSchema = z.string().min(10, 'رقم الهاتف يجب أن يتكون من 10 أرقام').regex(/^\d+$/, 'رقم الهاتف يجب أن يحتوي فقط على أرقام');

export default function InvestmentPage() {
const { agent, agentInvestments, error, isLoading, fetchAgentInvestemtData } = useAgentInvestmentStore()

  const [isPending, startTransition] = useTransition()
  const [phoneNumber, setPhoneNumber] = useState('')
  const [validationError, setValidationError] = useState('')
  const router = useRouter()

  useEffect(() => {
    fetchAgentInvestemtData()
  }, [fetchAgentInvestemtData])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(event.target.value)
    setValidationError('')
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const result = phoneSchema.safeParse(phoneNumber)
    if (!result.success) {
      setValidationError(result?.error?.errors?.[0]?.message || "")
      return
    }
    startTransition(async () => {
      await updateAgentData(phoneNumber)
      await fetchAgentInvestemtData()
      router.refresh()
    })
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="size-24 animate-spin text-primary" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-4">
        <h2 className="text-2xl font-bold mb-2">خطأ</h2>
        <p>{error}</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {agent?.phone ? (
        <>
          <div className='flex justify-between items-center mb-6'>
            <PageHeader>الاستثمارات</PageHeader>
            <Button asChild>
            <Link href="/agent/investors/new">إنشاء استثمار</Link> 
            </Button>
          </div>
          <InvestmentMainTableComponent investments={agentInvestments.investment}/>
        </>
      ) : (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-center">تسجيل رقم الهاتف</h2>
          <div className='flex flex-col space-y-4'>
            <Input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              placeholder='رقم الهاتف (مثال: 0512345678)'
              value={phoneNumber}
              onChange={handleInputChange}
              className="text-right"
              dir="rtl"
            />
            {validationError && (
              <p className="text-red-500 text-sm">{validationError}</p>
            )}
            <Button type="submit" disabled={isPending} className="w-full">
              {isPending ? <Loader2 className="ml-2 h-4 w-4 animate-spin" /> : null}
              إرسال
            </Button>
          </div>
        </form>
      )}
    </div>
  )
}