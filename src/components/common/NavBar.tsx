"use client";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CiMenuBurger } from "react-icons/ci";
import Image from "next/image";

const NavBar = () => {
  const path = usePathname();
  return (
    <section>
      {/* desktop nav  */}

      <div className="md:flex max-md:hidden justify-center items-center gap-x-16 text-lg shadow-md py-7">
        <Link
          href="/"
          className={`${
            path === "/" ? "text-[#58C5C7] border-b-2 border-[#58C5C7]" : ""
          }`}
        >
          Home
        </Link>
        <Link
          href="/shop"
          className={`${
            path === "/shop" ? "text-[#58C5C7] border-b-2 border-[#58C5C7]" : ""
          }`}
        >
          Shop
        </Link>
        <Link
          href="/artists"
          className={`${
            path === "/artists"
              ? "text-[#58C5C7] border-b-2 border-[#58C5C7]"
              : ""
          }`}
        >
          Artists
        </Link>
        <Link
          href="/auctions"
          className={`${
            path === "/auctions"
              ? "text-[#58C5C7] border-b-2 border-[#58C5C7]"
              : ""
          }`}
        >
          Auctions
        </Link>
        <Link
          href="/about-us"
          className={`${
            path === "/about-us"
              ? "text-[#58C5C7] border-b-2 border-[#58C5C7]"
              : ""
          }`}
        >
          About Us
        </Link>
      </div>

      {/* mobile nav  */}

      <div className="flex justify-between p-5 md:hidden">
        <Image
          src={"/logo.png"}
          alt="logo"
          height={1000}
          width={1000}
          className="w-20"
        />
        <Sheet>
          <SheetTrigger>
            <CiMenuBurger size={28} />
          </SheetTrigger>
          <SheetContent className="bg-slate-100">
            <SheetHeader>
              <SheetDescription>
                <div className="flex flex-col items-start gap-y-5">
                  <Link href={"/"}>Home</Link>
                  <Link href={"/shop"}>Shop</Link>
                  <Link href={"/artists"}>Artists</Link>
                  <Link href={"/auctions"}>Auctions</Link>
                  <Link href={"/about-us"}>About Us</Link>
                  <Link href={"sign-in"}>Sign In</Link>
                  <Link href={"register-as-artist"}>Register as Artist</Link>
                  <Link href={"/notifications"}>Messages</Link>
                  <Link href={"/profile"}>Profile</Link>
                </div>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    </section>
  );
};

export default NavBar;
