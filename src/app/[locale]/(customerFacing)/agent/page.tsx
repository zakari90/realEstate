"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import db from '@/db/db'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { PageHeader } from '@/components/pageHeader'
import Link from 'next/link'
import { ArrowUpRight, Loader2 } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from '@/components/ui/badge'
import { getAgentClients, getAgentProperties } from '@/_actions/agent/actions'
import OffersTable from './properties/_components/offersTable'
import { useEffect } from 'react'
import { useAgentStore } from '@/context/store'

// Removed getClerkUsertDetails as it's duplicate of getAgentDetails



function AgentPage() {
  const { agent, agentProperties, error, isLoading, fetchAgentData } = useAgentStore()

  useEffect(() => {
    fetchAgentData()
  }, [fetchAgentData])

  if (isLoading) return  <div className="flex justify-center"><Loader2 className="size-24 animate-spin" /></div>
  if (error) return <div>Error: {error}</div>
  console.log("---------------------------")
  // console.log( agent?.name, agentProperties, error, isLoading, fetchAgentData  )
  console.log( agentProperties.properties[0] )
  console.log("---------------------------")


  // const numberOfOffers = offers.numberOfOffers ? offers.numberOfOffers + "" : "0"
  const numberOfProprties = agentProperties.properties.length ? agentProperties.properties.length + "" : "0"
  return (
    <div className="container">
      <PageHeader>Dashboard</PageHeader>
      <div className="m-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <DashboardCard
            title= 'Number of properties'
            body={numberOfProprties}
          />

        </div>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        {/* <DashboardCard
            title= 'Number of properties'
            body={properties as unknown as string}
          /> */}
          {/* <DashboardCard
            title= 'Total Offers'
            body={offers.numberOfOffers as unknown as string}
            
          /> */}
        </div>
        <OffersTable properties={agentProperties?.properties}/>
      </main>
    </div>
  )
}

export default AgentPage

type DashboardCardProps = {
  title: string
  body: string
}

function DashboardCard({ title, body }: DashboardCardProps) {
  return (
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
  )
}


function TransactionsCard() {
  return(
    <Card
    className="xl:col-span-2"  >
    <CardHeader className="flex flex-row items-center">
      <div className="grid gap-2">
        <CardTitle>Transactions</CardTitle>
        <CardDescription>
          Recent offers for your properties.
        </CardDescription>
      </div>
      <Button asChild size="sm" className="ml-auto gap-1">
        <Link href="#">
          View All
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </Button>
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Customer</TableHead>
            <TableHead className="hidden xl:table-column">
              Type
            </TableHead>
            <TableHead className="hidden xl:table-column">
              Status
            </TableHead>
            <TableHead className="hidden xl:table-column">
              Date
            </TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>
              <div className="font-medium">Liam Johnson</div>
              <div className="hidden text-sm text-muted-foreground md:inline">
                liam@example.com
              </div>
            </TableCell>
            <TableCell className="hidden xl:table-column">
              Sale
            </TableCell>
            <TableCell className="hidden xl:table-column">
              <Badge className="text-xs" variant="outline">
                Approved
              </Badge>
            </TableCell>
            <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
              2023-06-23
            </TableCell>
            <TableCell className="text-right">$250.00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <div className="font-medium">Olivia Smith</div>
              <div className="hidden text-sm text-muted-foreground md:inline">
                olivia@example.com
              </div>
            </TableCell>
            <TableCell className="hidden xl:table-column">
              Refund
            </TableCell>
            <TableCell className="hidden xl:table-column">
              <Badge className="text-xs" variant="outline">
                Declined
              </Badge>
            </TableCell>
            <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
              2023-06-24
            </TableCell>
            <TableCell className="text-right">$150.00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <div className="font-medium">Noah Williams</div>
              <div className="hidden text-sm text-muted-foreground md:inline">
                noah@example.com
              </div>
            </TableCell>
            <TableCell className="hidden xl:table-column">
              Subscription
            </TableCell>
            <TableCell className="hidden xl:table-column">
              <Badge className="text-xs" variant="outline">
                Approved
              </Badge>
            </TableCell>
            <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
              2023-06-25
            </TableCell>
            <TableCell className="text-right">$350.00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <div className="font-medium">Emma Brown</div>
              <div className="hidden text-sm text-muted-foreground md:inline">
                emma@example.com
              </div>
            </TableCell>
            <TableCell className="hidden xl:table-column">
              Sale
            </TableCell>
            <TableCell className="hidden xl:table-column">
              <Badge className="text-xs" variant="outline">
                Approved
              </Badge>
            </TableCell>
            <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
              2023-06-26
            </TableCell>
            <TableCell className="text-right">$450.00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <div className="font-medium">Liam Johnson</div>
              <div className="hidden text-sm text-muted-foreground md:inline">
                liam@example.com
              </div>
            </TableCell>
            <TableCell className="hidden xl:table-column">
              Sale
            </TableCell>
            <TableCell className="hidden xl:table-column">
              <Badge className="text-xs" variant="outline">
                Approved
              </Badge>
            </TableCell>
            <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
              2023-06-27
            </TableCell>
            <TableCell className="text-right">$550.00</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>
              <div className="font-medium">Liam Johnson</div>
              <div className="hidden text-sm text-muted-foreground md:inline">
                liam@example.com
              </div>
            </TableCell>
            <TableCell className="hidden xl:table-column">
              Sale
            </TableCell>
            <TableCell className="hidden xl:table-column">
              <Badge className="text-xs" variant="outline">
                Approved
              </Badge>
            </TableCell>
            <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
              2023-06-27
            </TableCell>
            <TableCell className="text-right">$550.00</TableCell>
          </TableRow>          <TableRow>
            <TableCell>
              <div className="font-medium">Liam Johnson</div>
              <div className="hidden text-sm text-muted-foreground md:inline">
                liam@example.com
              </div>
            </TableCell>
            <TableCell className="hidden xl:table-column">
              Sale
            </TableCell>
            <TableCell className="hidden xl:table-column">
              <Badge className="text-xs" variant="outline">
                Approved
              </Badge>
            </TableCell>
            <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
              2023-06-27
            </TableCell>
            <TableCell className="text-right">$550.00</TableCell>
          </TableRow>          <TableRow>
            <TableCell>
              <div className="font-medium">Liam Johnson</div>
              <div className="hidden text-sm text-muted-foreground md:inline">
                liam@example.com
              </div>
            </TableCell>
            <TableCell className="hidden xl:table-column">
              Sale
            </TableCell>
            <TableCell className="hidden xl:table-column">
              <Badge className="text-xs" variant="outline">
                Approved
              </Badge>
            </TableCell>
            <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
              2023-06-27
            </TableCell>
            <TableCell className="text-right">$550.00</TableCell>
          </TableRow>          <TableRow>
            <TableCell>
              <div className="font-medium">Liam Johnson</div>
              <div className="hidden text-sm text-muted-foreground md:inline">
                liam@example.com
              </div>
            </TableCell>
            <TableCell className="hidden xl:table-column">
              Sale
            </TableCell>
            <TableCell className="hidden xl:table-column">
              <Badge className="text-xs" variant="outline">
                Approved
              </Badge>
            </TableCell>
            <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
              2023-06-27
            </TableCell>
            <TableCell className="text-right">$550.00</TableCell>
          </TableRow>          <TableRow>
            <TableCell>
              <div className="font-medium">Liam Johnson</div>
              <div className="hidden text-sm text-muted-foreground md:inline">
                liam@example.com
              </div>
            </TableCell>
            <TableCell className="hidden xl:table-column">
              Sale
            </TableCell>
            <TableCell className="hidden xl:table-column">
              <Badge className="text-xs" variant="outline">
                Approved
              </Badge>
            </TableCell>
            <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
              2023-06-27
            </TableCell>
            <TableCell className="text-right">$550.00</TableCell>
          </TableRow>          <TableRow>
            <TableCell>
              <div className="font-medium">Liam Johnson</div>
              <div className="hidden text-sm text-muted-foreground md:inline">
                liam@example.com
              </div>
            </TableCell>
            <TableCell className="hidden xl:table-column">
              Sale
            </TableCell>
            <TableCell className="hidden xl:table-column">
              <Badge className="text-xs" variant="outline">
                Approved
              </Badge>
            </TableCell>
            <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
              2023-06-27
            </TableCell>
            <TableCell className="text-right">$550.00</TableCell>
          </TableRow>          <TableRow>
            <TableCell>
              <div className="font-medium">Liam Johnson</div>
              <div className="hidden text-sm text-muted-foreground md:inline">
                liam@example.com
              </div>
            </TableCell>
            <TableCell className="hidden xl:table-column">
              Sale
            </TableCell>
            <TableCell className="hidden xl:table-column">
              <Badge className="text-xs" variant="outline">
                Approved
              </Badge>
            </TableCell>
            <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
              2023-06-27
            </TableCell>
            <TableCell className="text-right">$550.00</TableCell>
          </TableRow>          <TableRow>
            <TableCell>
              <div className="font-medium">Liam Johnson</div>
              <div className="hidden text-sm text-muted-foreground md:inline">
                liam@example.com
              </div>
            </TableCell>
            <TableCell className="hidden xl:table-column">
              Sale
            </TableCell>
            <TableCell className="hidden xl:table-column">
              <Badge className="text-xs" variant="outline">
                Approved
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
