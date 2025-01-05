"use client";
import { fetchArtistProducts } from "@/actions/fetchArtistProducts";
import { Session } from "next-auth";
import { useEffect, useState } from "react";
import { fetchUser } from "@/actions/fetchUser";
import ProductsCard from "./ProductCard";

async function Products({ session }: { session: Session | null | undefined }) {
  const [artistUserId, setArtistUserId] = useState("");
  const [products, setProducts] = useState<any>("");

  useEffect(() => {
    const fetchArtistId = async () => {
      try {
        if (!session?.user?.email) return;
        const artist = await fetchUser(session.user.email);
        console.log("this is the artist data", artist.artist?.userId);
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
        const products = await fetchArtistProducts(artistUserId);
        setProducts(products);
      } catch (error) {
        console.error("Failed to fetch artist products", error);
      }
    };
    if (artistUserId) {
      fetchArtistProductsById();
    }
  }, [artistUserId]);

  return (
    <div className="flex flex-col justify-between min-h-[70svh]">
      <div className="flex max-w-screen-2xl w-full">
        <div className="hidden lg:flex flex-col gap-y-16 w-[30%] text-white py-10 px-10">
          <span className="text-center font-medium text-lg py-5 bg-[#58C5C7] rounded-3xl">
            Filters
          </span>
        </div>
        <div className="flex flex-col gap-y-10 py-10 w-full lg:w-[70%] px-5 md:px-10">
          <div className="w-full py-5 bg-[#E5E5E5] text-center"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:grid-rows-3 gap-10">
            {products.map((item: any, index: any) => (
              <ProductsCard
                key={index}
                imageUrl={item.imageUrl}
                name={item.name}
                price={item.price}
                vendor={item.vendor}
                productId={item.id}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
