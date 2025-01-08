"use server";

import { prisma } from "@/lib/db";

export async function fetchArtistProducts(userId: string) {
  try {
    const products = await prisma.product.findMany({
      where: {
        artistUserId: userId,
      },
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
      orderBy: {
        createdAt: "desc",
      },
    });

    return { success: true, data: products };
  } catch (error) {
    console.error("Error fetching artist products:", error);
    return { success: false, error: "Failed to fetch products" };
  }
}
