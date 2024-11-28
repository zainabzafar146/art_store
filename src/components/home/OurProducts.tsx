import Link from "next/link";
import React from "react";

const OurProducts = () => {
  return (
    <section className="flex flex-col gap-y-14 w-full py-20 md:max-h-[60svh]">
      <h1 className="text-3xl font-semibold text-center">Our Products</h1>
      <div className="grid grid-col-1 md:grid-cols-3 w-full gap-y-10 lg:px-20">
        <div className="flex flex-col justify-between items-center gap-y-5 pb-5 px-5 xl:px-20 text-center max-md:border-b-[1px] md:border-r-[1px]">
          <h2>AUCTIONS</h2>
          <span>Browse our auctions in our color-illustrated archive</span>
          <Link href={""} className="font-medium">
            LEARN MORE
          </Link>
        </div>
        <div className="flex flex-col justify-between items-center gap-y-5 pb-5 px-5 xl:px-20 text-center max-md:border-b-[1px] md:border-r-[1px]">
          <h2>ARTISTS</h2>
          <span>
            Gain insight into the art market with custom reports that track the
            performance of artists, artworks, and categories.
          </span>
          <Link href={""} className="font-medium">
            LEARN MORE
          </Link>
        </div>
        <div className="flex flex-col justify-between items-center gap-y-5  pb-5 px-5 xl:px-20 text-center">
          <h2 className="text-">VARIETY OF PRODUCTS</h2>
          <span>
            Explore different categories anf variety of quality products
          </span>
          <Link href={""} className="font-medium">
            LEARN MORE
          </Link>
        </div>
      </div>
    </section>
  );
};

export default OurProducts;
