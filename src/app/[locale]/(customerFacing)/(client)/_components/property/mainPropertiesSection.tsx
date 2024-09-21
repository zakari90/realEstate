"use client"

import { ClientProperty } from "@/_actions/client/actions";
import { PageHeader } from "@/components/pageHeader";
import { PropertyCard } from "./propertyCard";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { useState } from 'react'

export default function MainPropertiesSection( {properties}: {properties :ClientProperty[]}) {
  const rowsPerPage = 10;
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(rowsPerPage);

  return (
    <section id="properties" className="space-y-4 mt-8 md:mt-16">
      <div className="container mx-auto px-4">
        <PageHeader>All properties </PageHeader> 
        <div className=" grid grid-cols-1 mx-auto md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">     
         {properties.slice(startIndex, endIndex).map(property => (
          <div key={property.id}>
            <PropertyCard property={property} />  
          </div>
         ))} 
        </div>
        <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              className={
                startIndex === 0 ? "pointer-events-none opacity-50" : undefined
              }
              onClick={() => {
                setStartIndex(startIndex - rowsPerPage);
                setEndIndex(endIndex - rowsPerPage);
              }} />
          </PaginationItem>

          <PaginationItem>
            <PaginationNext
              className={
                endIndex === 100 ? "pointer-events-none opacity-50" : undefined
              }
              onClick={() => {
                setStartIndex(startIndex + rowsPerPage); //10
                setEndIndex(endIndex + rowsPerPage); //10 + 10 = 20
              }} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      </div>
      
    </section>
  )
}

