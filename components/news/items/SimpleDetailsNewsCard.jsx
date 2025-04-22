"use client";

import React from "react";
import Image from "next/legacy/image";
import Link from "next/link";
import { convert } from "html-to-text";

const defaultImage = "/images/placeholder.jpg"; // Ensure this image exists in your public/images/ folder

const SimpleDetailsNewsCard = ({ news, type, height }) => {
  const imageSrc = news?.image?.trim() ? news.image : defaultImage;

  return (
    <div className="bg-white shadow">
      <div className="group relative overflow-hidden">
        <div
          style={{ height: `${height}px` }}
          className="w-full relative group-hover:scale-[1.1] transition-all duration-[1s]"
        >
          <Image
            className="object-cover"
            layout="fill"
            src={imageSrc}
            alt="news image"
          />
        </div>

        <div className="w-full h-full block absolute left-0 top-0 invisible group-hover:visible bg-white cursor-pointer opacity-5 transition-all duration-300"></div>
      </div>

      <div className="p-5">
        <Link
          className="text-[15px] font-semibold text-[#333333] hover:text-[#1c411c]"
          href={`/news/${news?.slug}`}
        >
          {news?.title}
        </Link>

        <div className="flex gap-x-2 text-xs font-normal text-slate-600 mt-2">
          <span>{news?.date}</span>
          <span>{news?.writerName}</span>
        </div>

        {type === "details-news" && (
          <p className="text-sm text-slate-600 pt-3">
            {convert(news?.description || "", {
              wordwrap: false,
            }).slice(0, 200)}
          </p>
        )}
      </div>
    </div>
  );
};

export default SimpleDetailsNewsCard;
