"use server";
import { prisma } from "@/lib/db";

export async function placeBid(userId: string, auctionProductId: number, bidAmount: number) {
    const product = await prisma.auctionProduct.findUnique({ where: { id: auctionProductId } });
    
    if (!product || bidAmount <= product.currentBid || bidAmount < product.startingBid) {
      throw new Error("Invalid bid amount.");
    }
  
    // Update the product's current bid and bidder details
    await prisma.auctionProduct.update({
      where: { id: auctionProductId },
      data: {
        currentBid: bidAmount,
        userId: userId,
        BidTime: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
        auctionStatus: "PENDING_PAYMENT"
      },
    });
  
    return { success: true, message: "Bid placed successfully." };
  }
  
  