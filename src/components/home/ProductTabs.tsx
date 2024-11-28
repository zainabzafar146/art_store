"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import ProductTabCard from "./ProductTabCard";
import { fetchAllProducts } from "@/actions/fetchAllProducts";
import { toast } from "sonner";

const ProductTabs = () => {
  const [selected, setSelected] = useState("Featured");
  const [width, setWidth] = useState<number>(0);
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState({
    Featured: [] as any[],
    Latest: [] as any[],
    BestSeller: [] as any[],
  });
  const [isLoading, setIsLoading] = useState(true);

  const handleClick = (button: string) => {
    setSelected(button);
  };

  // Shuffle products randomly
  const shuffleArray = (array: any[]) => {
    return array
      .map((item) => ({ ...item, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ sort, ...item }) => item);
  };

  // Divide products into categories
  const divideProductsIntoCategories = (products: any[]) => {
    const shuffledProducts = shuffleArray(products);
    const chunkSize = Math.ceil(shuffledProducts.length / 3);

    setCategories({
      Featured: shuffledProducts.slice(0, chunkSize),
      Latest: shuffledProducts.slice(chunkSize, 2 * chunkSize),
      BestSeller: shuffledProducts.slice(2 * chunkSize),
    });
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetchAllProducts();
        if (response) {
          setProducts(response);
          divideProductsIntoCategories(response);
        }
      } catch (error) {
        toast.error("Failed to fetch products");
      } finally {
        setIsLoading(false); // Add this line
      }
    };

    fetchProducts();
  }, []);

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

  const renderSwiper = (productList: any[]) => (
    <Swiper
      spaceBetween={width > 1180 ? 20 : 10}
      slidesPerView={width > 1280 ? 4 : width > 1024 ? 3 : width > 768 ? 2 : 1}
      className="flex justify-center items-center overflow-x-hidden !w-[350px] sm:!w-[600px] md:!w-[720px] lg:!w-[800px] xl:!w-[1000px] 2xl:!w-[1200px]"
    >
      {productList.map((product) => (
        <SwiperSlide
          key={product.id}
          className="flex justify-center items-center"
        >
          <ProductTabCard product={product} />
        </SwiperSlide>
      ))}
    </Swiper>
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[40svh]">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#58C5C7]" />
      </div>
    );
  }

  return (
    <section className="flex flex-col items-center gap-y-10">
      <div className="flex gap-x-2">
        <span
          onClick={() => handleClick("Featured")}
          className={`border-[2px] px-5 py-3 cursor-pointer ${
            selected === "Featured"
              ? "bg-[#339999] text-white"
              : "bg-transparent"
          } border-[#339999]`}
        >
          Featured
        </span>
        <span
          onClick={() => handleClick("Latest")}
          className={`border-[2px] px-5 py-3 cursor-pointer ${
            selected === "Latest" ? "bg-[#339999] text-white" : "bg-transparent"
          } border-[#339999]`}
        >
          Latest
        </span>
        <span
          onClick={() => handleClick("Best Seller")}
          className={`border-[2px] px-5 py-3 cursor-pointer ${
            selected === "Best Seller"
              ? "bg-[#339999] text-white"
              : "bg-transparent"
          } border-[#339999]`}
        >
          Best Seller
        </span>
      </div>
      {products.length > 0 && (
        <>
          {selected === "Featured" && renderSwiper(categories.Featured)}
          {selected === "Latest" && renderSwiper(categories.Latest)}
          {selected === "Best Seller" && renderSwiper(categories.BestSeller)}
        </>
      )}
    </section>
  );
};

export default ProductTabs;
