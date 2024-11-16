"use client";
import {
  investmentData,
  updateInvestementOfferStatus,
} from "@/_actions/agent/actions";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, ArrowRight, CheckCircle2, Eye, MoreVertical, Trash2, XCircle } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { InvestmentActionsItem } from "./investorsActions";
import { Switch } from "@/components/ui/switch";
import { DeleteDropdownItem } from "../../properties/_components/propertyActions";
import { InvestmentOffer } from "@prisma/client";

const initialColumns = [
  { key: "status", label: "Status" },
  { key: "title", label: "Title" },
  { key: "price", label: "Price" },
  { key: "location", label: "Location" },
  { key: "numContributors", label: "Contributors" },
  { key: "date", label: "Date" },
  { key: "actions", label: "Actions" },
];

export default function InvestmentMainTableComponent({ investments }: { investments: investmentData[] }) {
  const [visibleColumns, setVisibleColumns] = useState(initialColumns.map(col => col.key));
  const toggleColumn = (columnKey: string) => {
    setVisibleColumns(prev => 
      prev.includes(columnKey)
        ? prev.filter(key => key !== columnKey)
        : [...prev, columnKey]
    );
  };
  
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [selectedInvestment, setSelectedInvestment] = useState<investmentData | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [offerStatusMap, setOfferStatusMap] = useState<Map<string, boolean | null>>(new Map()); // Track status by offer ID
  const router = useRouter();

  const totalPages = investments.length > 0 ? Math.ceil(investments.length / itemsPerPage) : 0;
  const paginatedInvestments = investments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleViewInvestment = (investment: investmentData) => {
    setSelectedInvestment(investment);
    setIsViewDialogOpen(true);
  };

  const handleToggleAccepted = async (id: string, checked: boolean) => {
    // Update the status immediately for UI feedback
    setOfferStatusMap(prev => new Map(prev).set(id, checked));

    try {
      // Call the API to update the offer status on the backend
      const result = await updateInvestementOfferStatus(id, checked);
      if (result.success) {
        router.refresh();
        return true;
      } else {
        // Revert the status if the update failed
        setOfferStatusMap(prev => new Map(prev).set(id, !checked)); // Revert to previous state
        return false;
      }
    } catch (error) {
      console.error("Error updating investment offer status:", error);
      setOfferStatusMap(prev => new Map(prev).set(id, !checked)); // Revert to previous state
      return false;
    }
  };

  return (
    <div className="w-full overflow-auto">
      {/* Column visibility toggle */}
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

      {/* Table component */}
      <Table>
        <TableHeader>
          <TableRow>
            {initialColumns.map(
              (column) =>
                visibleColumns.includes(column.key) && (
                  <TableHead key={column.key} className="whitespace-nowrap">
                    {column.label}
                  </TableHead>
                )
            )}
          </TableRow>
        </TableHeader>

        <TableBody>
          {paginatedInvestments.map((investment, index) => (
            <TableRow key={index}>
              {/* Status */}
              {visibleColumns.includes("status") && (
                <TableCell>
                  {investment.status ? (
                    <CheckCircle2 className="text-green-500" />
                  ) : (
                    <XCircle className="text-red-500" />
                  )}
                </TableCell>
              )}

              {/* Title */}
              {visibleColumns.includes("title") && <TableCell>{investment.title}</TableCell>}

              {/* Price */}
              {visibleColumns.includes("price") && <TableCell>{investment.price}</TableCell>}

              {/* Location */}
              {visibleColumns.includes("location") && <TableCell>{investment.location}</TableCell>}

              {/* Contributors */}
              {visibleColumns.includes("numContributors") && <TableCell>{investment.numContributors}</TableCell>}

              {/* Date */}
              {visibleColumns.includes("date") && (
                <TableCell>{new Date(investment.createdAt).toLocaleDateString()}</TableCell>
              )}

              {/* Actions */}
              {visibleColumns.includes("actions") && (
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel className="sr-only">Actions</DropdownMenuLabel>
                      <Button className="w-full" variant="outline" onClick={() => handleViewInvestment(investment)}>
                        <Eye className="mr-2 h-4 w-4" />
                        <span>Details</span>
                      </Button>
                      <DropdownMenuSeparator />
                      <InvestmentActionsItem
                        id={investment.id}
                        status={investment.status ? investment.status : false}
                      />
                      <DropdownMenuSeparator />
                      <DeleteDropdownItem id={investment.id} />
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination */}
      <div className="flex items-center justify-between space-x-2 py-4">
        <Select
          value={itemsPerPage.toString()}
          onValueChange={(value) => {
            setItemsPerPage(Number(value));
            setCurrentPage(1);
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
              <Button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </PaginationItem>
            {[...Array(totalPages)].map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  className="hover:cursor-pointer"
                  onClick={() => setCurrentPage(i + 1)}
                  isActive={currentPage === i + 1}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <Button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                <ArrowRight className="h-4 w-4" />
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

      {/* Investment Details Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>{selectedInvestment?.title} - Customer Interactions</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer Number</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Accepted</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
              {selectedInvestment?.offers?.length ? (
                selectedInvestment.offers.map((offer, index) => (
              <TableRow key={offer.id}>
                    <InvestmentDetails offer={offer} index={index} />
                  </TableRow>
                ))) 
                : 
                (
                <TableRow>
                <TableCell colSpan={4}>No offers available</TableCell>
              </TableRow>
            )}
              </TableBody>
            </Table>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}


interface investmenOfferProps {
  offer: {
    id: string;
    client: {
      id: string;
      name: string;
      email: string | null;
      phone: string | null;
      createdAt: Date;
      updatedAt: Date;
    } | null;
    createdAt: Date;
    clientName: string;
    clientEmail: string | null;
    clientPhone: string | null;
    offerAmount: number;
    accepted: boolean | null;
  };
  index: number;
}

function InvestmentDetails({ offer, index }: investmenOfferProps) {
  const [offerStatus, setOfferStatus] = useState<boolean>(offer.accepted || false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleToggleAccepted = async (offerId: string, checked: boolean) => {
    try {
      const result = await updateInvestementOfferStatus(offerId, checked);
      if (result.success) {
        setOfferStatus(checked);
        router.refresh();
      }
    } catch (error) {
      console.error("Error updating investment offer status:", error);
      setOfferStatus(!checked); // Revert on error
    }
  };

  return (
    <>
      <TableCell>{offer.clientPhone}</TableCell>
      <TableCell>{offer.offerAmount}</TableCell>
      <TableCell>
        <div className="flex items-center space-x-2">
          <Switch
            checked={offerStatus}
            onCheckedChange={(checked) => {
              startTransition(async () => {
                await handleToggleAccepted(offer.id, checked);
              });
            }}
            id={`offer-accepted-${index}`}
            disabled={isPending}
          />
          <Label htmlFor={`offer-accepted-${index}`}>
            {isPending ? "Updating..." : "Accept Offer"}
          </Label>
        </div>
      </TableCell>
      <TableCell>
        {new Date(offer.createdAt).toLocaleDateString()}
      </TableCell>
    </>
  );
}