import PageHeading from "@/components/common/PageHeading";
import Products from "@/components/auctions/Products";
import React from "react";

const page = () => {
  return (
    <section className="flex flex-col gap-y-10 py-10">
      <PageHeading text="AUCTION" />
      <Products />
    </section>
  );
};

export default page;
