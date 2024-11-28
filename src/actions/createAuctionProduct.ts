"use server"

import { prisma } from "@/lib/db"; // Adjust path based on your project structure
import { z } from "zod";

// Define a Zod schema for input validation
const auctionProductSchema = z.object({
  productId: z.number().int().positive(),
  startingBid: z.number().positive(),
  startDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid start date",
  }),
  endDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid end date",
  }),
});

export async function createAuctionProduct(
  productId: number,
  startingBid: number,
  startDate: string,
  endDate: string
) {
  try {
    // Validate input using Zod schema
    const input = auctionProductSchema.parse({
      productId,
      startingBid,
      startDate,
      endDate,
    });

    // Fetch product details
    const product = await prisma.product.findUnique({
      where: { id: input.productId },
    });

    if (!product) {
      throw new Error("Product not found.");
    }

    // Check if the product is already in auction
    const existingAuction = await prisma.auctionProduct.findFirst({
      where: { productId: input.productId, auctionStatus: "ACTIVE" },
    });

    if (existingAuction) {
      throw new Error("Product is already in an active auction.");
    }

    // Create a new auction product entry
    const auctionProduct = await prisma.auctionProduct.create({
      data: {
        productId: input.productId,
        name: product.name,
        price: product.price,
        vendor: product.vendor,
        type: product.type,
        color: product.color,
        material: product.material,
        width: product.width,
        height: product.height,
        description: product.description,
        feature: product.feature,
        style: product.style,
        imageUrl: product.imageUrl,
        startingBid: input.startingBid,
        currentBid: 0,
        auctionStatus: "ACTIVE",
        startDate: new Date(input.startDate),
        endDate: new Date(input.endDate),
      },
    });

    return { success: true, data: auctionProduct };
  } catch (error: any) {
    console.error("Error adding product to auction:", error.message);
    return { success: false, error: error.message };
  }
}
