"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import CommonButton from "../common/CommonButton";
import HomeAtristsCard from "./HomeAtristsCard";

import { toast } from "sonner";
import { fetchAllArtists } from "@/actions/fetchAllArtists";

const HomeAtrists = () => {
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
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[40svh]">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#58C5C7]" />
      </div>
    );
  }
  return (
    <section className="flex flex-col gap-y-10 items-center w-full px-5 lg:px-10">
      <span className="text-xl lg:text-3xl text-[#58C5C7]">Artist</span>
      <span className="text-center">
        From the Old Masters to emerging contemporary artists, explore over 340
        artists by their medium, time period, and movement.
      </span>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {artistData &&
          artistData
            .slice(0, 3)
            .map((data: any, index: number) => (
              <HomeAtristsCard key={index} artistUser={data} />
            ))}
      </div>
      <Link href={"/artists"}>
        <CommonButton btnText="FIND ARTIST" width="32" />
      </Link>
    </section>
  );
};

export default HomeAtrists;
