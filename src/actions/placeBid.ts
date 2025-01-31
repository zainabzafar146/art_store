"use server";
import { prisma } from "@/lib/db";
import { createCartAndAddCartItem } from "./createCartAndAddCartItem";

// ... existing code ...

export async function placeBid(
  userId: string,
  auctionProductId: number,
  bidAmount: number
) {
  const product = await prisma.auctionProduct.findUnique({
    where: { id: auctionProductId },
    include: { product: true }, // Include the related Product data
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
    const bidEndTime = new Date(Date.now() + 24 * 60 * 60 * 1000);
    updateData.BidTime = bidEndTime;

    // Schedule cart creation when bid ends
    setTimeout(async () => {
      try {
        const currentProduct = await prisma.auctionProduct.findUnique({
          where: { id: auctionProductId },
          include: { product: true },
        });

        if (currentProduct?.userId === userId) {
          await createCartAndAddCartItem(
            userId,
            currentProduct.productId,
            1,
            currentProduct.currentBid
          );
        }
      } catch (error) {
        console.error("Error adding item to cart after bid end:", error);
      }
    }, 24 * 60 * 60 * 1000); // 24 hours
  }

  // Update the product's current bid and bidder details
  await prisma.auctionProduct.update({
    where: { id: auctionProductId },
    data: updateData,
  });

  return { success: true, message: "Bid placed successfully." };
}

