import React from "react";
import { LuTruck } from "react-icons/lu";
import { IoSearchOutline } from "react-icons/io5";

const ProductStats = () => {
  return (
    <div className="flex flex-col gap-y-5 md:gap-y-7 py-5 ml-5 px-5 md:px-10">
      <div className="flex items-center gap-x-4">
        <LuTruck size={25} />
        <span>Estimated deliver 5-7 days</span>
      </div>
      <div className="flex items-center gap-x-4">
        <IoSearchOutline size={25} />
        <span>54 People are viewing this right now</span>
      </div>
      <span className="text-lg font-bold underline">
        Let us know abour your query!
      </span>
    </div>
  );
};

export default ProductStats;
