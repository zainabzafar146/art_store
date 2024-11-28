"use client";
import Image from "next/image";
import React, { useState } from "react";
import CommonButton from "../common/CommonButton";
import { createCartAndAddCartItem } from "@/actions/createCartAndAddCartItem";
import { Button } from "../ui/button";
import { toast } from "sonner";

interface ProductDetails {
  name: string;
  price: number;
  vendor: string;
  type: string;
  color: string;
  material: string;
  width: string;
  height: string;
  imageUrl: string;
}
interface ProductImageProps {
  product: ProductDetails;
}

const ProductImage = ({ product }: ProductImageProps) => {
  const [disable, setDisable] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const addToCart = async () => {
    setDisable(true);
    try {
      const response = await createCartAndAddCartItem(
        "cm0jp9qz000002or3ysse664e",
        4,
        quantity,
        1000
      );
      if (response.success) {
        setDisable(false);
        toast.success("Item added to cart");
      } else {
        setDisable(false);
      }
    } catch (error) {
      setDisable(false);
      toast.error("Error adding item to cart");
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-x-5 md:gap-x-10 lg:gap-x-20 gap-y-10 px-5 md:px-10 py-10 lg:max-h-[100svh]">
      <Image
        src={product.imageUrl}
        alt=""
        width={1000}
        height={1000}
        className="sm:max-w-[50%] max-h-[60svh] sm:max-h-[100svh]"
      />
      <div className="flex flex-col gap-y-7 sm:w-[50%] ">
        <span className="text-3xl font-bold">{product.name}</span>
        <div className="flex flex-col gap-y-4 lg:gap-y-7 w-[60%] lg:w-[50%] xl:w-[40%]">
          <div className="flex justify-between">
            <span className="font-semibold">Price</span>
            <span>{product.price}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Vender</span>
            <span>{product.vendor}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Type</span>
            <span>{product.type}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Color</span>
            <span>{product.color}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Material</span>
            <span>{product.material}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Dimension</span>
            <span>
              {product.height} x {product.width}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-semibold">Quantity</span>
            <div className="flex border-[1px]">
              <span
                className="border-r-[1px] px-3 py-1 text-center cursor-pointer"
                onClick={() => {
                  if (quantity > 1) {
                    setQuantity(quantity - 1);
                  }
                }}
              >
                -
              </span>
              <span className="px-4 py-1">{quantity}</span>
              <span
                className="border-l-[1px] px-3 py-1 text-center cursor-pointer"
                onClick={() => {
                  if (quantity > 0) {
                    setQuantity(quantity + 1);
                  }
                }}
              >
                +
              </span>
            </div>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Availability</span>
            <span>Name</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Subtoal</span>
            <span>{product.price * quantity}</span>
          </div>
        </div>
        <div className="flex flex-col gap-y-4 lg:gap-y-7 md:max-w-[80%] xl:max-w-[50%] pt-10">
          <div className="flex justify-between">
            {disable ? (
              <Button
                className="border-[1px] border-red-500 rounded-3xl text-red-500 hover:text-white hover:scale-95 hover:border-red-600 transition-all ease-in-out duration-200"
                disabled
              >
                Add To Cart
              </Button>
            ) : (
              <Button
                className="border-[1px] border-[#58C5C7] rounded-3xl hover:text-white hover:scale-95 hover:bg-[#58C5C7] transition-all ease-in-out duration-200"
                onClick={addToCart}
              >
                Add To Cart
              </Button>
            )}

            <CommonButton btnText="Add To Wishlist" width="w-36 " />
          </div>
          <CommonButton btnText="Buy It Now" width="w-full" />
        </div>
      </div>
    </div>
  );
};

export default ProductImage;
