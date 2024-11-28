import Products from "@/components/shop/Products";
import PageHeading from "@/components/common/PageHeading";
import React from "react";

const page = () => {
  return (
    <section className="flex flex-col gap-y-10 py-10">
      <PageHeading text="COLLECTION" />
      <Products />
    </section>
  );
};

export default page;
