"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { placeBid } from "@/actions/placeBid";
import AuctionTimer from "./AuctionTimer"; // Timer Component
import { Button } from "../ui/button";
import { AuctionProduct } from "@prisma/client";
import { Session } from "next-auth";
import { fetchUser } from "@/actions/fetchUser";

interface ProductImageProps {
  product: AuctionProduct;
  session: Session | null | undefined;
}

const ProductImage = ({ product, session }: ProductImageProps) => {
  const [disable, setDisable] = useState(false);
  const [bidAmount, setBidAmount] = useState<number>(0);
  const [currentBid, setCurrentBid] = useState<number>(
    Number(product?.currentBid || 0)
  );
  const [bidTime, setBidTime] = useState<Date | null>(product?.BidTime || null);
  const [artistUserId, setArtistUserId] = useState("");
  const [remainingTime, setRemainingTime] = useState<string | null>(null);

  useEffect(() => {
    if (!product?.BidTime) return;

    const timer = setInterval(() => {
      try {
        const bidTimeMs = new Date(product.BidTime!).getTime();
        const currentTime = Date.now();
        const timePassed = currentTime - bidTimeMs;
        const timeRemaining = 24 * 60 * 60 * 1000 - timePassed;

        if (timeRemaining <= 0) {
          setRemainingTime("Auction Ended");
          clearInterval(timer);
          return;
        }

        const hours = Math.floor(timeRemaining / (60 * 60 * 1000));
        const minutes = Math.floor(
          (timeRemaining % (60 * 60 * 1000)) / (60 * 1000)
        );
        const seconds = Math.floor((timeRemaining % (60 * 1000)) / 1000);

        setRemainingTime(
          `${hours}:${minutes.toString().padStart(2, "0")}:${seconds
            .toString()
            .padStart(2, "0")}`
        );
      } catch (error) {
        console.error("Timer error:", error);
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [product?.BidTime]);

  const fetchArtistId = async () => {
    try {
      if (!session?.user?.email) return;
      const artist = await fetchUser(session.user.email);
      if (artist) {
        setArtistUserId(artist.artist?.userId ?? "");
      }
    } catch (error) {
      console.error("Failed to fetch artist", error);
    }
  };

  useEffect(() => {
    fetchArtistId();
  }, [artistUserId]);

  const getRemainingTime = (bidTime: Date | null) => {
    if (!bidTime) return null;

    const bidTimeMs = new Date(bidTime).getTime();
    const currentTime = Date.now();
    const timePassed = currentTime - bidTimeMs;
    const timeRemaining = 24 * 60 * 60 * 1000 - timePassed; // 24 hours in milliseconds

    if (timeRemaining <= 0) return "Auction Ended";

    // Convert to hours, minutes, seconds
    const hours = Math.floor(timeRemaining / (60 * 60 * 1000));
    const minutes = Math.floor(
      (timeRemaining % (60 * 60 * 1000)) / (60 * 1000)
    );
    const seconds = Math.floor((timeRemaining % (60 * 1000)) / 1000);

    return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const handleBidChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBidAmount(Number(e.target.value));
  };

  const addToCart = async () => {
    try {
      if (!artistUserId) {
        toast.error("Please login first");
        return;
      }
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

      const response = await placeBid(
        artistUserId, // Replace with actual user ID or context
        product.id,
        bidAmount
      );
      if (response.success) {
        toast.success("Bid placed successfully");
        window.location.reload(); // Refresh the page
      } else {
        toast.error("Error placing bid. Please try again.");
      }
    } catch (error) {
      console.error("Error in addToCart:", error);
      toast.error("An error occurred while placing bid");
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
            <span className="text-[#58C5C7] font-medium">
              {remainingTime ?? "00:00:00"}
            </span>
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
            <Input
              type="number"
              id="bidAmount"
              value={bidAmount || ""}
              onChange={handleBidChange}
            />
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
