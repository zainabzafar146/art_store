import ProductDetails from "@/components/shop/ProductDetails";
import { auth } from "@/auth";

const page = async () => {
  const session = await auth();

  return (
    <section className="flex justify-center">
      <ProductDetails userEmail={session?.user?.email ?? ''} />
    </section>
  );
};

export default page;
