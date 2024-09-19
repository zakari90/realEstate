'use client'

import { useState } from 'react'
// import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Home, DollarSign, Key } from 'lucide-react'

const services = [
  {
    title: "Sell Your Property",
    icon: DollarSign,
    description: "List your property and reach thousands of potential buyers.",
    action: "List Now"
  },
  {
    title: "Buy a Property",
    icon: Home,
    description: "Find your dream home with our extensive listings and make custom offers.",
    action: "Search Homes"
  },
  {
    title: "Rent a Property",
    icon: Key,
    description: "Discover the perfect rental property for your needs.",
    action: "View Rentals"
  }
]

export default function ServiceSection() {
  const [showOfferForm, setShowOfferForm] = useState(false)
  const [offerPrice, setOfferPrice] = useState('')
  const [paymentPeriod, setPaymentPeriod] = useState('')

  const handleMakeOffer = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the offer to your backend
    console.log(`Offer made: $${offerPrice} over ${paymentPeriod} months`)
    alert(`Offer submitted: $${offerPrice} over ${paymentPeriod} months`)
    setShowOfferForm(false)
    setOfferPrice('')
    setPaymentPeriod('')
  }

  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            // <motion.div
            //   key={service.title}
            //   initial={{ opacity: 0, y: 20 }}
            //   animate={{ opacity: 1, y: 0 }}
            //   transition={{ duration: 0.5, delay: index * 0.1 }}
            // >
              <Card className="h-full flex flex-col">
                <CardHeader>
                  <CardTitle className="flex items-center text-2xl font-semibold">
                    <service.icon className="mr-2 h-6 w-6 animate-bounce" />
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-between">
                  <p className="text-muted-foreground mb-4">{service.description}</p>
                  <Button 
                    onClick={() => service.title === "Buy a Property" ? setShowOfferForm(true) : null}
                    className="w-full"
                  >
                    {service.action}
                  </Button>
                </CardContent>
              </Card>
            // </motion.div>
          ))}
        </div>
        {showOfferForm && (
          // <motion.div
          //   initial={{ opacity: 0, scale: 0.95 }}
          //   animate={{ opacity: 1, scale: 1 }}
          //   exit={{ opacity: 0, scale: 0.95 }}
          //   transition={{ duration: 0.3 }}
          //   className="fixed inset-0 bg-background/80 backdrop-blur-sm flex justify-center items-center p-4"
          // >
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle>Make a Custom Offer</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleMakeOffer} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="offerPrice">Offer Price ($)</Label>
                    <Input
                      id="offerPrice"
                      type="number"
                      placeholder="Enter your offer"
                      value={offerPrice}
                      onChange={(e) => setOfferPrice(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="paymentPeriod">Payment Period (months)</Label>
                    <Input
                      id="paymentPeriod"
                      type="number"
                      placeholder="Enter payment period"
                      value={paymentPeriod}
                      onChange={(e) => setPaymentPeriod(e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex space-x-2">
                    <Button type="submit" className="flex-1">Submit Offer</Button>
                    <Button type="button" variant="outline" onClick={() => setShowOfferForm(false)} className="flex-1">
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          // </motion.div>
        )}
      </div>
    </section>
  )
}