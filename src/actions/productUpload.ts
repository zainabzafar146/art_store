"use server";

import { prisma } from "@/lib/db";
import * as z from "zod";

const FormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  price: z.number().positive({ message: "Price must be a positive number" }),
  vendor: z.string().min(1, { message: "Vendor is required" }),
  type: z.string().min(1, { message: "Type is required" }),
  color: z.string().min(1, { message: "Color is required" }),
  material: z.string().min(1, { message: "Material is required" }),
  width: z.number().positive({ message: "Width must be a positive number" }),
  height: z.number().positive({ message: "Height must be a positive number" }),
  description: z.string().min(1, { message: "Description is required" }),
  feature: z.string().min(1, { message: "Feature is required" }),
  style: z.string().min(1, { message: "Style is required" }),
  imageUrl: z.string().optional(),
  artistUserId: z.string(),
});

export async function uploadProduct(productData: z.infer<typeof FormSchema>) {
  try {
    console.log("this is the product data............", productData);
    const newProduct = await prisma.product.create({
      data: {
        name: productData.name,
        price: productData.price,
        vendor: productData.vendor,
        type: productData.type,
        color: productData.color,
        material: productData.material,
        width: productData.width.toString(),
        height: productData.height.toString(),
        description: productData.description,
        feature: productData.feature,
        style: productData.style,
        imageUrl: productData.imageUrl as string,
        artistUserId: productData.artistUserId,
      },
    });
    return newProduct;
  } catch (error) {
    console.error("Error creating product: ", error);
    throw new Error("Failed to upload product.");
  }
}
