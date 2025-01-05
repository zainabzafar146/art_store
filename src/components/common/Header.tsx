import React from "react";

import Link from "next/link";
import Image from "next/image";
import { MdAccountBox } from "react-icons/md";
import { LuMessagesSquare } from "react-icons/lu";
import { auth } from "@/auth";
import Serach from "./Serach";

const Header = async () => {
  const session = await auth();

  return (
    <section className="flex justify-center bg-slate-50 ">
      <div className="hidden lg:grid grid-cols-3 items-center py-5 gap-5 lg:px-10 max-w-screen-2xl w-full">
        <div className="">
          <Image
            src={"/logo.png"}
            alt="logo"
            height={1000}
            width={1000}
            className="w-18 md:w-24"
          />
        </div>
        <Serach />
        {session?.user.role === "ARTIST" ? (
          <Link
            href={"/artist"}
            className="flex justify-end items-center hover:text-[#58C5C7]"
          >
            Dashboard
          </Link>
        ) : (
          <div className="flex flex-row justify-center items-center gap-x-3">
            {session ? null : <Link href={"/sign-in"}>Sign In</Link>}

            <Link href={"/cart"} className="text-sm hover:text-[#58C5C7]">
              Your Cart
            </Link>
            <Link
              href={"/resigter-as-artist"}
              className="text-sm hover:text-[#58C5C7]"
            >
              Register as Artist
            </Link>
            <Link href={"/notifications"}>
              <LuMessagesSquare size={30} />
            </Link>
            <Link href={"/profile"}>
              <MdAccountBox size={30} />
            </Link>
          </div>
        )}
        {/* <div className="flex flex-row justify-center items-center gap-x-3">
          {session ? null : <Link href={"/sign-in"}>Sign In</Link>}

          <Link href={"/cart"} className="text-sm hover:text-[#58C5C7]">
            Your Cart
          </Link>
          <Link
            href={"/resigter-as-artist"}
            className="text-sm hover:text-[#58C5C7]"
          >
            Register as Artist
          </Link>
          <Link href={"/notifications"}>
            <LuMessagesSquare size={30} />
          </Link>
          <Link href={"/profile"}>
            <MdAccountBox size={30} />
          </Link>
        </div> */}
      </div>
    </section>
  );
};

export default Header;
