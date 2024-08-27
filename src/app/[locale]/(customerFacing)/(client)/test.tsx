"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Home, Phone, Mail, MapPin, Star, Key, Search, Building, Warehouse, MapPinIcon, RulerIcon } from 'lucide-react'

import { BathIcon, BedIcon, Pin, PinIcon, Ruler} from 'lucide-react';

import Link from 'next/link'
import Image from 'next/image'


export default function RealEstateLanding() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [propertyType, setPropertyType] = useState(['residential'])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', { email, message })
    setEmail('')
    setMessage('')
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle search here
    console.log('Search query:', searchQuery, 'Property types:', propertyType)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-background border-b">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Home className="h-6 w-6 text-primary" />
            <span className="text-2xl font-bold text-primary">DreamHome Realty</span>
          </div>
          <nav>
            <ul className="flex space-x-4">
              <li><a href="#properties" className="text-muted-foreground hover:text-primary">Properties</a></li>
              <li><a href="#services" className="text-muted-foreground hover:text-primary">Services</a></li>
              <li><a href="#testimonials" className="text-muted-foreground hover:text-primary">Testimonials</a></li>
              <li><a href="#contact" className="text-muted-foreground hover:text-primary">Contact</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        <section className="bg-muted py-20">
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
              <h1 className="text-4xl font-bold mb-4">Find Your Dream Home Today</h1>
              <p className="text-xl mb-8">Discover the perfect property with DreamHome Realty</p>
              <ToggleGroup 
                type="multiple" 
                value={propertyType} 
                onValueChange={setPropertyType}
                className="justify-center md:justify-start mb-4"
                aria-label="Select property type"
              >
                <ToggleGroupItem value="residential" aria-label="Residential">
                  <Home className="h-4 w-4 mr-2" />
                  Residential
                </ToggleGroupItem>
                <ToggleGroupItem value="commercial" aria-label="Commercial">
                  <Building className="h-4 w-4 mr-2" />
                  Commercial
                </ToggleGroupItem>
                <ToggleGroupItem value="industrial" aria-label="Industrial">
                  <Warehouse className="h-4 w-4 mr-2" />
                  Industrial
                </ToggleGroupItem>
              </ToggleGroup>
              <form onSubmit={handleSearch} className="mb-8 flex">
                <Input
                  type="text"
                  placeholder="Search for properties..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="mr-2"
                  aria-label="Search for properties"
                />
                <Button type="submit">
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </form>
              <Button size="lg">Start Your Search</Button>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <svg
                width="300"
                height="300"
                viewBox="0 0 300 300"
                className="text-primary"
                aria-label="Stylized 3D house illustration"
              >
                <path
                  d="M150 50 L50 150 L75 150 L75 250 L225 250 L225 150 L250 150 Z"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="8"
                />
                <rect x="100" y="175" width="40" height="75" fill="white" />
                <rect x="160" y="175" width="40" height="40" fill="white" />
                <path
                  d="M145 50 L75 120 L75 110 L145 40 Z"
                  fill="white"
                  stroke="currentColor"
                  strokeWidth="4"
                />
              </svg>
            </div>
          </div>
        </section>

        <section id="properties" className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Featured Properties</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <Card key={i}>
                  <CardContent className="p-4">
                    <img src={`/placeholder.svg?height=200&width=300&text=Property+${i}`} alt={`Property ${i}`} className="w-full h-48 object-cover mb-4 rounded" />
                    <h3 className="text-xl font-semibold mb-2">Beautiful Home {i}</h3>
                    <p className="text-muted-foreground mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    <Button variant="outline">View Details</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="services" className="bg-muted py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Our Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: "Buying", icon: Home },
                { title: "Selling", icon: MapPin },
                { title: "Renting", icon: Key },
              ].map((service, i) => (
                <Card key={i}>
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    <service.icon className="h-12 w-12 text-primary mb-4" />
                    <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                    <p className="text-muted-foreground">We offer comprehensive {service.title.toLowerCase()} services to meet all your real estate needs.</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="testimonials" className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">What Our Clients Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <Card key={i}>
                  <CardContent className="p-4">
                    <div className="flex items-center mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-5 w-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-4">"DreamHome Realty made finding our perfect home a breeze. Their expertise and dedication are unmatched!"</p>
                    <p className="font-semibold">- Happy Client {i}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="bg-muted py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Contact Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Get in Touch</h3>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <Input
                      type="email"
                      placeholder="Your Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <Textarea
                      placeholder="Your Message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit">Send Message</Button>
                </form>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Our Office</h3>
                <div className="space-y-2">
                  <p className="flex items-center">
                    <MapPin className="h-5 w-5 mr-2 text-primary" />
                    123 Real Estate St, Cityville, State 12345
                  </p>
                  <p className="flex items-center">
                    <Phone className="h-5 w-5 mr-2 text-primary" />
                    (123) 456-7890
                  </p>
                  <p className="flex items-center">
                    <Mail className="h-5 w-5 mr-2 text-primary" />
                    info@dreamhomerealty.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-background border-t py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2023 DreamHome Realty. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

type PropertiesSectionProps ={
  title: string,
  propertiesFetcher: ()=>Promise<any[]>
}



export async function PropertiesSection({title, propertiesFetcher} : PropertiesSectionProps) {
  return(
    <section id="properties" className="space-y-4">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold mb-8 text-center">{title} </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
       {(await propertiesFetcher()).map(property => (
        <p key={property.id}>
          {property}
        </p>
        
        // <PropertyCard key={property.id} {...property} />
       ))}
       
      </div>
    </div>
  </section>
  )
}


interface IPost {
  id?: string;
  title?: string;
  img?: string;
  bedroom?: number;
  bathroom?: number;
  price?: number;
  address?: string;
}

export function PropertyCard({ 
  id = 's',
  title = 'Default Title',
  img = '/default-image.png',
  bedroom = 0,
  bathroom = 0,
  price = 0,
  address = 'Default Address',
}: IPost) {
	return (
    <Card className='flex overflow-hidden'>
    <Link href={`/`} className="flex-auto w-32 h-48">
      <Image
      width={200}
      height={200}
        className=" object-cover rounded-lg"
        src={"https://via.placeholder.com/220"}
        alt="Card Image"
      />
    </Link>
    <div>
    
<CardHeader>
  <CardTitle>Villa</CardTitle>
  <CardDescription>
    <div className='flex gap-1' > 
      <MapPinIcon className="w-4 h-4" />
      <p>sect nahda rue sale</p>
    </div>
  </CardDescription>
</CardHeader>
<CardContent>
  <p>30000 DH</p>
</CardContent>
<CardFooter>
<div className='flex gap-3'>
<div className='flex items-center gap-1' > 
  <RulerIcon className="w-4 h-4" />
  <p>100 m<sup>2</sup></p>
</div>
<div className='flex items-center gap-1' > 
  <BedIcon className="w-4 h-4" />
  <p>1 Bedroom</p>
</div>
<div className='flex items-center gap-1' > 
  <BathIcon className="w-4 h-4" />
  <p>1 Bathroom</p>
</div>
</div>

</CardFooter>
  
</div>
</Card>
	)
}
export function PropertyCardSkeleton() {
  return (
    <Card className="overflow-hidden flex  animate-pulse">
      <div className="w-1/4 aspect-video bg-gray-300" />
      <div>

      <CardHeader>
        <CardTitle>
          <div className="w-3/4 h-6 rounded-full bg-gray-300" />
        </CardTitle>
        <CardDescription>
          <div className="w-1/2 h-4 rounded-full bg-gray-300" />
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="w-full h-4 rounded-full bg-gray-300" />
        <div className="w-full h-4 rounded-full bg-gray-300" />
        <div className="w-3/4 h-4 rounded-full bg-gray-300" />
      </CardContent>
      <CardFooter>
        <Button className="w-full" disabled size="lg"></Button>
      </CardFooter>
      </div>

    </Card>
  )
} 