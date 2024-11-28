import React from "react";
import Image from "next/image";

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

const HomeAtristsCard = ({ artistUser }: ArtistCardProps) => {
  return (
    <div className="flex flex-col items-center gap-y-3">
      <span className="text-xl font-semibold">{artistUser.firstName}</span>
      <Image src={artistUser.artist.imageUrl} alt="" width={1000} height={1000} className="w-80" />
    </div>
  );
};

export default HomeAtristsCard;
