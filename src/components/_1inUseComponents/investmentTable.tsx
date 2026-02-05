"use client";

import {
  investmentData,
  updateInvestementOfferStatus,
} from "@/_actions/agent/actions";
import PhoneCallLink from "@/components/_1inUseComponents/phoneCallComponent";
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
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
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
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAgentInvestmentStore } from "@/context/investementStore";
import { ArrowLeft, ArrowRight, CheckCircle2, MoreVertical, XCircle } from 'lucide-react';
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { DeleteInvestmentItem, InvestmentActionsItem } from "./investorsActions";

const initialColumns = [
  { key: "status", label: "الحالة" },
  { key: "title", label: "العنوان" },
  { key: "price", label: "السعر" },
  // { key: "description", label: "وصف" },
  { key: "numContributors", label: "المساهمون" },
  { key: "date", label: "التاريخ" },
  { key: "actions", label: "الإجراءات" },
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

  const totalPages = investments.length > 0 ? Math.ceil(investments.length / itemsPerPage) : 0;
  const paginatedInvestments = investments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  if (investments.length === 0) return <p>لا توجد نتائج</p>


  const handleViewInvestment = (investment: investmentData) => {
    setSelectedInvestment(investment);
    setIsViewDialogOpen(true);
  };

  return (
    <div className="w-full overflow-auto" dir="rtl">
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
            {initialColumns.map(
              (column) =>
                visibleColumns.includes(column.key) && (
                  <TableHead key={column.key} className="whitespace-nowrap text-center">
                    {column.label}
                  </TableHead>
                ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedInvestments.map((investment, index) => (
            <TableRow key={index}>
              {visibleColumns.includes("status") && (
                <TableCell>
                  {investment.status ? (
                    <TableCell>
                    <span className="sr-only">متوفر</span>
                    <CheckCircle2 className="text-blue-500" />
                  </TableCell>
                  ) : (
                  <TableCell>
                    <span className="sr-only">غير متوفر</span>
                    <XCircle className="text-red-500" />
                  </TableCell>
                  )}
                </TableCell>
              )}
              {visibleColumns.includes("title") && <TableCell className="bg-blue-400">{investment.title}</TableCell>}
              {visibleColumns.includes("price") && <TableCell>{investment.price}</TableCell>}
              {visibleColumns.includes("description") && <TableCell className="bg-blue-400">{investment.description}</TableCell>}
              {visibleColumns.includes("numContributors") && <TableCell>{investment.numContributors}</TableCell>}
              {visibleColumns.includes("date") && ( <TableCell>{investment.createdAt.toLocaleDateString()}</TableCell>)}
              {visibleColumns.includes("actions") && (
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">فتح القائمة</span>
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel className="sr-only">الإجراءات</DropdownMenuLabel>
                      <Button className="w-full" variant="outline" onClick={() => handleViewInvestment(investment)}>
                        <span>التفاصيل</span>
                      </Button>
                      <DropdownMenuSeparator />
                      <InvestmentActionsItem
                        id={investment.id}
                        status={investment.status ? investment.status : false}/>
                      <DropdownMenuSeparator />
                      <DeleteInvestmentItem id={investment.id} />
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex items-center justify-between space-x-2 py-4">
        <Select
          value={itemsPerPage.toString()}
          onValueChange={(value) => {
            setItemsPerPage(Number(value));
            setCurrentPage(1);
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="اختر عدد الصفوف لكل صفحة" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5">5 صفوف</SelectItem>
            <SelectItem value="10">10 صفوف</SelectItem>
            <SelectItem value="20">20 صف</SelectItem>
          </SelectContent>
        </Select>

        <Pagination dir="ltr">
          <PaginationContent>
            <PaginationItem>
              <Button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
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
              <Button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[625px]" dir="rtl">
          <DialogHeader>
            <DialogTitle>{selectedInvestment?.title} - تفاعلات العملاء</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">رقم العميل</TableHead>
                  <TableHead className="text-right">المبلغ</TableHead>
                  <TableHead className="text-right">مقبول</TableHead>
                  <TableHead className="text-right">التاريخ</TableHead>
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
                <TableCell colSpan={4}>لا توجد عروض متاحة</TableCell>
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
        const { agent, agentInvestments, error, isLoading, fetchAgentInvestemtData } = useAgentInvestmentStore()
  
  const router = useRouter();

  const handleToggleAccepted = async (offerId: string, checked: boolean) => {
    try {
      const result = await updateInvestementOfferStatus(offerId, checked);
      if (result.success) {
        setOfferStatus(checked);
        router.refresh();
      }
    } catch (error) {
      console.error("خطأ في تحديث حالة عرض الاستثمار:", error);
      setOfferStatus(!checked);
    }
  };

  return (
    <>
      <TableCell>{offer.accepted === true ? (<PhoneCallLink phone={offer.clientPhone || ""} />) : (<p>غير مقبول</p>)}</TableCell>      
      <TableCell>{offer.offerAmount}</TableCell>
      <TableCell dir="ltr" className="text-right">
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
      </TableCell>
      <TableCell>
        {offer.createdAt.toLocaleDateString()}
      </TableCell>
    </>
  );
}

