import Image from "next/image";
import Link from "next/link";
import React from "react";

const DiscountOver = () => {
  return (
    <section className="flex w-full bg-[#58C5C7] gap-y-10 py-16 text-white min-h-[80svh] text-center">
      <div className="flex-[0.3]">
        <Image src={"/discover-removebg-preview.png"} alt="" width={1000} height={1000} className="" />
      </div>
      <div className="flex-[0.4] flex flex-col items-center gap-y-10 ">
        <h1 className="font-semibold text-2xl md:text-3xl xl:text-5xl">
          Discount for all orders over Rs 20,000
        </h1>
        <h2 className="font-semibold text-lg md:text-2xl xl:text-3xl">
          We{"'"}re at 71% of our goal!
        </h2>
        <Link
          href={"/shop"}
          className="bg-black rounded-3xl py-3 px-4 text-sm md:text-base"
        >
          View More
        </Link>
      </div>
      <div className="flex-[0.3]">
        <Image src={"/discover1-removebg-preview1.png"} alt="" width={1000} height={1000} className="" />
      </div>
    </section>
  );
};

export default DiscountOver;
