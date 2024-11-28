"use client";
import ProductsCard from "./ProductsCard";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { fetchAllProducts } from "@/actions/fetchAllProducts";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";

const Products = () => {
  const PRODUCTS_PER_PAGE = 12;

  const [products, setProducts] = useState<any>([]);
  const [filteredProducts, setFilteredProducts] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sliderValue, setSliderValue] = useState(3000);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const categories = [
    "Pottery",
    "Textile Crafts",
    "Vase",
    "Sculpture",
    "Paintings",
    "Crochet",
    "Calligraphy",
  ];

  const handleSliderChange = (value: any) => {
    setSliderValue(value[0]);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category]
    );
  };

  const applyFilters = () => {
    const filtered = products.filter((product: any) => {
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(product.type);
      const matchesPrice = product.price <= sliderValue;
      return matchesCategory && matchesPrice;
    });
    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset to the first page when filters change
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetchAllProducts();
        if (response) {
          setProducts(response);
          setFilteredProducts(response);
        }
      } catch (error) {
        toast.error("Failed to fetch products");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [sliderValue, selectedCategories]);

  const getTotalPages = () => {
    return Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getPaginatedProducts = () => {
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    const endIndex = startIndex + PRODUCTS_PER_PAGE;
    return filteredProducts.slice(startIndex, endIndex);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#58C5C7]" />
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-between min-h-[70svh]">
      <div className="flex max-w-screen-2xl w-full">
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
                {categories.map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      id={category}
                      checked={selectedCategories.includes(category)}
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
                  onValueChange={handleSliderChange}
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
            {getPaginatedProducts().map((item: any, index: number) => (
              <ProductsCard
                key={index}
                imageUrl={item.imageUrl}
                name={item.name}
                price={item.price}
                vendor={item.vendor}
                productId={item.id}
              />
            ))}
          </div>
          <Pagination>
            <PaginationContent>
              {Array.from({ length: getTotalPages() }, (_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink
                    href="#"
                    isActive={currentPage === index + 1}
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              {getTotalPages() > 3 && <PaginationEllipsis />}
              <PaginationNext
                href="#"
                onClick={() =>
                  handlePageChange(Math.min(currentPage + 1, getTotalPages()))
                }
              />
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
};

export default Products;
