import Image from "next/image";
import React from "react";

const AboutAtristee = () => {
  return (
    <div className="flex w-full px-5 lg:px-10">
      <div className="flex flex-col gap-y-14 w-full lg:w-[60%] pr-5">
        <div className="flex flex-col gap-y-3">
          <h1 className="text-2xl font-bold">About Atristee</h1>
          <h3 className="text-xl font-semibold">Our Mission</h3>
          <span>
            At Artistree, our mission is to bridge the gap between art
            enthusiasts and local artists by providing a platform that
            celebrates creativity and supports the artistic community. We
            believe in the power of art to inspire, connect, and transform
            lives. Our goal is to create a vibrant online space where artists
            can showcase their work, and buyers can discover and purchase
            unique, handcrafted art pieces.
          </span>
        </div>

        <div className="flex gap-x-5 lg:gap-x-10">
          <Image
            src={"/about-us/about-artistee-icon.png"}
            alt=""
            height={1000}
            width={1000}
            className="w-20 h-12 lg:w-36 lg:h-20"
          />
          <div className="flex flex-col">
            <h2 className="text-xl font-bold">Commitment To Quality</h2>
            <span>
              Our commitment to quality ensures that every piece you find here
              is crafted with the utmost care, skill, and creativity. We believe
              that art is not just about aesthetics but also about the passion
              and dedication that goes into creating each masterpiece.
            </span>
          </div>
        </div>
        <div className="flex gap-x-5 lg:gap-x-10">
          <Image
            src={"/about-us/about-artistee-icon.png"}
            alt=""
            height={1000}
            width={1000}
            className="w-20 h-12 lg:w-36 lg:h-20"
          />
          <div className="flex flex-col">
            <h2 className="text-xl font-bold">Uniqueness</h2>
            <span>
              Each artwork on Artistree is a unique creation, meticulously
              handcrafted by talented local artists. Our artists pour their
              heart and soul into their work, ensuring that every piece is a
              true reflection of their artistic vision and craftsmanship.
            </span>
          </div>
        </div>
      </div>
      <div className="hidden lg:flex w-[40%] h-[600px]">
        <Image
          src={"/about-01.jpg.png"}
          alt=""
          width={1000}
          height={1000}
        />
      </div>
    </div>
  );
};

export default AboutAtristee;
