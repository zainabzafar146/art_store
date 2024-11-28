import React from "react";
import { IoIosStar } from "react-icons/io";

interface ReviewProp {
  rating: number;
  firtName: string;
  lastName: string;
  description: string;
}

const ProductReviewCard = ({
  rating,
  firtName,
  lastName,
  description,
}: ReviewProp) => {
  return (
    <div className="flex flex-col gap-y-3">
      <div className="flex gap-x-10">
        <span className="font-bold text-lg">
          {firtName} {lastName}
        </span>
        <div className="flex gap-x-2 items-center">
          <IoIosStar color="yellow" size={26} />
          <span>({rating})</span>
        </div>
      </div>
      <span className="text-slate-400">{description}</span>
    </div>
  );
};

export default ProductReviewCard;
