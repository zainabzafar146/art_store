"use server";
import { prisma } from "@/lib/db";

export async function fetchProductDetails(productId: number) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new Error("Product not found.");
    }

    return product;
  } catch (error) {
    console.error("Failed to retrieve product:", error);
    throw new Error("Failed to retrieve product.");
  }
}
