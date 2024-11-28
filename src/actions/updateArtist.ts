"use server";
import { prisma } from "@/lib/db";
import { z } from "zod";
const FormSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  secondName: z.string().min(2, {
    message: "Second name must be at least 2 characters.",
  }),
  email: z.string().email({ message: "Invalid email address." }),
  phoneNo: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits." }),
});

export async function updateArtist(data: z.infer<typeof FormSchema>) {
  try {
    const updatedUser = await prisma.user.update({
      where: { email: data.email },
      data: {
        firstName: data.firstName,
        lastName: data.secondName,
        email: data.email,
        phoneNo: data.phoneNo,
      },
    });
    return updatedUser;
  } catch (error) {
    console.error("Failed to update user:", error);
    throw new Error("Failed to update user data.");
  }
}
