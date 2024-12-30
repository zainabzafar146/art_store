import ProductsTable from "@/components/admin/ProductsTable";
import PageHeading from "@/components/common/PageHeading";
import React from "react";

const page = () => {
  return (
    <main className="flex flex-col gap-y-10 py-10 justify-center items-center">
      <PageHeading text="Add Products To Auction" />
      
      <div className="w-full px-10 min-h-screen">
        <ProductsTable />
      </div>
    </main>
  );
};

export default page;
