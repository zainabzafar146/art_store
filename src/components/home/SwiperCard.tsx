import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";

interface ProductProp {
  imgUrl: string;
  name: string;
  color: string;
  txtColor: string;
}

const SwiperCard = ({ imgUrl, name, color, txtColor }: ProductProp) => {
  console.log("this is the clg to check the props", imgUrl, name);

  return (
    <div
      className={`flex flex-col items-center pt-5 justify-between h-[400px] w-full bg-${color}`}
    >
      <Image
        src={imgUrl}
        alt=""
        width={1000}
        height={1000}
        className=" w-64 h-64"
      />
      <div className="flex flex-col p-4 items-center gap-y-5">
        <span className={`text-${txtColor} text-lg lg:text-xl font-semibold`}>
          {name}
        </span>
        <Link href={"/shop"}>
          <Button
            className={` text-${txtColor} ${"border-[1px]  border-[#58C5C7] rounded-3xl hover:scale-95 hover:bg-[#58C5C7] transition-all ease-in-out duration-200"}`}
          >
            Shop Now
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default SwiperCard;
