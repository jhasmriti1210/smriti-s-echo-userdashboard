import React from "react";
import LoadingSpinner from "react-spinners-components";
import Marquee from "react-fast-marquee";
import Link from "next/link";

const HeadLines = ({ news }) => {
  return (
    <div className="bg-green-100 shadow flex flex-wrap">
      <div className="flex md:w-[170px] w-full  relative ">
        <div className="md:pl-8 pl-4 w-full py-2 flex justify-start items-center gap-x-1">
          <span>
            <LoadingSpinner
              type="Ripple"
              colors={["#006400", "#00c800"]}
              size={"30px"}
            />
          </span>
          <h2 className="text-[#333333] font-semibold text-lg">All poetries</h2>
        </div>
      </div>
      <div className="flex md:w-[calc(100%-170px)] w-full">
        <div className="flex w-full justify-start items-center">
          <Marquee>
            {Object.keys(news).length > 0 &&
              Object.keys(news).map((c) =>
                news[c].length > 0
                  ? news[c].map((n) => (
                      <Link
                        key={n.slug}
                        className="py-3 block font-semibold hover:text-green-600 pr-12 text-sm"
                        href={`/news/${n.slug}`}
                      >
                        {n.title}
                      </Link>
                    ))
                  : null
              )}
          </Marquee>
        </div>
      </div>
    </div>
  );
};

export default HeadLines;
