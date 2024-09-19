"use client"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Eye, MoreVertical, Pencil, Trash2 } from "lucide-react"
import Image from "next/image"
import { useSelector, useDispatch } from 'react-redux';
import { fetchProperties, selectProperties, selectStatus } from "@/lib/features/agentData/agentData"
import Link from "next/link"
import { Offer } from "@prisma/client"
import { AgentPropertyData } from "@/app/_actions/agent/actions"


export default function MainTableComponent({properties}:{properties:AgentPropertyData[]}) {
  
  const [selectedProperty, setSelectedProperty] = useState<AgentPropertyData | null>(null);

  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)


  const handleViewProperty = (property: AgentPropertyData) => {
    setSelectedProperty(property)
    setIsViewDialogOpen(true)
  }

 
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(5)
  
  const totalPages = properties.length > 0 ? Math.ceil(properties.length / itemsPerPage) : 0
  const paginatedProperties = properties.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )
  
 
  if (properties.length === 0) return <p>No products found</p>
  return (
    <div className="w-full overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Image</TableHead>
            <TableHead>Property</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedProperties.map((property, index) => (
            <TableRow key={index}>
              <TableCell>
                <Image
                  src={property?.images?.split(",")[0] || ""}
                  alt={property?.type  ||''}
                  width={500}
                  height={500}
                  className="w-12 h-12 object-cover rounded"
                />
              </TableCell>
              <TableCell className="font-medium">{property?.type}</TableCell>
              <TableCell>{property?.status}</TableCell>
              <TableCell>{property?.price}</TableCell>
              <TableCell>{new Date(property.createdAt).toLocaleDateString()}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem onSelect={() => handleViewProperty(property)}>
                      <Eye className="mr-2 h-4 w-4" />
                      <span>View</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                    <Link className="hover:cursor-pointer" href={`/agent/properties/${property.id}/edit`}>
                      <Pencil className="mr-2 h-4 w-4" />
                      <span>Edit</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">
                      <Trash2 className="mr-2 h-4 w-4" />
                      <span>Delete</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex items-center justify-between space-x-2 py-4">
        <Select
          value={itemsPerPage.toString()}
          onValueChange={(value) => {
            setItemsPerPage(Number(value))
            setCurrentPage(1)
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select rows per page" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5">5 rows per page</SelectItem>
            <SelectItem value="10">10 rows per page</SelectItem>
            <SelectItem value="20">20 rows per page</SelectItem>
          </SelectContent>
        </Select>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              />
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
              <PaginationNext
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>{selectedProperty?.type} - Customer Interactions</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer Number</TableHead>
                  <TableHead>Offer Amount</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>

                  {selectedProperty?.offers && selectedProperty.offers.length > 0 ? (
                    selectedProperty.offers.map((interaction, index) => (
                      <TableRow key={index}>
                        {/* <TableCell>{interaction.number ?? 'N/A'}</TableCell> */}
                        <TableCell>{interaction.amount ?? 'N/A'}</TableCell>
                        {/* Ensure these fields are relevant and exist in `interaction` */}
                      </TableRow>
                    ))
                  ) : (
                    <p>You don t have any offers</p>
                  )}
              </TableBody>
            </Table>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit: {selectedProperty?.type}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <p>Edit functionality would go here.</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}