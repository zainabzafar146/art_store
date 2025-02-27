"use server";

import { prisma } from "@/lib/db"; // Adjust the import according to your setup

export async function createMessagesForArtist(
  content: string,
  senderId: string,
  receiverId: string
) {
  console.log("Params:", {
    content,
    senderId,
    receiverId,
  });

  try {
    let chat = await prisma.chat.findFirst({
      where: {
        artistId: senderId,
        customerId: receiverId,
      },
    });

    if (!chat) {
      chat = await prisma.chat.create({
        data: {
          artistId: senderId,
          customerId: receiverId,
        },
      });
    }

    const message = await prisma.message.create({
      data: {
        content,
        chatId: chat.id,
        senderId,
        receiverId,
      },
    });

    return message;
  } catch (error) {
    console.error("Error creating message:", error);
    throw new Error("Could not create message.");
  }
}
