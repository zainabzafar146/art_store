import React from "react";
import FoundersCard from "./FoundersCard";

const Founders = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 py-10">
      <FoundersCard name="ZAINAB ZAFAR" />
      <FoundersCard name="AYESHA FAROOQ" />
      <FoundersCard name="AQSA NISAR" />
    </div>
  );
};

export default Founders;
