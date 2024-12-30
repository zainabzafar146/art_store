"use server";

import { prisma } from "@/lib/db";

export async function createCartAndAddCartItem(
  userId: string,
  productId: number,
  quantity: number,
  price: number
) {
  try {
    let cart = await prisma.cart.findUnique({
      where: { userId },
      include: { items: true },
    });
    if (!cart) {
      cart = await prisma.cart.create({
        data: {
          userId,
          items: {
            create: [],
          },
        },
        include: { items: true },
      });
    }
    const existingCartItem = await prisma.cartItem.findFirst({
      where: { cartId: cart.id, productId },
    });
    const totalPrice = quantity * price;

    if (existingCartItem) {
      return {
        success: false,
        message: "Product already exists in the cart",
      };
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId,
          quantity,
          price: totalPrice,
        },
      });

      return {
        success: true,
        message: "Cart and CartItem created successfully",
      };
    }
  } catch (error) {
    throw new Error("Could not create cart or add cart item.");
  }
}
