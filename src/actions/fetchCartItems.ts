"use server";

import { prisma } from "@/lib/db";

export async function fetchCartItems(userId: string) {
  try {
    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: { product: true },
        },
      },
    });

    return {
      success: true,
      cart: cart,
    };
  } catch (error) {
    throw new Error("Can not find cart add any item to cart first.");
  }
}
