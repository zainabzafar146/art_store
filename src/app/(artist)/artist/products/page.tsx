import PageHeading from "@/components/common/PageHeading";

import { auth } from "@/auth";
import Products from "@/components/artist/Products";

const page = async () => {

  const session = await auth();

  return (
    <section className="flex flex-col gap-y-10 py-10">
      <PageHeading text="PRODUCTS" />
      <Products session={session ?? null}   />
    </section>
  );
};

export default page;
