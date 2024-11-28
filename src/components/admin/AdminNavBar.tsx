import Image from "next/image";
import Link from "next/link";
import React from "react";
import { LuMessagesSquare } from "react-icons/lu";
import { MdAccountBox } from "react-icons/md";
const AdminNavBar = () => {
  return (
    <div className="flex justify-between items-center py-5 px-10 border-b-[1px] shadow-md">
      <Link href={"/"}>
      <Image src={'/updated-logo-removebg.png'} alt="logo" height={1000} width={1000} className="w-18 md:w-24"/>
      </Link>
      <div className="flex gap-x-5">
        <Link href={"/admin/products"} className="hover: cursor-pointer hover:text-[#58C5C7]">
         Add to Auction
        </Link>
        <Link href={"/admin/auction-products"} className="hover: cursor-pointer hover:text-[#58C5C7]">
          Delete Auction
        </Link>
      </div>
    </div>
  );
};

export default AdminNavBar;
