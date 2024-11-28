import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

interface Artist {
  id: string;
  imageUrl: string;
}

interface ArtistUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNo: string | null;
  role: "ARTIST";
  artist: Artist;
}

interface ArtistCardProps {
  artistUser: ArtistUser;
}

const ArtistCard = ({ artistUser }: ArtistCardProps) => {
  return (
    <div className="flex flex-col justify-center items-center gap-y-5">
      <Image
        src={artistUser.artist.imageUrl}
        alt=""
        width={1000}
        height={1000}
        className="w-80 sm:w-96 md:w-80"
      />
      <span className="text-lg font-bold">{artistUser.firstName}</span>
      <Link href={`artists/artist-profile/${artistUser.id}`}>
        <Button className="border-[1px] border-[#58C5C7] rounded-3xl hover:text-white hover:scale-95 hover:bg-[#58C5C7] transition-all ease-in-out duration-200">
          See Portfolio
        </Button>
      </Link>
    </div>
  );
};

export default ArtistCard;
