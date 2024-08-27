"use client";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import Image from "next/image";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { PropretyDetailsTable } from "../detailsTable";
import { ActionMenu } from "./mainTableActions";

// Define column configuration
interface ColumnConfig {
    key: string;
    header: string;
    className?: string;
}



interface MainTableProps {
    data: any[];
    rowsPerPage?: number;
    title: string;
    description: string;
    tableHeaders: { [key: string]: string };
    
    onEdit: (itemId: string) => void;  // Assuming `itemId` is a string
    onDelete: (itemId: string) => void; // Assuming `itemId` is a string
    columnConfigs: ColumnConfig[];
}

export function MainTable({
    data = [],
    rowsPerPage = 10,
    title,
    description,
    tableHeaders,
    onEdit,
    onDelete,
    columnConfigs
}: MainTableProps) {
    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(rowsPerPage);

    if (!Array.isArray(data)) {
        console.error('Invalid data format. Expected an array.');
        return <div>Error: Invalid data format.</div>;
    }
    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
            <Card>
                <CardHeader className="px-7 overflow-auto">
                    <CardTitle>{title}</CardTitle>
                    <CardDescription>{description}</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                {columnConfigs.map((col) => (
                                    <TableHead key={col.key} className={col.className}>
                                        {tableHeaders[col.key] } 
                                    </TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.slice(startIndex, endIndex).map((row, index) => (
                                <TableRow key={index} className={index % 2 === 0 ? 'bg-accent' : ''}>
                                    {columnConfigs.map((col) => (
                                        <TableCell key={col.key} className={col.className}>
                                            {col.key === 'image' ? (
                                                <Dialog>
                                                    <DialogTrigger>
                                                        <Image
                                                            alt="Product image"
                                                            className="aspect-square rounded-md object-cover"
                                                            height="64"
                                                            src={row[col.key]} 
                                                            width="64"
                                                        />
                                                    </DialogTrigger>
                                                    <DialogContent className="h-5/6 overflow-auto">
                                                        <DialogHeader>
                                                            <DialogTitle>Property Details</DialogTitle>
                                                            <DialogDescription>
                                                                Property details
                                                            </DialogDescription>
                                                        </DialogHeader>
                                                        <PropretyDetailsTable />
                                                    </DialogContent>
                                                </Dialog>
                                            ) : col.key === 'actions' ? (
                                                <ActionMenu itemId={row.id} onEdit={onEdit} onDelete={onDelete}/>
                                            ) : (
                                                <div>{row[col.key]}</div>
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    
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
                setEndIndex(endIndex + rowsPerPage); 
              }} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
                </CardContent>
            </Card>
        </div>
    );
}
