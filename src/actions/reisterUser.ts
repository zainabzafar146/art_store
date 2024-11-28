"use server";
import { prisma } from "@/lib/db";
import bcrypt from "bcrypt";
import * as z from "zod";

const FormSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

export async function registerUser(userData: z.infer<typeof FormSchema>) {
  const userExist = await prisma.user.findUnique({
    where: { email: userData.email },
  });

  if (userExist) {
    throw new Error("Email already in use.");
  }

  const hashedPassword = await bcrypt.hash(userData.password, 10);

  const newUser = await prisma.user.create({
    data: {
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      password: hashedPassword,
      role: "CUSTOMER",
      customer: {
        create: {},
      },
    },
  });

  return newUser;
}
