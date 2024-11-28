import React from "react";

const NewCollections = () => {
  return (
    <div className="flex flex-col min-h-[75svh] justify-between items-center w-full py-10 bg-[url('/home123.jpg')] bg-cover bg-center bg-no-repeat">
      <div className="flex flex-col gap-y-5 items-center">
        <span className="text-xl md:text-2xl font-bold">NEW COLLECTIONS</span>
        <span className="text-xl md:text-2xl font-bold">
          CRAFTS WORK BY ARTIST<span className="text-[#58C5C7]">REE</span>
        </span>
      </div>
      <div className="flex items-center justify-between w-full">
        <div className="flex flex-col items-center gap-y-5 border-r-[1px] border-r-slate-300 flex-1">
          <span className="text-lg md:text-2xl font-semibold text-[#58C5C7]">
            499
          </span>
          <span className="text-base md:text-xl font-semibold">
            Already Sold
          </span>
        </div>
        <div className="flex flex-col items-center gap-y-5 border-r-[1px] border-r-slate-300 flex-1">
          <span className="text-lg md:text-2xl font-semibold text-[#58C5C7]">
            125
          </span>
          <span className="text-base md:text-xl font-semibold">Pre Orders</span>
        </div>
        <div className="flex flex-col items-center gap-y-5 flex-1">
          <span className="text-lg md:text-2xl font-semibold text-[#58C5C7]">
            340
          </span>
          <span className="text-base md:text-xl font-semibold">Artists</span>
        </div>
      </div>
    </div>
  );
};

export default NewCollections;
