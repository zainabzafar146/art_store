import React from "react";
interface PorpData {
  text: string;
}

const PageHeading = ({ text }: PorpData) => {
  return (
    <div className="flex justify-center bg-[#E5E5E5] w-full">
      <div className="py-10 sm:py-12 md:py-20 w-full text-center max-w-screen-2xl">
        <span className="text-xl md:text-2xl lg:text-3xl font-bold">
          {text}
        </span>
      </div>
    </div>
  );
};

export default PageHeading;
