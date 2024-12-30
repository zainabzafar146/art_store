import CartMain from "@/components/cart/CartMain";
import { auth } from "@/auth";

const page = async () => {
  const session = await auth(); 
  return (
    <main className="flex flex-col items-center justify-center">
      <CartMain userEmail={session?.user?.email ?? ''} />
    </main>
  );
};

export default page;
