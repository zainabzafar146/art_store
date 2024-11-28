"use server";
import { prisma } from "@/lib/db";

export async function fetchAllAuctionProducts() {
  try {
    const auctionProducts = await prisma.auctionProduct.findMany({
      select: {
        id: true,
        name: true,
        price: true,
        vendor: true,
        type: true,
        color: true,
        material: true,
        width: true,
        height: true,
        description: true,
        feature: true,
        style: true,
        imageUrl: true,
        startingBid: true,
        currentBid: true,
        soldOutBid: true,
        auctionStatus: true,
        startDate: true,
        endDate: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!auctionProducts.length) {
      return { message: "No auction products found.", auctionProducts: [] };
    }

    return { message: "Auction products retrieved successfully.", auctionProducts };
  } catch (error) {
    console.error("Failed to retrieve auction products:", error);
    throw new Error("Failed to retrieve auction products.");
  }
}
