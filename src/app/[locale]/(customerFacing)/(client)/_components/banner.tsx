'use client'

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronDown, Search } from "lucide-react"
import { useState } from "react"
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import Autoplay from "embla-carousel-autoplay"
import { Toggle } from "@/components/ui/toggle"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Banner() {
  const [searchTerm, setSearchTerm] = useState("")
  const [searchCategory, setSearchCategory] = useState("All")
  const [filters, setFilters] = useState({
    houses: false,
    apartments: false,
    condos: false,
  })
  const images = [
    "/images/house.jpg",
    "/images/cotton/cotton2.jpg",
    "/images/cotton/cotton3.jpg",
    "/images/cotton/cotton-plant.jpg"
  ]


  const handleSearch = () => {
    console.log("Searching for:", searchTerm, "in category:", searchCategory, "with filters:", filters)
  }

  return (
    <div className="relative h-[80vh] w-full overflow-hidden">
      <Image
        alt="Luxury neighborhood"
        className="object-cover "
        fill={true}
        src="https://images.unsplash.com/photo-1604014237800-1c9102c219da?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
      />
      {/* <div className="absolute inset-0 bg-black/60" /> */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left lg:w-1/2">
              <h1 className="mb-4 text-4xl font-bold text-white sm:text-5xl md:text-6xl">
                Find Your Dream Property
              </h1>
              <div className="mb-4">
                <div className="flex">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="rounded-r-none border-r-0">
                        {searchCategory} <ChevronDown className="ml-2 h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onSelect={() => setSearchCategory("All")}>All</DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => setSearchCategory("For Sale")}>For Sale</DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => setSearchCategory("For Rent")}>For Rent</DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => setSearchCategory("New Developments")}>New Investments</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Input
                    type="text"
                    placeholder="Enter location or property type"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full rounded-none border-x-0"
                  />
                  <Button 
                    className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-l-none"
                    onClick={handleSearch}
                    aria-label="Start search"
                  >
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}