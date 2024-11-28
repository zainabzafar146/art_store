import AboutAtristee from "@/components/about-us/AboutAtristee";
import Founders from "@/components/about-us/Founders";
import OurFeatures from "@/components/about-us/OurFeatures";
import OurValues from "@/components/about-us/OurValues";
import PageHeading from "@/components/common/PageHeading";
import React from "react";

const page = () => {
  return (
    <section className="flex flex-col items-center gap-y-10">
      <PageHeading text="ABOUT PAGE" />
      <div className="flex flex-col items-center gap-y-10 max-w-screen-2xl w-full">
        <AboutAtristee />
        <OurFeatures />
        <OurValues />
        <Founders />
      </div>
    </section>
  );
};

export default page;
