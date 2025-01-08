import Image from "next/image";
import Link from "next/link";
import React from "react";

interface ProductData {
  imageUrl: string;
  name: string;
  price: number;
  vendor: string;
  productId: number;
}

const ProductsCard = ({
  imageUrl,
  name,
  price,
  vendor,
  productId,
}: ProductData) => {
  return (
    <div className="flex flex-col justify-center items-center gap-y-2 shadow-md p-3">
      
        <Image
          src={imageUrl}
          alt="product"
          width={1000}
          height={1000}
          className="aspect-square !h-80"
        />
        <div className="flex flex-col gap-y-1 items-center">
          <span className="text-lg font-bold">{name}</span>
          <span className="text-slate-600">Pkr:{price}</span>
          <span className="font-medium text-slate-600">By {vendor}</span>
        </div>
      
    </div>
  );
};

export default ProductsCard;
