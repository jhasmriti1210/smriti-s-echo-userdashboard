import React from "react";
import Image from "next/legacy/image";
import Link from "next/link";

const PoetryCard = ({ item }) => {
  const defaultImage = "/images/placeholder.jpg"; // Ensure this exists in your public/images folder
  const imageSrc = item?.image?.trim() ? item.image : defaultImage;

  return (
    <div className="bg-white shadow flex p-4">
      <div className="relative group overflow-hidden h-full">
        <div className="group-hover:scale-[1.1] transition-all duration-[1s] w-[100px] md:w-[160px] h-[30px] lg:w-[100px] relative">
          <Image className="" layout="fill" src={imageSrc} alt="poetry image" />
          <div className="w-full h-full block absolute left-0 top-0 invisible group-hover:visible bg-white cursor-pointer opacity-5 transition-all duration-300"></div>
        </div>
      </div>
      <div className="flex flex-col gap-y-1 w-[calc(100%-100px)] md:w-[calc(100%-160px)] lg:w-[calc(100%-100px)] pl-3">
        <Link
          href={`/poetry/category/${item?.category}`}
          className="text-sm font-semibold text-[#1dc420]"
        >
          {item?.category}
        </Link>
        <Link
          href={`/poetry/${item?.slug}`}
          className="text-sm font-semibold text-[#333333] hover:text-[#306741]"
        >
          {item?.title}
        </Link>
        <div className="flex gap-x-2 text-xs font-normal text-slate-600">
          <span>{item?.date}</span>
          <span>{item?.writerName}</span>
        </div>
      </div>
    </div>
  );
};

export default PoetryCard;
