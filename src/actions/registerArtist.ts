"use server";
import { prisma } from "@/lib/db";
import bcrypt from "bcrypt";
import * as z from "zod";
import { toast } from "sonner"; // Assuming you are using Sonner for notifications

const RegisterArtistSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters." }),
  secondName: z
    .string()
    .min(2, { message: "Second name must be at least 2 characters." }),
  email: z.string().min(1, "Email is required").email("Invalid email"),
  phoneNo: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." }),
  imageUrl: z.string().optional(),
});

export async function registerArtist(
  data: z.infer<typeof RegisterArtistSchema>
) {
  try {
    const userExist = await prisma.user.findFirst({
      where: {
        OR: [{ email: data.email }, { phoneNo: data.phoneNo }],
      },
    });

    if (userExist) {
      throw new Error("Email or Phone number already in use.");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const newArtist = await prisma.user.create({
      data: {
        firstName: data.firstName,
        lastName: data.secondName,
        email: data.email,
        phoneNo: data.phoneNo,
        password: hashedPassword,
        role: "ARTIST",
        artist: {
          create: {
            imageUrl: data.imageUrl || '',
          },
        },
      },
      include: {
        artist: true,
      },
    });
    return newArtist;
  } catch (error) {
    console.error("Registration error:", error);
    
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    
    throw new Error("Registration failed. Please try again.");
  }
}
