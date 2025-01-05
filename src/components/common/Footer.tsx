import Link from "next/link";
import React from "react";
import { FaFacebookF } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";
import { FaPinterestP } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import Image from "next/image";

function Footer() {
  return (
    <section className="flex justify-center items-center bg-[#58C5C7] ">
      <div className="flex max-w-screen-2xl lg:items-center w-full">
        <div className="flex-[0.2] px-2 lg:px-10">
          <Image
            src={"/logo.png"}
            alt="logo"
            height={1000}
            width={1000}
            className="w-36"
          />
        </div>
        <div className="flex-[0.8] flex flex-col gap-y-14 py-14 px-5 items-center max-w-[800px]">
          <div className="flex gap-y-5 gap-x-20  text-white">
            <Link href="/about-us" className="hover:text-black md:text-lg">
              About us
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-5 gap-x-20 sm:gap-x-4">
            <Link
              href="https://www.facebook.com/share/JyphKPEyJ4b1jr8X/"
              target="_blank"
              className="p-3 border-2 rounded-full hover:scale-90 transition-all ease-in-out duration-200"
            >
              <FaFacebookF color="white" size={30} />
            </Link>
            <Link
              href="https://x.com/_ARTISTREE_?t=MkrbPTSj-opjLaZb0mPAdg&s=08"
              target="_blank"
              className="p-3 border-2 rounded-full hover:scale-90 transition-all ease-in-out duration-200"
            >
              <FaTwitter color="white" size={30} />
            </Link>
            <Link
              href=""
              target="_blank"
              className="p-3 border-2 rounded-full hover:scale-90 transition-all ease-in-out duration-200"
            >
              <FaPinterestP color="white" size={30} />
            </Link>
            <Link
              href="https://www.instagram.com/__artistree__3?igsh=MWllaGdiczdtMDd0NQ=="
              target="_blank"
              className="p-3 border-2 rounded-full hover:scale-90 transition-all ease-in-out duration-200"
            >
              <FaInstagram color="white" size={30} />
            </Link>
          </div>
          <div>
            <span className="sm:text-base lg:text-lg text-center">
              ©2024 Artistree Worldwide Corporation. All rights reserved.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Footer;
