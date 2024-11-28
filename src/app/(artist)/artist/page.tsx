"use client"
import React from "react";
import PageHeading from "@/components/common/PageHeading";
import ProductUploadForm from "@/components/artist/ProductUploadForm";

const page = () => {
  return (
    <section className="flex flex-col gap-y-10 py-10">
      <PageHeading text="Upload Art" />
      <ProductUploadForm />
    </section>
  );
};

export default page;
