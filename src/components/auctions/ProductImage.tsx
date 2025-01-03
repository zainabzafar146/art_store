"use client";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from "sonner";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { placeBid } from "@/actions/placeBid";
import AuctionTimer from "./AuctionTimer"; // Timer Component
import { Button } from "../ui/button";
import { AuctionProduct } from "@prisma/client";

// interface ProductDetails {
//   id: number;
//   name: string;
//   price: number;
//   vendor: string;
//   type: string;
//   color: string;
//   material: string;
//   width: string;
//   height: string;
//   imageUrl: string;
//   startingBid: string;
//   currentBid: string;
//   startDate: string;
//   endDate: string;
//   auctionStatus: string;
//   bidTime: ;
// }

interface ProductImageProps {
  product: AuctionProduct;
}

const ProductImage = ({ product }: ProductImageProps) => {
  const [disable, setDisable] = useState(false);
  const [bidAmount, setBidAmount] = useState<number>(0);
  const [currentBid, setCurrentBid] = useState<number>(
    Number(product.currentBid)
  );
  const [bidTime, setBidTime] = useState<Date | null>(product.BidTime);

  const handleBidChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBidAmount(Number(e.target.value));
  };

  const addToCart = async () => {
    // Ensure product.currentBid is used if currentBid is not initialized
    const currentBidValue = currentBid || Number(product.currentBid);

    if (
      bidAmount <= currentBidValue ||
      bidAmount <= Number(product.startingBid)
    ) {
      toast.error(
        "Your bid must be higher than both the current bid and starting bid."
      );
      return;
    }

    setDisable(true);

    try {
      const response = await placeBid(
        "cm0jp9qz000002or3ysse664e", // Replace with actual user ID or context
        product.id,
        bidAmount
      );
      if (response.success) {
        setCurrentBid(bidAmount); // Update the current bid dynamically
        setBidTime(new Date()); // Convert to Date object
        toast.success("Bid placed successfully");
      } else {
        toast.error("Error placing bid. Please try again.");
      }
    } catch (error) {
      toast.error("Error placing bid");
    } finally {
      setDisable(false);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-x-5 md:gap-x-10 lg:gap-x-20 gap-y-10 px-5 md:px-10 py-10 lg:max-h-[100svh]">
      <Image
        src={product.imageUrl}
        alt=""
        width={1000}
        height={1000}
        className="sm:max-w-[50%] max-h-[60svh] sm:max-h-[100svh]"
      />
      <div className="flex flex-col gap-y-7 sm:w-[50%] ">
        <span className="text-3xl font-bold">{product.name}</span>
        <div className="flex flex-col gap-y-4 lg:gap-y-7 w-[60%] lg:w-[50%] xl:w-[40%]">
          <div className="flex justify-between">
            <span className="font-semibold">Price</span>
            <span>{product.price}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Vendor</span>
            <span>{product.vendor}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Type</span>
            <span>{product.type}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Color</span>
            <span>{product.color}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Material</span>
            <span>{product.material}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Starting Bid</span>
            <span>{product.startingBid}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Current Bid</span>
            <span>{currentBid}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Bid Time</span>
            <AuctionTimer firstBidTime={bidTime} />
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Dimension</span>
            <span>
              {product.height} x {product.width}
            </span>
          </div>
          <div className="flex flex-col gap-y-3">
            <Label htmlFor="bidAmount" className="text-base font-semibold">
              Enter Bid
            </Label>
            <Input type="number" id="bidAmount" onChange={handleBidChange} />
          </div>
        </div>

        <div className="flex flex-col gap-y-4 lg:gap-y-7 md:max-w-[80%] xl:max-w-[50%] pt-10">
          <div className="flex justify-between">
            <Button
              className="border-[1px] border-[#58C5C7] rounded-3xl hover:text-white hover:scale-95 hover:bg-[#58C5C7] transition-all ease-in-out duration-200"
              onClick={addToCart}
              disabled={disable}
            >
              {disable ? "Placing Bid..." : "Place Bid"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductImage;
