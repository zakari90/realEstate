'use client'

import { useEffect, useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import Link from "next/link"
import { Loader2, Plus } from 'lucide-react'
import { z } from 'zod'
import { PageHeader } from "@/components/pageHeader"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { updateAgentData } from '@/_actions/agent/actions'
import { useAgentStore } from '@/context/propertyStore'
import MainTableComponent from '@/components/_1inUseComponents/mainTable'

const phoneSchema = z.string().min(10, 'رقم الهاتف يجب أن يتكون من 10 أرقام').regex(/^\d+$/, 'رقم الهاتف يجب أن يحتوي فقط على أرقام');

export default function PropertiesPage() {
  const { agent, agentProperties, error, isLoading, fetchAgentData } = useAgentStore()
  const [isPending, startTransition] = useTransition()
  const [phoneNumber, setPhoneNumber] = useState('')
  const [validationError, setValidationError] = useState('')
  const router = useRouter()

  useEffect(() => {
    fetchAgentData()
  }, [fetchAgentData])

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
      await fetchAgentData()
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
            <PageHeader>العقارات</PageHeader>
            <Button asChild>
              <Link href="/agent/properties/new">
              إضافة عقار
              </Link>
            </Button>
          </div>
          <MainTableComponent properties={agentProperties.properties} />
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

