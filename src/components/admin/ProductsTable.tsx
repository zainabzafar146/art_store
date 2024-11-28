"use client";

import React, { useState, useEffect } from "react";
import {
  useReactTable,
  ColumnDef,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { fetchAllProducts } from "@/actions/fetchAllProducts";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../../components/ui/dialog";
import { Button } from "../ui/button";
import { createAuctionProduct } from "@/actions/createAuctionProduct";
import { toast } from "sonner";

const ProductsTable = () => {
  const [data, setData] = useState<any[]>([]);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [auctionDetails, setAuctionDetails] = useState({
    startingBid: 0,
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const products = await fetchAllProducts();
        setData(products);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadProducts();
  }, []);

  const columns: ColumnDef<any>[] = [
    { accessorKey: "id", header: "ID" },
    { accessorKey: "name", header: "Name" },
    { accessorKey: "price", header: "Price" },
    { accessorKey: "vendor", header: "Vendor" },
    { accessorKey: "type", header: "Type" },
    {
      accessorKey: "action",
      header: "Actions",
      cell: ({ row }) => (
        <Button
          className="py-2 px-4 bg-[#58C5C7] text-white rounded hover:scale-95 transition-all ease-in-out duration-200"
          onClick={() => handleOpenDialog(row.original)}
        >
          Add to Auction
        </Button>
      ),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleOpenDialog = (product: any) => {
    setSelectedProduct(product);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setAuctionDetails({ startingBid: 0, startDate: "", endDate: "" });
  };

  const handleAddToAuction = async () => {
    if (
      !auctionDetails.startingBid ||
      !auctionDetails.startDate ||
      !auctionDetails.endDate
    ) {
      toast.error("Please fill in all fields.");
      return;
    }
  
    try {
      const response = await createAuctionProduct(
        selectedProduct.id, // Pass the correct product ID
        auctionDetails.startingBid,
        auctionDetails.startDate,
        auctionDetails.endDate
      );
  
      if (response.success) {
        toast.success("Product added to auction successfully");
      } else {
        toast.error(`Error: ${response.error}`);
      }
    } catch (error) {
      toast.error("Error adding product to auction: " + error);
    }
  
    // Reset and close dialog
    handleCloseDialog();
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
                  {header.isPlaceholder
                    ? null
                    : flexRender(
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

      {/* Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="p-5 bg-slate-200 rounded-b-2xl">
          <DialogHeader>
            <DialogTitle className="hover:bg-[#58C5C7] hover:scale-95 transition-all ease-in-out duration-200">
              Add to Auction
            </DialogTitle>
            <DialogDescription>
              Enter auction details for {selectedProduct?.name}
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAddToAuction();
            }}
            className="flex flex-col gap-4"
          >
            <input
              type="number"
              placeholder="Starting Bid"
              value={auctionDetails.startingBid}
              onChange={(e) =>
                setAuctionDetails({
                  ...auctionDetails,
                  startingBid: parseFloat(e.target.value),
                })
              }
              className="border border-gray-300 p-2"
              required
            />
            <input
              type="datetime-local"
              placeholder="Start Date"
              value={auctionDetails.startDate}
              onChange={(e) =>
                setAuctionDetails({
                  ...auctionDetails,
                  startDate: e.target.value,
                })
              }
              className="border border-gray-300 p-2"
              required
            />
            <input
              type="datetime-local"
              placeholder="End Date"
              value={auctionDetails.endDate}
              onChange={(e) =>
                setAuctionDetails({
                  ...auctionDetails,
                  endDate: e.target.value,
                })
              }
              className="border border-gray-300 p-2"
              required
            />
            <div className="flex justify-end gap-4">
              <Button
                type="button"
                className="bg-red-600 text-white py-2 px-4 rounded"
                onClick={handleCloseDialog}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-green-500 text-white py-2 px-4 rounded"
              >
                Confirm Auction
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductsTable;
