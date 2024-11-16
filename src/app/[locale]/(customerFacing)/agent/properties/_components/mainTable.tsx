"use client"
import { AgentPropertyData, deletePropertyById, updatePropertyStatus } from "@/_actions/agent/actions"
import { PropertyDTO } from "@/_actions/client/actions"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
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
import { Label } from "@/components/ui/label"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink
} from "@/components/ui/pagination"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ArrowLeft, ArrowRight, CheckCircle2, Eye, MoreVertical, Pencil, Trash2, XCircle } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { ActiveToggleDropdownItem, DeleteDropdownItem } from "./propertyActions"

const initialColumns = [
  { key: 'status', label: 'Availability' },
  { key: 'image', label: 'Image' },
  { key: 'property', label: 'Property' },
  { key: 'state', label: 'State' },
  { key: 'price', label: 'Price' },
  { key: 'date', label: 'Date' },
  { key: 'actions', label: 'Actions' },
]

export default function MainTableComponent({properties}:{properties:AgentPropertyData[]}) { 
  const [visibleColumns, setVisibleColumns] = useState(initialColumns.map(col => col.key))
  const toggleColumn = (columnKey: string) => {
    setVisibleColumns(prev => 
      prev.includes(columnKey)
        ? prev.filter(key => key !== columnKey)
        : [...prev, columnKey]
    )
  }
  const [propertie, setProperties] = useState<PropertyDTO[]>([]);
  const [isUpdating, setIsUpdating] = useState<Record<string, boolean>>({});
  const router = useRouter();
  const [selectedProperty, setSelectedProperty] = useState<AgentPropertyData | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
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

  if (properties.length === 0) return <p>No property found</p>





  const handleCheckedChange = async (id: string, checked: boolean) => {
    setIsUpdating(prev => ({ ...prev, [id]: true }));
    try {
      const result = await updatePropertyStatus(id, checked);
      if (result.success) {
        setProperties(prevProperties => 
          prevProperties.map(prop => 
            prop.id === id ? { ...prop, status: checked } : prop
          )
        );
        
      } else {
        console.log( "Error updating state" + result.message,);
      
      }
    } catch (error) {
      console.error("Error updating property status:", error);

    } finally {
      setIsUpdating(prev => ({ ...prev, [id]: false }));
      router.refresh();
    }
  };

  return (
    <div className="w-full overflow-auto">
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
          {paginatedProperties.map((property, index) => (
            <TableRow key={index}>
              {property.status ? (
              <TableCell>
                  <span className="sr-only">Available</span>
                  <CheckCircle2 />
                </TableCell>
              ) : (
                <TableCell>
                  <span className="sr-only">Unavailable</span>
                  <XCircle className="stroke-destructive" />
                  </TableCell>
                
              )}
              {visibleColumns.includes("image") && 
              <TableCell>
                <Image
                  src={property?.images?.split(",")[0] || ""}
                  alt={property?.type || ''}
                  width={500}
                  height={500}
                  className="w-12 h-12 object-cover rounded"
                />
              </TableCell>}

              {visibleColumns.includes("property") && <TableCell>{property?.type}</TableCell>}
              {visibleColumns.includes("state") && <TableCell>{property?.state}</TableCell>}
              {visibleColumns.includes("price") && <TableCell>{property?.price}</TableCell>}
              {visibleColumns.includes("date") && <TableCell>{new Date(property.createdAt).toLocaleDateString()}</TableCell>}
              {visibleColumns.includes("actions") && <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <Button className="w-full" variant="outline" onClick={() => handleViewProperty(property)}>
                      <span>Details</span>
                    </Button>
                    {/* <DropdownMenuItem>
                    <Link className="hover:cursor-pointer" href={`/agent/properties/${property.id}/edit`}>
                      <Pencil className="mr-2 h-4 w-4" />
                      <span>Edit</span>
                      </Link>
                    </DropdownMenuItem> */}
                    <DropdownMenuSeparator />
                    <ActiveToggleDropdownItem
                    id={property.id}
                    status={property.status ? property.status : false }
                  />
                  <DropdownMenuSeparator />
                  <DeleteDropdownItem
                    id={property.id}
                  />

                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>}
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
            <Button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1} >
                   <ArrowLeft className='h-4 w-4'/>
                </Button>
            </PaginationItem>
            {[...Array(totalPages)].map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink className="hover:cursor-pointer"
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
                  <TableHead>Amount</TableHead>
                  <TableHead>Period</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
              
                  {selectedProperty?.offers && selectedProperty.offers.length > 0 ? (
                    selectedProperty.offers.map((interaction, index) => (
                      <TableRow key={index}>
                {/* @ts-ignore */}
                <TableCell className="">{interaction.client?.phone ?? 'N/A'}</TableCell>
                <TableCell>{interaction.amount ?? 'N/A'}</TableCell>
                <TableCell>{interaction.period ?? 'N/A'}</TableCell>
                <TableCell>{interaction.createdAt ? new Date(interaction.createdAt).toLocaleDateString() : 'N/A'}</TableCell>
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
    </div>
  )
}
interface SwitchButtonProps {
  id: string;
  label: string;
  checked?: boolean; 
  onCheckedChange: (checked: boolean) => void;
}

export function SwitchButton({ 
  id,
  label, 
  checked = false, 
  onCheckedChange 
}: SwitchButtonProps) {


  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="switch-button"
        checked={checked}
        onCheckedChange={onCheckedChange}
      />
      <Label htmlFor="switch-button">{label}</Label>
    </div>
  );
}
