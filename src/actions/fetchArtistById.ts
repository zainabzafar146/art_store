"use server";
import { prisma } from "@/lib/db";

export async function fetchArtistById(id: string) {
  console.log("Fetching artist with ID:", id);

  try {
    const artist = await prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phoneNo: true,
        role: true,
        artist: {
          // Include artist details
          select: {
            id: true,
            imageUrl: true,
          },
        },
      },
    });

    if (!artist) {
      console.warn("No artist found for the given ID.");
      return null; // Return null if no artist is found
    }

    return artist;
  } catch (error) {
    console.error("Failed to retrieve artist:", error);
    throw new Error("Failed to retrieve artist data.");
  }
}
