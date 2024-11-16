'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Banknote, MapPin, Target, Users } from "lucide-react"

import { InvestmentDTO } from "@/_actions/client/actions"
import EmailLink from "@/components/emailComponent"
import PhoneCallLink from "@/components/phoneCallComponent"
import WhatsAppLink from "@/components/whatsAppComponents"
import { Card, CardContent, CardTitle, CardHeader, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ContactInvestor } from "../_components/contactInvestor"
import { Agent } from "@prisma/client"

export default function InvestmentListingPage({
  investment,
}: {
  investment: InvestmentDTO;
}) {
  const [agent, setAgent] = useState<Agent | undefined>(undefined);

  useEffect(() => {
    if (investment?.agent) {
      setAgent(investment.agent)
    }
  }, [investment]);
  if (!investment) {
    return <div className="container mx-auto px-4 py-8">Investment not found</div>
  }

  const progressPercentage = investment.price ? (investment.acceptedContributions || 0 / investment.price) * 100 : 0

  const capitalizedPurpose = investment.purpose 
    ? investment.purpose.charAt(0).toUpperCase() + investment.purpose.slice(1) 
    : 'Not specified'

  const formatCurrency = (value: number | undefined) => {
    return value !== undefined ? value.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) : 'N/A'
  }

  const getBackgroundColor = (price: number | undefined) => {
    if (price === undefined) return 'from-blue-500 to-purple-500'
    if (price > 1000000) return 'from-red-300 to-red-500'
    if (price > 500000) return 'from-green-300 to-green-500'
    if (price > 100000) return 'from-yellow-300 to-yellow-500'
    return 'from-blue-500 to-purple-500'
  }

  const backgroundColorClass = getBackgroundColor(investment.price || 0 )

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="p-0">
              <div className={`relative w-full h-[300px] bg-gradient-to-r ${backgroundColorClass} overflow-hidden`}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <CardTitle className="text-3xl font-bold text-white text-center px-2">{investment.title}</CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="flex justify-between items-center">
                <p className="text-2xl font-bold">{formatCurrency(investment.price || 0)}</p>
                {investment.status && (
                  <Badge variant="secondary" className="text-lg px-3 py-1">
                    {investment.status}
                  </Badge>
                )}
              </div>
              <div className="flex items-center text-muted-foreground">
                <MapPin className="w-5 h-5 mr-2" aria-hidden="true" />
                <span>{investment.location}</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <Target className="w-5 h-5 mr-2 text-muted-foreground" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-medium">Total Value</p>
                    <p className="font-bold">{formatCurrency(investment.price || 0)}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Banknote className="w-5 h-5 mr-2 text-muted-foreground" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-medium">Investor Contribution</p>
                    <p className="font-bold">{formatCurrency(investment.contribution || 0)}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Investment Progress</span>
                  <span className="text-sm font-medium">{progressPercentage.toFixed(0)}%</span>
                </div>
                <Progress value={progressPercentage} className="w-full h-2" />
              </div>
              <div className="flex items-center">
                <Users className="w-5 h-5 mr-2 text-muted-foreground" aria-hidden="true" />
                <span className="text-sm text-muted-foreground">
                  {investment.numContributors} contributor{investment.numContributors !== 1 ? 's' : ''} needed
                </span>
              </div>
              <p className="text-muted-foreground">{investment.description}</p>
            </CardContent>
            <CardFooter>
              <Badge variant="outline" className="mr-2">{investment.purpose }</Badge>
            </CardFooter>
          </Card>
        </div>
        <div className="space-y-6 m-auto">
          <Card className="bg-yellow-200 max-w-lg">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Make an offer</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                You can make an offer that suits you best in terms of price and payment period.
              </p>
              <ContactInvestor investment={investment} />
            </CardContent>
          </Card>
          <Card className='max-w-lg'>
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Contact Publisher</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Image
                width={96}
                height={96}
                src={agent?.image || "/placeholder.svg?height=96&width=96"}
                alt={agent?.name || "Agent"}
                className="w-24 h-24 rounded-full mx-auto object-cover"
              />
              <div className="text-center">
                <p className="font-semibold">{agent?.name || "Agent Name Not Available"}</p>
              </div>
              <div className="flex justify-around items-center">
                <PhoneCallLink phone={agent?.phone || ""} />
                <WhatsAppLink productName={`${investment.title} ${investment.location}`} />
                <EmailLink />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}