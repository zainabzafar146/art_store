"use server";
import { prisma } from "@/lib/db";

export async function fetchUser(email: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phoneNo: true,
        role: true,
        customer: true,
        artist: true,
      },
    });

    if (!user) {
      throw new Error("User not found.");
    }

    return (user);
  } catch (error) {
    console.error("Failed to retrieve user:", error);
    throw new Error("Failed to retrieve user data.");
  }
}
