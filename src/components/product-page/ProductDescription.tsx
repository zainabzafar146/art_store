import React from "react";

interface ProductDetails {
  description: string;
  color: string;
  material: string;
  width: string;
  height: string;
  feature: string;
  style: string;
}
interface ProductDescriptionProps {
  product: ProductDetails;
}

const ProductDescription = ({ product }: ProductDescriptionProps) => {
  return (
    <div className="flex flex-col gap-y-5 md:gap-y-7 px-5 md:px-10">
      <span className="text-lg p-3 bg-[#58C5C7] w-fit text-white">Product Description</span>
      <div className="flex flex-col gap-y-5 md:gap-y-7 p-5 border-[1px] border-slate-400">
        <span>
         {product.description}
        </span>
        <div className="flex flex-col gap-y-2">
          <div className="flex gap-x-2">
            <span className="font-bold">Material:</span>
            <span>{product.material}</span>
          </div>
          <div className="flex gap-x-2">
            <span className="font-bold">Color:</span>
            <span>{product.color}</span>
          </div>
          <div className="flex gap-x-2">
            <span className="font-bold">Height:</span>
            <span>{product.height} inches</span>
          </div>
          <div className="flex gap-x-2">
            <span className="font-bold">Width:</span>
            <span>{product.width} inches</span>
          </div>
          <div className="flex gap-x-2">
            <span className="font-bold">Feature:</span>
            <span>{product.feature}</span>
          </div>
          <div className="flex gap-x-2">
            <span className="font-bold">Style:</span>
            <span>{product.style}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDescription;
