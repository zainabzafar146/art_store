"use server";
import { prisma } from "@/lib/db";

export async function fetchAllArtists() {
  try {
    const artists = await prisma.user.findMany({
      where: {
        role: "ARTIST", // Filter users by role
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phoneNo: true,
        role: true,
        artist: { // Include artist details
          select: {
            id: true,
            imageUrl: true,
          },
        },
      },
    });

    if (artists.length === 0) {
      console.warn("No artists found.");
      return []; // Return an empty array if no artists are found
    }

    return artists;
  } catch (error) {
    console.error("Failed to retrieve artists:", error);
    throw new Error("Failed to retrieve artist data.");
  }
}
