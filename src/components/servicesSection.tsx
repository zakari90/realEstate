'use client'

import { useState } from 'react'
// import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Home, DollarSign, Key } from 'lucide-react'
import Link from 'next/link'
import { PageHeader } from './pageHeader'

const services = [
  {
    title: "Sell Your Property",
    icon: DollarSign,
    description: "List your property and reach thousands of potential buyers.",
    action: "List Now",
    href:"/agent"
  },
  {
    title: "Buy a Property",
    icon: Home,
    description: "Find your dream home with our extensive listings and make custom offers.",
    action: "Search Homes",
    href:"/properties"
  },
  {
    title: "Find investor",
    icon: Key,
    description: "Discover the perfect rental property for your needs.",
    action: "View Investor",
    href:"/investors"
  }
]

export default function ServiceSection() {
  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <PageHeader>الخدمات</PageHeader>
        <div className="flex flex-col justify-center items-center md:flex-row  md:gap-8">
          {services.map((service, index) => (
            // <motion.div
            //   key={service.title}
            //   initial={{ opacity: 0, y: 20 }}
            //   animate={{ opacity: 1, y: 0 }}
            //   transition={{ duration: 0.5, delay: index * 0.1 }}
            // >
              <Card key={service.title} className="max-w-xs w-full flex flex-col mb-4">
                <CardHeader>
                  <CardTitle className="flex items-center text-2xl font-semibold">
                    <service.icon aria-hidden="true" className="mr-2 h-6 w-6" />
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-between">
                  <p className="text-muted-foreground mb-4">{service.description}</p>
                  <Button className="w-full">
                    <Link href={service.href}>
                    {service.action}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            // </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
