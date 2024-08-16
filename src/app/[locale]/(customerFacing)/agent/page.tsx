import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import db from '@/db/db'
import React from 'react'

async function getAgentProperties() {
  const properties = await db.property.findMany()

  return properties
}


async function getAgentClients(agentId:string) {
  const clients = await db.client.findMany({
    where: {
      offers: {
        some: {
          property: {
            agentId: agentId
          }
        }
      }
    }
  });

  return clients;
}

async function AgentPage() {
  const properties = await getAgentProperties()
  const clients = await getAgentClients("")
  return (
    <>
      <div>Agent Page</div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        
        <DashboardCard
        title='title'
        subtitle='number'
        body='details'
        />
        {properties.length}
        <DashboardCard
        title={'title'}
        subtitle='number'
        body='details'
        />
      </div>

    </>
  )
}

export default AgentPage

type DashboardCardProps = {
  title: string
  subtitle: string
  body: string
}

function DashboardCard({ title, subtitle, body }: DashboardCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{subtitle}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{body}</p>
      </CardContent>
    </Card>
  )
}