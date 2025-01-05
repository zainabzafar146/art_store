import Image from "next/image";
import Link from "next/link";
import React from "react";
import { LuMessagesSquare } from "react-icons/lu";
import { MdAccountBox } from "react-icons/md";
const ArtistNavBar = () => {
  return (
    <div className="flex justify-between items-center py-5 px-10 border-b-[1px]">
      <Link href={"/"}>
        <Image
          src={"/logo-removebg.png"}
          alt="logo"
          height={1000}
          width={1000}
          className="w-12 md:w-18"
        />
      </Link>
      <div className="flex gap-x-5">
        <Link href={"/artist/products"} className="hover:text-[#58C5C7]">
          My Products
        </Link>
        <Link href={"/artist/chats"}>
          <LuMessagesSquare size={30} />
        </Link>
        <Link href={"/artist/profile"}>
          <MdAccountBox size={30} />
        </Link>
      </div>
    </div>
  );
};

export default ArtistNavBar;
