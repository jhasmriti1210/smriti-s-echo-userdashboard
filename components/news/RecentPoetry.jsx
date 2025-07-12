import React from "react";
import Title from "../Title";
import PoetryCard from "./items/PoetryCard";
import { base_api_url } from "../../config/Config";

const RecentPoetry = async () => {
  const res = await fetch(`${base_api_url}/api/recent/poetry`, {
    next: {
      revalidate: 1,
    },
  });
  const { poetry } = await res.json();

  return (
    <div className="w-full flex flex-col gap-y-[14px]  pt-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {poetry &&
          poetry.length > 0 &&
          poetry
            .slice(0, 3)
            .map((item, i) => <PoetryCard key={i} item={item} />)}
      </div>
    </div>
  );
};

export default RecentPoetry;
