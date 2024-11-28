import { auth } from "@/auth";
import ArtistChats from "@/components/artist/ArtistChats";
import React from "react";

const page = async () => {
  const session = await auth();

  return (
    <main className="flex flex-col justify-center items-center">
      <ArtistChats session={session ?? null} />
    </main>
  );
};

export default page;
