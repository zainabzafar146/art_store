"use client";
import { fetchAuctionProductDetails } from "@/actions/fetchAuctionProductDetails";
import ProductDescription from "@/components/auctions/ProductDescription";
import ProductImage from "@/components/auctions/ProductImage";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Session } from "next-auth";

const ProductDetails = ({ session }: { session: Session | null | undefined }) => {
  const params = useParams();
  const productId = params.productId;
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState<any>();

  useEffect(() => {
    if (productId) {
      const fetchProductById = async () => {
        try {
          const response = await fetchAuctionProductDetails(Number(productId));
          setProduct(response);
        } catch (error) {
          toast.error("Failed to fetch auction product details");
        } finally {
          setIsLoading(false); // Add this line
        }
      };
      fetchProductById();
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
    <div className="flex justify-center">
      <div className="flex flex-col gap-y-10 py-10 max-w-screen-2xl w-full">
        {product && (
          <>
            <ProductImage product={product} session={session ?? null} />
            {/* <ProductStats /> */}
            <ProductDescription product={product} />
          </>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
