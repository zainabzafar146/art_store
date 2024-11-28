import { auth } from "@/auth";
import ArtistProfileMain from "@/components/artist-profile/ArtistProfileMain";
import React from "react";

const page = async () => {
  const session = await auth();

  return (
    <main className="flex flex-col justify-center items-center">
      <ArtistProfileMain session={session ?? null} />
    </main>
  );
};

export default page;
