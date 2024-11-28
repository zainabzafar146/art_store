"use server";
import { prisma } from "@/lib/db";

export async function fetchAllProducts() {
  try {
    const products = await prisma.product.findMany({
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
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!products) {
      throw new Error("No products found.");
    }

    return products;
  } catch (error) {
    console.error("Failed to retrieve products:", error);
    throw new Error("Failed to retrieve products.");
  }
}
