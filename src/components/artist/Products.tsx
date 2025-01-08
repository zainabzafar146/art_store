"use client";
import { fetchArtistProducts } from "@/actions/fetchArtistProducts";
import { Session } from "next-auth";
import { useEffect, useState } from "react";
import { fetchUser } from "@/actions/fetchUser";
import ProductsCard from "./ProductCard";

const Products = ({ session }: { session: Session | null | undefined }) => {
  const [artistUserId, setArtistUserId] = useState("");
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArtistId = async () => {
      try {
        if (!session?.user?.email) return;
        const artist = await fetchUser(session.user.email);
        if (artist) {
          setArtistUserId(artist.artist?.userId ?? "");
        }
      } catch (error) {
        console.error("Failed to fetch artist", error);
      }
    };
    fetchArtistId();

    const fetchArtistProductsById = async () => {
      try {
        const response = await fetchArtistProducts(artistUserId);
        setProducts(response.data ?? []);
      } catch (error) {
        console.error("Failed to fetch artist products", error);
      } finally {
        setIsLoading(false);
      }
    };
    if (artistUserId) {
      fetchArtistProductsById();
    }
  }, [artistUserId]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70svh]">
      {!artistUserId || isLoading ? (
        <div className="flex justify-center items-center min-h-[50vh]">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#58C5C7]" />
        </div>
      ) : (
        <div className="flex max-w-screen-2xl w-full">
          <div className="flex flex-col gap-y-10 py-10 w-full px-5 md:px-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:grid-rows-3 gap-10">
              {products.length === 0 ? (
                <div className="flex justify-center items-center col-span-full min-h-[50vh]">
                  <p className="text-lg text-gray-600">No products available</p>
                </div>
              ) : (
                products.map((item: any, index: any) => (
                  <ProductsCard
                    key={index}
                    imageUrl={item.imageUrl}
                    name={item.name}
                    price={item.price}
                    vendor={item.vendor}
                    productId={item.id}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
