"use client";
import { fetchProductDetails } from "@/actions/fetchProductDetails";
import ProductDescription from "@/components/product-page/ProductDescription";
import ProductImage from "@/components/product-page/ProductImage";
import ProductReview from "@/components/product-page/ProductReview";
import ProductStats from "@/components/product-page/ProductStats";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { toast } from "sonner";

const ProductDetails = ({ userEmail }: { userEmail: string }) => {
  const params = useParams();
  const productId = params.productId;
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState<any>();

  useEffect(() => {
    if (productId) {
      const fetchProductById = async () => {
        try {
          console.log("this is id............", productId);
          const response = await fetchProductDetails(Number(productId));
          console.log("this is product details", response);
          setProduct(response);
        } catch (error) {
          toast.error("Failed to fetch product details");
        } finally {
          setIsLoading(false); // Add this line
        }
      };
      fetchProductById();
      console.log("this is product from state", product);
    }
  }, [productId]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#58C5C7]" />
      </div>
    );
  }

  return (
    <section className="flex justify-center">
      <div className="flex flex-col gap-y-10 py-10 max-w-screen-2xl w-full">
        {product && (
          <>
            <ProductImage product={product} userEmail={userEmail} />
            <ProductStats />
            <ProductDescription product={product} />
            <ProductReview product={product} />
          </>
        )}
      </div>
    </section>
  );
};

export default ProductDetails;
