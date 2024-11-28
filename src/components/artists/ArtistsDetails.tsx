"use client";
import React, { useEffect, useState } from "react";
import ArtistCard from "@/components/artists/ArtistCard";
import { fetchAllArtists } from "@/actions/fetchAllArtists";
import { toast } from "sonner";
const ArtistsDetails = () => {
  const [artistData, setArtistData] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getArtist = async () => {
      try {
        const response = await fetchAllArtists();
        if (response) {
          console.log("this is response", response);

          setArtistData(response);
        }
      } catch (error) {
        toast.error("Failed to get arttists");
      } finally {
        setIsLoading(false); // Add this line
      }
    };
    getArtist();
    console.log("this is the filtered response", artistData);
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#58C5C7]" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 py-10 max-w-screen-2xl w-full">
      {artistData &&
        artistData.map((artist: any) => (
          <ArtistCard key={artist.id} artistUser={artist} />
        ))}
    </div>
  );
};

export default ArtistsDetails;
