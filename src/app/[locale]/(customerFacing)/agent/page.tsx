"use client"
import { PageHeader } from '@/components/pageHeader'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useAgentInvestmentStore } from '@/context/investementStore'
import { useAgentStore } from '@/context/propertyStore'
import { ArrowUpRight, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useEffect } from 'react'

function AgentPage() {
  const { agent, agentProperties, error, isLoading, fetchAgentData } = useAgentStore()
  const { agentInvestments,fetchAgentInvestemtData } = useAgentInvestmentStore()
  

  useEffect(() => {
    fetchAgentData()
    fetchAgentInvestemtData()
  }, [fetchAgentData, fetchAgentInvestemtData])

  if (isLoading) return  <div className="flex justify-center"><Loader2 className="size-24 animate-spin" /></div>
  if (error) return <div>خطأ: {error}</div>

  const numberOfInvestments = agentInvestments.investment.length ? agentInvestments.investment.length + "" : "0"
  const numberOfProprties = agentProperties.properties.length ? agentProperties.properties.length + "" : "0"

  return (
    <div className="container">
<div className="flex justify-between">
          <PageHeader>اللوحة الرئيسية</PageHeader>
      {/* <DynamicBreadcrumb /> */}
      </div>
    
      <div className="m-auto grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <DashboardCard
            title= 'عدد الملكيات'
            body={numberOfProprties}
            href="/agent/properties"
            
          />
          <DashboardCard
            title= 'عدد الاستثمارات'
            body={numberOfInvestments}
            href="/agent/investors"
          />
        </div>
    </div>
  )
}

export default AgentPage

type DashboardCardProps = {
  title: string
  body: string
  href:string
}

function DashboardCard({ title, body, href }: DashboardCardProps) {
  return (


    <Link href={href}>
      <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">
        {title}
      </CardTitle>
        </CardHeader>
        <CardContent>
        <div className="text-2xl font-bold">{body}</div>
        </CardContent>
      </Card>
    </Link>

  )
}


function TransactionsCard() {
  return(
    <Card
    className="xl:col-span-2"  >
    <CardHeader className="flex flex-row items-center">
      <div className="grid gap-2">
        <CardTitle>المعاملات</CardTitle>
        <CardDescription>
          العروض الأخيرة على ملكياتك.
        </CardDescription>
      </div>
      <Button asChild size="sm" className="ml-auto gap-1">
        <Link href="#">
          عرض الكل
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </Button>
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>العميل</TableHead>
            <TableHead className="hidden xl:table-column">
              النوع
            </TableHead>
            <TableHead className="hidden xl:table-column">
              الحالة
            </TableHead>
            <TableHead className="hidden xl:table-column">
              التاريخ
            </TableHead>
            <TableHead className="text-right">المبلغ</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>
              <div className="font-medium">ليام جونسون</div>
              <div className="hidden text-sm text-muted-foreground md:inline">
                liam@example.com
              </div>
            </TableCell>
            <TableCell className="hidden xl:table-column">
              بيع
            </TableCell>
            <TableCell className="hidden xl:table-column">
              <Badge className="text-xs" variant="outline">
                تمت الموافقة
              </Badge>
            </TableCell>
            <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
              2023-06-23
            </TableCell>
            <TableCell className="text-right">$250.00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <div className="font-medium">أوليفيا سميث</div>
              <div className="hidden text-sm text-muted-foreground md:inline">
                olivia@example.com
              </div>
            </TableCell>
            <TableCell className="hidden xl:table-column">
              استرداد
            </TableCell>
            <TableCell className="hidden xl:table-column">
              <Badge className="text-xs" variant="outline">
                مرفوض
              </Badge>
            </TableCell>
            <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
              2023-06-24
            </TableCell>
            <TableCell className="text-right">$150.00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <div className="font-medium">نوح ويليامز</div>
              <div className="hidden text-sm text-muted-foreground md:inline">
                noah@example.com
              </div>
            </TableCell>
            <TableCell className="hidden xl:table-column">
              اشتراك
            </TableCell>
            <TableCell className="hidden xl:table-column">
              <Badge className="text-xs" variant="outline">
                تمت الموافقة
              </Badge>
            </TableCell>
            <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
              2023-06-25
            </TableCell>
            <TableCell className="text-right">$350.00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <div className="font-medium">إيما براون</div>
              <div className="hidden text-sm text-muted-foreground md:inline">
                emma@example.com
              </div>
            </TableCell>
            <TableCell className="hidden xl:table-column">
              بيع
            </TableCell>
            <TableCell className="hidden xl:table-column">
              <Badge className="text-xs" variant="outline">
                تمت الموافقة
              </Badge>
            </TableCell>
            <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
              2023-06-26
            </TableCell>
            <TableCell className="text-right">$450.00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <div className="font-medium">ليام جونسون</div>
              <div className="hidden text-sm text-muted-foreground md:inline">
                liam@example.com
              </div>
            </TableCell>
            <TableCell className="hidden xl:table-column">
              بيع
            </TableCell>
            <TableCell className="hidden xl:table-column">
              <Badge className="text-xs" variant="outline">
                تمت الموافقة
              </Badge>
            </TableCell>
            <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
              2023-06-27
            </TableCell>
            <TableCell className="text-right">$550.00</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>
              <div className="font-medium">ليام جونسون</div>
              <div className="hidden text-sm text-muted-foreground md:inline">
                liam@example.com
              </div>
            </TableCell>
            <TableCell className="hidden xl:table-column">
              بيع
            </TableCell>
            <TableCell className="hidden xl:table-column">
              <Badge className="text-xs" variant="outline">
                تمت الموافقة
              </Badge>
            </TableCell>
            <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
              2023-06-27
            </TableCell>
            <TableCell className="text-right">$550.00</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </CardContent>
  </Card>
  )
}
