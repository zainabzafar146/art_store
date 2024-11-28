import React from "react";
import { IoIosStar } from "react-icons/io";
const OurValues = () => {

  const image = "/IMG-20241123-WA0053.jpg"

  return (
    <div className="flex flex-col items-center gap-y-10 w-full py-10">
      <span className="text-2xl lg:text-3xl font-extrabold">
        Our Core Values
      </span>
      <div className="grid grid-cols-2 justify-center gap-10 py-10 gap-y-32 min-h-[50svh] w-full bg-[#58C5C7] bg-[url('/IMG-20241123-WA0053.jpg')] bg-cover bg-center bg-no-repeat">
        <div className="flex items-center gap-x-2 justify-center">
          <IoIosStar color="white" size={30} />
          <span className="font-bold text-lg md:text-2xl lg:text-3xl">
            Creativity
          </span>
        </div>
        <div className="flex items-center gap-x-2 justify-center">
          <IoIosStar color="white" size={30} />
          <span className="font-bold text-lg md:text-2xl lg:text-3xl">
            Integrity
          </span>
        </div>
        <div className="flex items-center gap-x-2 justify-center">
          <IoIosStar color="white" size={30} />
          <span className="font-bold text-lg md:text-2xl lg:text-3xl">
            Community
          </span>
        </div>
        <div className="flex items-center gap-x-2 justify-center">
          <IoIosStar color="white" size={30} />
          <span className="font-bold text-lg md:text-2xl lg:text-3xl">
            Innovation
          </span>
        </div>
      </div>
    </div>
  );
};

export default OurValues;
