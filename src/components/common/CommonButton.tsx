import React from "react";
import { Button } from "@/components/ui/button";

interface PropData {
  btnText: string;
  width: string;
}

const CommonButton = ({ btnText, width }: PropData) => {
  return (
    <Button
      className={`${width} ${"border-[1px] border-[#58C5C7] rounded-3xl hover:text-white hover:scale-95 hover:bg-[#58C5C7] transition-all ease-in-out duration-200"}`}
    >
      {btnText}
    </Button>
  );
};

export default CommonButton;
