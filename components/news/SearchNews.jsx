"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import SimpleDetailsNewsCard from "./items/SimpleDetailsNewsCard";
import { base_api_url } from "../../config/Config";

const SearchNews = () => {
  const [news, setNews] = useState([]);
  const searchValue = useSearchParams();
  const value = searchValue.get("value");

  const get_news = async () => {
    try {
      const res = await fetch(`${base_api_url}/api/search/news?value=${value}`);
      const { news } = await res.json();
      setNews(news);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  useEffect(() => {
    if (value) {
      get_news();
    }
  }, [value]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
      {news &&
        news.length > 0 &&
        news.map((item, i) => (
          <SimpleDetailsNewsCard
            key={item._id || item.slug || i}
            news={item}
            type="details-news"
            height={200}
          />
        ))}
    </div>
  );
};

export default SearchNews;
