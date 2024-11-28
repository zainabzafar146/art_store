import Image from "next/image";
import React from "react";

const OurFeatures = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 py-10 px-5 lg:px-10">
      <div className="flex flex-row-reverse md:flex-row gap-x-5 lg:gap-x-10">
        <div className="flex flex-col md:items-end gap-y-5">
          <span className="text-xl font-bold">
            Creating Marketplace For Art
          </span>
          <span className="md:text-end">
            We provide a comprehensive marketplace where local artists can
            showcase their handcrafted artworks to a global audience. Our
            platform allows buyers to explore a diverse range of art pieces,
            from paintings and sculptures to digital art and custom commissions.
          </span>
        </div>
        <Image
          src={"/about-us/our-feature1.png"}
          alt=""
          width={1000}
          height={1000}
          className="w-20 h-12 lg:w-36 lg:h-20"
        />
      </div>
      <div className="flex gap-x-5 lg:gap-x-10">
        <Image
          src={"/about-us/our-feature2.png"}
          alt=""
          width={1000}
          height={1000}
          className="w-20 h-12 lg:w-36 lg:h-20"
        />
        <div className="flex flex-col gap-y-5">
          <span className="text-xl font-bold">Product Customization</span>
          <span>
            Artistree facilitates direct communication between buyers and
            artists for custom artwork requests. Buyers can share their ideas
            and collaborate with artists to create bespoke pieces that perfectly
            match their vision and style.
          </span>
        </div>
      </div>
      <div className="flex flex-row-reverse md:flex-row  gap-x-5 lg:gap-x-10">
        <div className="flex flex-col md:items-end gap-y-5">
          <span className="text-xl font-bold">Branded Product</span>
          <span className="md:text-end">
            To maintain the highest standards, we carefully vet all artists and
            artworks before featuring them on our platform. This ensures that
            every piece on Artistree is genuine, high-quality, and created by
            talented artists.
          </span>
        </div>
        <Image
          src={"/about-us/our-feature3.png"}
          alt=""
          width={1000}
          height={1000}
          className="w-20 h-12 lg:w-36 lg:h-20"
        />
      </div>
      <div className="flex gap-x-5 lg:gap-x-10">
        <Image
          src={"/about-us/our-feature4.png"}
          alt=""
          width={1000}
          height={1000}
          className="w-20 h-12 lg:w-36 lg:h-20"
        />
        <div className="flex flex-col gap-y-5">
          <span className="text-xl font-bold">
            Bidding And Auction Features
          </span>
          <span>
            We bring excitement to the art buying process with our bidding and
            auction features. Art enthusiasts can participate in live auctions,
            placing competitive bids to acquire their favorite pieces, or opt
            for straightforward purchases at fixed prices.
          </span>
        </div>
      </div>
    </div>
  );
};

export default OurFeatures;
