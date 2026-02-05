
'use client'

import { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { AgentPropertyData } from '@/_actions/agent/actions'

// Sample data (in a real application, this would come from an API or database)
const offers = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  property: `Property ${i + 1}`,
  offerAmount: Math.floor(Math.random() * 500000) + 200000,
  paymentPeriod: Math.floor(Math.random() * 24) + 12,
  status: ['Pending', 'Accepted', 'Rejected'][Math.floor(Math.random() * 3)],
}))

const initialColumns = [
  { key: 'id', label: 'ID' },
  { key: 'property', label: 'Property' },
  { key: 'customer', label: 'Customer' },
  { key: 'offerAmount', label: 'Amount' },
  { key: 'paymentPeriod', label: 'Period' },
  { key: 'status', label: 'Status' },
]

export default function OffersTable({properties}:{properties:AgentPropertyData[]}) {
  // const offers = properties
  const [currentPage, setCurrentPage] = useState(1)
  const [visibleColumns, setVisibleColumns] = useState(initialColumns.map(col => col.key))
  const itemsPerPage = 10
  const totalPages = Math.ceil(offers.length / itemsPerPage)

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return offers.slice(startIndex, endIndex)
  }

  const toggleColumn = (columnKey: string) => {
    setVisibleColumns(prev => 
      prev.includes(columnKey)
        ? prev.filter(key => key !== columnKey)
        : [...prev, columnKey]
    )
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Offers</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex flex-wrap gap-4">
          {initialColumns.map(column => (
            <div key={column.key} className="flex items-center space-x-2">
              <Checkbox
                id={`column-${column.key}`}
                checked={visibleColumns.includes(column.key)}
                onCheckedChange={() => toggleColumn(column.key)}
              />
              <Label htmlFor={`column-${column.key}`}>{column.label}</Label>
            </div>
          ))}
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {initialColumns.map(column => 
                  visibleColumns.includes(column.key) && (
                    <TableHead key={column.key} className="whitespace-nowrap">
                      {column.label}
                    </TableHead>
                  )
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {getCurrentPageData().map((offer) => (
                <TableRow key={offer.id}>
                  {/* {visibleColumns.includes('id') && <TableCell className="font-medium">{offer.id}</TableCell>}
                  {visibleColumns.includes('property') && <TableCell>{offer.property}</TableCell>}
                  {visibleColumns.includes('customer') && <TableCell>0666</TableCell>}
                  {visibleColumns.includes('offerAmount') && <TableCell>${offer.offerAmount.toLocaleString()}</TableCell>}
                  {visibleColumns.includes('paymentPeriod') && <TableCell>{offer.paymentPeriod} months</TableCell>}
                  {visibleColumns.includes('status') && <TableCell>{offer.status}</TableCell>} */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <Pagination className="mt-4">
          <PaginationContent>
            <PaginationItem>
            <Button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1} >
                   <ArrowLeft className='h-4 w-4'/>
                </Button>
            </PaginationItem>
            {[...Array(totalPages)].map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink 
                  onClick={() => setCurrentPage(i + 1)}
                  isActive={currentPage === i + 1}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
            <Button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}>
                   <ArrowRight className='h-4 w-4'/>
                </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </CardContent>
    </Card>
  )
}

