"use server";
import { prisma } from "@/lib/db";

export async function fetchProductReviews(productId: number) {
  try {
    const reviews = await prisma.review.findMany({
      where: {
        productId,
      },
      select: {
        id: true,
        rating: true,
        description: true,
        createdAt: true,
        user: {
          select: {
            id: true,
            firstName: true, 
            lastName: true,
          },
        },
      },
    });

    return reviews;
  } catch (error) {
    console.error("Error fetching product reviews:", error);
    throw new Error("Failed to fetch product reviews");
  }
}
