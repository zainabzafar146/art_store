import React from 'react'
import Image from "next/image";

interface ProData{
    name: string;
}

const FoundersCard = ({name}: ProData) => {
  return (
    <div className="flex flex-col justify-center items-center gap-y-5">
    <Image
      src={"/about-us/founder.jpg"}
      alt="Founder"
      width={1000}
      height={1000}
      className="w-80 sm:w-96 md:w-80"
    />
    <span className="text-lg font-medium">{name}</span>
  </div>
  )
}

export default FoundersCard
