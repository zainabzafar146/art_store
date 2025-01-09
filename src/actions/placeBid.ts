"use server";
import { prisma } from "@/lib/db";

export async function placeBid(
  userId: string,
  auctionProductId: number,
  bidAmount: number
) {
  const product = await prisma.auctionProduct.findUnique({
    where: { id: auctionProductId },
  });

  if (
    !product ||
    bidAmount <= product.currentBid ||
    bidAmount < product.startingBid
  ) {
    throw new Error("Invalid bid amount.");
  }

  // Prepare update data
  const updateData: any = {
    currentBid: bidAmount,
    userId: userId,
    auctionStatus: "PENDING_PAYMENT",
  };

  // Only set BidTime if it doesn't exist
  if (!product.BidTime) {
    updateData.BidTime = new Date(Date.now() + 24 * 60 * 60 * 1000);
  }

  // Update the product's current bid and bidder details
  await prisma.auctionProduct.update({
    where: { id: auctionProductId },
    data: updateData,
  });

  return { success: true, message: "Bid placed successfully." };
}
