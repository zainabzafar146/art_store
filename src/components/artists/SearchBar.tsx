import React from "react";
import { Input } from "../ui/input";
import { IoSearchOutline } from "react-icons/io5";

const SearchBar = () => {
  return (
    <div className="flex justify-center border-b-[1px] border-b-[#58C5C7]">
      <div className="flex items-center justify-between py-5 w-full  px-5 md:px-10 max-w-screen-2xl">
        <span className="text-xl font-bold">ATRIST</span>
        <div className="relative">
          <Input
            type="search"
            placeholder="Search"
            className="border-none bg-[#DDDDDD] placeholder:text-white rounded-3xl px-5 w-60 sm:w-72"
          />
          <div className="absolute bg-black rounded-full p-1 right-1 top-1">
            <IoSearchOutline color="white" size={25} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
