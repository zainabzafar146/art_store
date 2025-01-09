
import { auth } from "@/auth";
import ProductDetails from "@/components/auctions/ProductDetails";

const page = async () => {

  const session = await auth();

  return (
    <section className="flex justify-center">
      <ProductDetails session={session ?? null} />
    </section>
  );
};

export default page;
