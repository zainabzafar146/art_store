"use server";

import { prisma } from "@/lib/db";

export async function deleteCartItem(userId: string, productId: number) {
  try {
    // Find the cart associated with the user
    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: { items: true },
    });

    if (!cart) {
      return {
        success: false,
        message: "Cart not found for the user.",
      };
    }

    // Find the cart item to delete
    const cartItem = await prisma.cartItem.findFirst({
      where: { cartId: cart.id, productId },
    });

    if (!cartItem) {
      return {
        success: false,
        message: "Cart item not found.",
      };
    }

    // Delete the cart item
    await prisma.cartItem.delete({
      where: { id: cartItem.id },
    });

    return {
      success: true,
      message: "Cart item deleted successfully.",
    };
  } catch (error) {
    console.error("Error deleting cart item:", error);
    throw new Error("Could not delete cart item.");
  }
}
