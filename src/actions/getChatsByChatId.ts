"use server";

import { prisma } from "@/lib/db";

export async function getChatsByChatId(customerId: string, chatId: string) {
  try {
    const chats = await prisma.chat.findMany({
      where: {
        id: chatId,
        customerId,
      },
      include: {
        customer: {
          include: {
            user: true,
          },
        },
        artist: {
          include: {
            user: true,
          },
        },
        messages: {
          include: {
            sender: true,
            receiver: true,
          },
        },
      },
    });

    return chats;
  } catch (error) {
    console.error("Error fetching customer chats: ", error);
    throw new Error("Failed to fetch customer chats");
  }
}
