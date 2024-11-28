import Image from "next/image";
import Link from "next/link";
import React from "react";

interface ProductProps {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
  color: string;
  material: string;
  width: string;
  height: string;
  feature: string;
  style: string;
  type: string;
  vendor: string;
  createdAt: string;
  updatedAt: string;
}

interface PropData {
  product: ProductProps;
}
const ProductTabCard = ({ product }: PropData) => {
  return (
    <div className="flex flex-col gap-y-2 p-4 ">
      <Link href={`/shop/product/${product.id}`}>
        {/* Product Image */}
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={1000}
          height={1000}
          className="aspect-square !h-80"
        />

        {/* Product Details */}
        <div className="flex flex-col items-center gap-y-2">
          <span className="text-lg font-semibold">{product.name}</span>
          <span className="text-sm text-gray-500">{product.type}</span>
          <span className="text-lg font-bold text-blue-500">
            Rs. {product.price}
          </span>
        </div>
      </Link>
    </div>
  );
};

export default ProductTabCard;
