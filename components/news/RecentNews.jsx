import React from "react";
import Title from "../Title";
import NewsCard from "./items/NewsCard";
import { base_api_url } from "../../config/Config";

const RecentNews = async () => {
  const res = await fetch(`${base_api_url}/api/recent/news`, {
    next: {
      revalidate: 1,
    },
  });
  const { news } = await res.json();

  return (
    <div className="w-full flex flex-col gap-y-[14px] bg-green-100 pt-4">
      <div className="pl-4">
        <Title title="Recent Poetries" />
      </div>
      <div className="grid grid-cols-1 gap-y-3">
        {news &&
          news.length > 0 &&
          news.map((item, i) => <NewsCard key={i} item={item} />)}
      </div>
    </div>
  );
};

export default RecentNews;
