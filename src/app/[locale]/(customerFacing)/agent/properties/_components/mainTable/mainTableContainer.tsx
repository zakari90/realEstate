"use client";

import { useRouter } from "next/navigation";
import { addProperty, deleteProperty } from "../../../../../../_actions/actions";
import { MainTable } from "./mainTable";

const data = [
    {
      image: 'https://via.placeholder.com/64',
      proprety: 'villa',
      address: '123 Main St',
      status: 'Sale',
      avOffers: '$250.00',
      price: '$250.00',
      date: '2023-06-23'
    },
  ];
  const tableHeaders = {
    image: 'Image',
    proprety: 'Property',
    status: 'Status',
    amount: 'Amount',
    price: 'Price',
    date: 'Date'
  };
  const columnConfigs = [
    { key: 'image', header: 'Image', className: 'w-[100px]' },
    { key: 'proprety', header: 'Property', className: 'hidden sm:table-cell' },
    { key: 'status', header: 'Status', className: 'hidden sm:table-cell' },
    { key: 'avAmount', header: 'Average Offers' },
    { key: 'price', header: 'Price' },
    { key: 'date', header: 'Date', className: 'hidden md:table-cell' },
    { key: 'actions', header: '', className: 'hidden md:table-cell' },
];
interface MainTableContainerProps {
    data: any[]; // Adjust `any` to the actual type of your data if known
  }

export function MainTableContainer({ data }: MainTableContainerProps) {
    const router = useRouter()
  const handleEdit = (itemId: string) => {
    // Implement your edit logic here
  };

  async function  handleDelete (itemId: string) {
    // Implement your delete logic here
    await deleteProperty(itemId)
    router.refresh()
  };

  return (
    <MainTable
    tableHeaders={tableHeaders} 
    title="proprety" 
    description="" 
    data={data}
    onEdit={handleEdit}
    onDelete={handleDelete}
    columnConfigs={columnConfigs}
    />
  );
}