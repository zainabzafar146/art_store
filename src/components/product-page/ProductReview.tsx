import { createReview } from "@/actions/createReview";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import ProductReviewCard from "./ProductReviewCard";
import { fetchProductReviews } from "@/actions/fetchProductReviews";

interface ProductDetails {
  id: number;
}
interface ProductReviewProps {
  product: ProductDetails;
}

const ProductReview = ({ product }: ProductReviewProps) => {
  const [reviewDescription, setReviewDescription] = useState<string>("");
  const [rating, setRating] = useState<number>(0);
  const [hover, setHover] = useState<number>(0);
  const [productReviews, setProductReviews] = useState<any>();
  const totalStars = 5;
  console.log("product id in review......", product.id);

  const fetchReviews = async () => {
    try {
      const response = await fetchProductReviews(product.id);
      if (response) {
        console.log("Fetched reviews:", response);
        // Sort reviews by createdAt in descending order
        const sortedReviews = response.sort(
          (a: any, b: any) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setProductReviews(sortedReviews);
      }
    } catch (error) {
      console.error("Failed to fetch product reviews", error);
    }
  };
  useEffect(() => {
    fetchReviews();
  }, []);

  const handleCreateReview = async (
    userId: string,
    productId: number,
    rating: number,
    description: string
  ) => {
    try {
      const response = await createReview(
        userId,
        productId,
        rating,
        description
      );
      if (response) {
        toast.success("Review added successfully");
        setReviewDescription(""); // Reset description
        setRating(0); // Reset rating
        fetchReviews(); // Refresh reviews to show the new one
      }
    } catch (error) {
      toast.error("Failed to add review");
    }
  };
  const onPointerMove = (value: number, index: number) =>
    console.log(value, index);

  return (
    <div className="flex flex-col gap-y-10 px-5 md:px-10">
      <span className="text-lg p-3 bg-[#58C5C7] w-fit text-white">
        Customer Reviews
      </span>
      <div className="flex justify-between max-w-screen-sm">
        {productReviews && (
          <div className="flex flex-col gap-y-2">
            <span>
              {(
                productReviews.reduce(
                  (sum: any, review: any) => sum + review.rating,
                  0
                ) / productReviews.length
              ).toFixed(1)}{" "}
              out of 5
            </span>
            <span>Based on {productReviews.length} reviews</span>
          </div>
        )}
        <div className="flex flex-col">
          <Dialog>
            <DialogTrigger className="py-2 px-7 bg-[#58C5C7] text-white">
              Write a Review
            </DialogTrigger>
            <DialogContent className="bg-slate-200 py-10">
              <DialogHeader>
                <DialogTitle>Write your review below:</DialogTitle>
                <DialogDescription>
                  <div className="flex flex-col justify-center items-center gap-y-5">
                    <Textarea
                      placeholder=""
                      maxLength={500}
                      value={reviewDescription}
                      onChange={(e) => setReviewDescription(e.target.value)}
                    />
                    <div className="flex items-center space-x-1">
                      {[...Array(totalStars)].map((_, index) => {
                        const starValue = index + 1;
                        return (
                          <svg
                            key={index}
                            onClick={() => setRating(starValue)}
                            onMouseEnter={() => setHover(starValue)}
                            onMouseLeave={() => setHover(0)}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill={
                              starValue <= (hover || rating)
                                ? "#FFD700"
                                : "white"
                            } // Filled color (gold or white)
                            stroke="black" // Black outline for each star
                            strokeWidth={0.5} // Width of the outline
                            className="w-8 h-8 cursor-pointer"
                          >
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                          </svg>
                        );
                      })}
                      <span className="ml-2 text-gray-600">
                        {rating} / {totalStars}
                      </span>
                    </div>
                    <Button
                      className="border-[1px] border-[#58C5C7] rounded-3xl hover:text-white hover:scale-95 hover:bg-[#58C5C7] transition-all ease-in-out duration-200"
                      onClick={() =>
                        handleCreateReview(
                          "cm0jp9qz000002or3ysse664e",
                          product.id,
                          rating,
                          reviewDescription
                        )
                      }
                    >
                      Post Review
                    </Button>
                  </div>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="flex flex-col">
        {productReviews &&
          productReviews
            .slice(0, 2)
            .map((review: any) => (
              <ProductReviewCard
                key={review.id}
                rating={review.rating}
                firtName={review.user.firstName}
                lastName={review.user.lastName}
                description={review.description}
              />
            ))}
      </div>
    </div>
  );
};

export default ProductReview;
