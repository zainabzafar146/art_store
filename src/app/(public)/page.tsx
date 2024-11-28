import DiscountOver from "@/components/home/DiscountOver";
import HomeAtrists from "@/components/home/HomeAtrists";
import HomeHero from "@/components/home/HomeHero";
import NewCollections from "@/components/home/NewCollections";
import OurProducts from "@/components/home/OurProducts";
import ProductTabs from "@/components/home/ProductTabs";
import SwiperSection from "@/components/home/SwiperSection";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex justify-center">
      <div className="flex flex-col justify-center items-center max-w-screen-2xl w-full gap-y-10">
        <HomeHero />
        <SwiperSection />
        <ProductTabs />
        <DiscountOver />
        <NewCollections />
        <HomeAtrists />
        <OurProducts />
      </div>
    </main>
  );
}
