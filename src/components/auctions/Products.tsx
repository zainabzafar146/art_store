"use client";
import React, { useEffect, useState } from "react";
import ProductsCard from "./ProductsCard";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { fetchAllAuctionProducts } from "@/actions/fetchAuctionProducts";
import { toast } from "sonner";
import { Slider } from "@/components/ui/slider";

const Products = () => {
  const [auctionProducts, setAuctionProducts] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sliderValue, setSliderValue] = useState(12000);
  const [categories, setCategories] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);

  const handleSliderChange = (value: any) => {
    setSliderValue(value[0]); // Assuming `value` is an array
  };

  const handleCategoryChange = (category: string) => {
    setCategories((prevCategories) =>
      prevCategories.includes(category)
        ? prevCategories.filter((cat) => cat !== category)
        : [...prevCategories, category]
    );
  };

  const getFilteredProducts = () => {
    return auctionProducts
      .filter((product: any) =>
        categories.length > 0 ? categories.includes(product.type) : true
      )
      .filter((product: any) => product.price <= sliderValue);
  };

  const getPaginatedProducts = (filteredProducts: any[]) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  };

  useEffect(() => {
    const getAuctionProducts = async () => {
      try {
        const products = await fetchAllAuctionProducts();
        setAuctionProducts(products.auctionProducts);
      } catch (error) {
        toast("Failed to fetch Auction Products");
      } finally {
        setIsLoading(false);
      }
    };
    getAuctionProducts();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#58C5C7]" />
      </div>
    );
  }

  const filteredProducts = getFilteredProducts();
  const paginatedProducts = getPaginatedProducts(filteredProducts);

  return (
    <div className="flex justify-center">
      <div className="flex justify-center max-w-screen-2xl w-full">
        <div className="hidden lg:flex flex-col gap-y-16 w-[30%] text-white py-10 px-10">
          <span className="text-center font-medium text-lg py-5 bg-[#58C5C7] rounded-3xl">
            Filters
          </span>
          <Accordion type="single" collapsible className="w-full space-y-5">
            <AccordionItem value="item-1">
              <AccordionTrigger className="py-3 bg-[#58C5C7] rounded-3xl px-5">
                Categories
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-y-3 text-slate-400 p-5">
                {[
                  "Pottery",
                  "Textile Crafts",
                  "Vase",
                  "Sculpture",
                  "Paintings",
                  "Crochet",
                  "Calligraphy",
                ].map((category) => (
                  <div className="flex items-center space-x-2" key={category}>
                    <Checkbox
                      id={category}
                      checked={categories.includes(category)}
                      onCheckedChange={() => handleCategoryChange(category)}
                    />
                    <label
                      htmlFor={category}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {category}
                    </label>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="py-3 bg-[#58C5C7] rounded-3xl px-5">
                Price
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-y-3 text-slate-400 p-5">
                <Slider
                  defaultValue={[3000]}
                  max={100000}
                  step={100}
                  color="black"
                  onValueChange={handleSliderChange} // Listen to slider value changes
                />
                <span className="text-slate-600 font-medium">
                  Selected Price: {sliderValue}
                </span>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div className="flex flex-col gap-y-10 py-10 w-full lg:w-[70%] px-5 md:px-10">
          <div className="w-full py-5 bg-[#E5E5E5] text-center">
            <span className="text-xl font-bold ">
              {filteredProducts.length} PRODUCTS
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:grid-rows-3 gap-10">
            {paginatedProducts.map((product: any) => (
              <ProductsCard key={product.id} product={product} />
            ))}
          </div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                />
              </PaginationItem>
              {Array.from(
                { length: Math.ceil(filteredProducts.length / itemsPerPage) },
                (_, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink
                      href="#"
                      isActive={currentPage === index + 1}
                      onClick={() => setCurrentPage(index + 1)}
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                )
              )}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={() =>
                    setCurrentPage((prev) =>
                      Math.min(prev + 1, Math.ceil(filteredProducts.length / itemsPerPage))
                    )
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
};

export default Products;
