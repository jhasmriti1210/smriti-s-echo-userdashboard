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
    <div className="w-full flex flex-col gap-y-[14px] bg-green-100 pt-4">
      <div className="pl-4">
        <Title title="Recent Poetries" />
      </div>
      <div className="grid grid-cols-1 gap-y-3">
        {poetry &&
          poetry.length > 0 &&
          poetry.map((item, i) => <PoetryCard key={i} item={item} />)}
      </div>
    </div>
  );
};

export default RecentPoetry;
