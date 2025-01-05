"use server";

import { prisma } from "@/lib/db";

export async function searchProducts(query: string) {
  try {
    return await prisma.product.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: "insensitive" } },
          { description: { contains: query, mode: "insensitive" } },
          { type: { contains: query, mode: "insensitive" } },
          { vendor: { contains: query, mode: "insensitive" } },
        ],
      },
      take: 5, // Limit results to 5 items
      select: {
        id: true,
        name: true,
        price: true,
        imageUrl: true,
      },
    });
  } catch (error) {
    console.error("Search error:", error);
    return [];
  }
}
