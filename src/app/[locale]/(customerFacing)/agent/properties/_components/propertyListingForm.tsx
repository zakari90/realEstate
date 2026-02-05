'use client'

import { AgentPropertyData } from '@/_actions/agent/actions'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from 'react'
import { PropertyInfoForm } from "./propertyInfoForm"
import { PropertyMediaForm } from "./propertyMediaForm"

export default function PropertyListingForm() {
  
  const [propertyId, setPropertyId] = useState<string>("");
  const [step, setStep] = useState(1)

  const setstep = (step: number) => {
    setStep(step);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>إضافة إعلان عقاري جديد</CardTitle>
      </CardHeader>
      <CardContent>
        { step === 1 ? 
        <PropertyInfoForm setstep={setstep} setPropertyId={setPropertyId}/> 
        : 
        <PropertyMediaForm propertyId={propertyId} setstep={setstep}/>
        }
      </CardContent>
    </Card>
  )
}
  




