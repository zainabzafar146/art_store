import React from "react";
import PageHeading from "@/components/common/PageHeading";
import RegisterAsArtistForm from "@/components/auth/RegisterAsArtistForm";

const page = () => {
  return (
    <section className="flex flex-col items-center py-10 gap-y-20  ">
      <PageHeading text="Register As Artist" />

      <div className="flex flex-col items-center bg-[#E5E5E5] gap-y-7 pt-10 pb-5 px-5 md:px-10 lg:px-20 max-w-80 sm:max-w-xl md:max-w-2xl w-full">
        <span className="text-lg md:text-xl lg:text-2xl font-bold">
          CREATE ACCOUNT
        </span>
        <RegisterAsArtistForm />
      </div>
    </section>
  );
};

export default page;
