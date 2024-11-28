"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import SwiperCard from "./SwiperCard";
import { fetchAllProducts } from "@/actions/fetchAllProducts";
import { toast } from "sonner";

const SwiperSection = () => {
  const [width, setWidth] = useState<number>(0);
  const [products, setProducts] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWidth(window.innerWidth);
      const handleResize = () => {
        setWidth(window.innerWidth);
      };
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);
  return (
    <section className="">
      <Swiper
        spaceBetween={width > 1180 ? 20 : 10}
        slidesPerView={
          width > 1280 ? 5 : width > 1024 ? 3 : width > 768 ? 2 : 1
        }
        className="flex flex-col justify-center items-center overflow-x-hidden !w-[350px] sm:!w-[600px] md:!w-[720px] lg:!w-[800px] xl:!w-[1000px] 2xl:!w-[1500px]"
      >
        <SwiperSlide className="flex  justify-center items-center shadow-lg">
          <SwiperCard
            imgUrl={"/swiper/ART PRODUCTS 1.png"}
            name={"ART PRODUCTS"}
            color="black"
            txtColor="white"
          />
        </SwiperSlide>
        <SwiperSlide className="flex  justify-center items-center shadow-lg">
          <SwiperCard
            imgUrl={"/swiper/image 10-1.png"}
            name={"HOME DECOR"}
            color="whte"
            txtColor="black"
          />
        </SwiperSlide>
        <SwiperSlide className="flex  justify-center items-center shadow-lg">
          <SwiperCard
            imgUrl={"/swiper/CRAFTS 1.png"}
            name={"CRAFTS"}
            color="black"
            txtColor="white"
          />
        </SwiperSlide>
        <SwiperSlide className="flex  justify-center items-center shadow-lg">
          <SwiperCard
            imgUrl={"/swiper/handy3 1.png"}
            name={"PAINTINGS"}
            color="white"
            txtColor="black"
          />
        </SwiperSlide>
        <SwiperSlide className="flex  justify-center items-center shadow-lg">
          <SwiperCard
            imgUrl={"/swiper/sculpture 1.png"}
            name={"SCULPTURE"}
            color="black"
            txtColor="white"
          />
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default SwiperSection;
