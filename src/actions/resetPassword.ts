"use server"

import { prisma } from "@/lib/db";
import bcrypt from "bcrypt";

export async function resetPassword(action: "verify" | "reset", data: any) {
  console.log(data);
  try {
    if (action === "verify") {
      const user = await prisma.user.findFirst({
        where: {
          email: data.email,
          phoneNo: data.phoneNumber,
        },
      });

      if (user) {
        return { success: true, userName: user.firstName };
      } else {
        return { success: false, message: "No matching user found." };
      }
    }

    const hashedPassword = await bcrypt.hash(data.newPassword, 10);

    if (action === "reset") {
      await prisma.user.update({
        where: {
          email: data.email,
        },
        data: {
          password: hashedPassword, // Ideally hash this password using bcrypt before saving
        },
      });

      return { success: true };
    }
  } catch (error) {
    return { success: false, message: "An unexpected error occurred." };
  }
}
