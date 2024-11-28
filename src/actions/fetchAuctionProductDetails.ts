"use server";
import { prisma } from "@/lib/db";

export async function fetchAuctionProductDetails(productId: number) {
  try {
    const product = await prisma.auctionProduct.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new Error("Auction product not found.");
    }

    return product;
  } catch (error) {
    console.error("Failed to retrieve auction product:", error);
    throw new Error("Failed to retrieve auction product.");
  }
}
