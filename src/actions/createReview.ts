"use server";

import { prisma } from "@/lib/db"; // Adjust the import according to your setup

export async function createReview(
  userId: string,
  productId: number,
  rating: number,
  description: string
) {
  try {
    // Create the new review and connect to existing user and product
    const review = await prisma.review.create({
      data: {
        user: {
          connect: { id: userId }, // Connect existing user
        },
        product: {
          connect: { id: productId }, // Connect existing product
        },
        rating,
        description,
      },
    });

    return review; // Return the created review
  } catch (error) {
    console.error("Error creating review:", error);
    throw new Error("Could not create review.");
  }
}
