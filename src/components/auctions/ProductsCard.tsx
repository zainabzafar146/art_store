import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProductsCard = ({ product }: any) => {
  return (
    <div className="flex flex-col justify-center items-center gap-y-2 ">
      <Link href={`auctions/product/${product.id}`}>
        <Image src={product.imageUrl} alt="product" width={300} height={300} className="aspect-square !h-80" />
      </Link>
      <div className="flex flex-col gap-y-1 items-center">
        <span className="text-lg font-bold">{product.name}</span>
        <span>Starting Bid: Pkr {product.startingBid}</span>
        <span>End Date: {new Date(product.endDate).toLocaleDateString()}</span>
      </div>
    </div>
  );
};

export default ProductsCard;