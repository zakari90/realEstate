'use client'

import { useState } from 'react'
// import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Home, DollarSign, Key } from 'lucide-react'
import Link from 'next/link'
import { PageHeader } from './pageHeader'
import { UploadButton } from '@uploadthing/react'
import { OurFileRouter } from '@/app/[locale]/api/uploadthing/core'

const services = [
  {
    title: "بيع عقارك",
    icon: DollarSign,
    description: "قم بإدراج عقارك وابدأ في الوصول إلى الآلاف من المشترين المحتملين.",
    action: "إدراج الآن",
    href: "/agent"
  },
  {
    title: "شراء عقار",
    icon: Home,
    description: "ابحث عن منزل أحلامك من خلال قوائمنا الواسعة وقدم عروض مخصصة.",
    action: "ابحث عن منازل",
    href: "/properties"
  },
  {
    title: "البحث عن مستثمر",
    icon: Key,
    description: "اكتشف العقار المثالي للإيجار الذي يلبي احتياجاتك.",
    action: "عرض المستثمرين",
    href: "/investors"
  }
]


export default function ServiceSection() {
  return (
    <section className="py-12 mt-3 mb-3 bg-background">
         
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
