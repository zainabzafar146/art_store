
import ArtistsDetails from "@/components/artists/ArtistsDetails";
import SearchBar from "@/components/artists/SearchBar";
import PageHeading from "@/components/common/PageHeading";
import React from "react";

const page = () => {
  return (
    <div className="flex flex-col gap-y-10">
      <PageHeading text="MEET OUR ARTIST" />
      {/* <SearchBar /> */}
      <div className="flex justify-center">
        <ArtistsDetails/>
      </div>
    </div>
  );
};

export default page;
