"use server";

import { prisma } from "@/lib/db";

export async function createCartAndAddCartItem(
  userId: string,
  productId: number,
  quantity: number,
  price: number
) {
  console.log("this is data", userId, productId, quantity, price);
  try {
    let cart = await prisma.cart.findUnique({
      where: { userId },
      include: { items: true },
    });

    console.log("this clg is after checking if cart exist");

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

    console.log("this clg is after checking if prodcut exist in cart");

    const totalPrice = quantity * price;

    if (existingCartItem) {
      console.log("this clg is if product already exists in cart");
      return {
        success: false,
        message: "Product already exists in the cart",
      };
    } else {
      console.log("this clg is from where cart item created.", cart.id);
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
    console.error("Error creating cart or adding cart item:", error);
    throw new Error("Could not create cart or add cart item.");
  }
}
