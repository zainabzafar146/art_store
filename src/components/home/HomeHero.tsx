import React from "react";
import CommonButton from "../common/CommonButton";
import Link from "next/link";
import Image from "next/image";

const HomeHero = () => {
  const imageUrl = "/heroBg.png";

  return (
    <div className="flex justify-between items-center w-full pl-10 md:pl-32 py-36">
      <div className="flex-[0.5] flex flex-col gap-y-7 max-w-96" >
        <span className="text-4xl font-extrabold">HAND CRAFTS</span>
        <span className="text-3xl">
          FLAT <span className="text-[#58C5C7]">30%</span> OFF
        </span>
        <Link href="/shop">
          <CommonButton btnText="Shop Now" width="w-28" />
        </Link>
      </div>
      <div className="flex-[0.5] hidden md:flex ">
        <Image
          src={imageUrl}
          alt=""
          height={1000}
          width={1000}
          className=""
        />
      </div>
    </div>
  );
};

export default HomeHero;
