"use server";
import { prisma } from "@/lib/db"; // Adjust the path based on your project structure
import { z } from "zod";

const deleteAuctionProductSchema = z.object({
  id: z.number().positive(),
});

export const deleteAuction = async (id: number) => {
  try {
    const { id: validatedId } = deleteAuctionProductSchema.parse({ id });

    // Check if the auction product exists
    const auctionProduct = await prisma.auctionProduct.findUnique({
      where: { id: validatedId },
    });

    if (!auctionProduct) {
      throw new Error("Auction product not found.");
    }

    // Delete the auction product
    await prisma.auctionProduct.delete({
      where: { id: validatedId },
    });

    return { success: true, message: "Auction product deleted successfully." };
  } catch (error: any) {
    console.error("Error deleting auction product:", error.message);
    return { success: false, error: error.message };
  }
};
