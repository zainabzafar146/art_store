"use client";

import React, { useState, useEffect } from "react";
import {
  useReactTable,
  ColumnDef,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { fetchAllAuctionProducts } from "@/actions/fetchAuctionProducts"; // Import server action
import { MdDelete } from "react-icons/md";
import { Button } from "../ui/button";
import { deleteAuction } from "@/actions/deleteAuction";
import { toast } from "sonner";

const AuctionProductTable = () => {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadAuctionProducts = async () => {
    try {
      const auctionProducts = await fetchAllAuctionProducts();
      setData(auctionProducts.auctionProducts);
    } catch (error) {
      console.error("Failed to fetch auction products:", error);
    } finally {
      setIsLoading(false); // Add this line
    }
  };
  useEffect(() => {
    loadAuctionProducts();
  }, []);

  const columns: ColumnDef<any>[] = [
    { accessorKey: "id", header: "ID" },
    { accessorKey: "name", header: "Name" },
    { accessorKey: "startingBid", header: "Starting Bid" },
    { accessorKey: "currentBid", header: "Current Bid" },
    { accessorKey: "vendor", header: "Vendor" },
    { accessorKey: "auctionStatus", header: "Auction Status" },
    { accessorKey: "startDate", header: "Start Date" },
    { accessorKey: "endDate", header: "End Date" },
    {
      accessorKey: "action",
      header: "Actions",
      cell: ({ row }) => (
        <Button
          className="py-2 px-4 text-white rounded"
          onClick={() => handleAction(row.original)}
        >
          <MdDelete color="red" size={28} />
        </Button>
      ),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleAction = async (auctionProduct: any) => {
    console.log("this is the id of the auction product", auctionProduct.id);
    try {
      const response = await deleteAuction(auctionProduct.id);
      if (response.success) {
        toast.success("Auction deleted successfully");
        loadAuctionProducts();
      }
    } catch (error) {
      toast.error("Error while deleting auction");
      console.error(error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#58C5C7]" />
      </div>
    );
  }

  return (
    <div>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="border border-gray-300 px-4 py-2"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="border border-gray-300 px-4 py-2">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AuctionProductTable;
