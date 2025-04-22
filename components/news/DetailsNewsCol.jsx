import React from "react";
import Title from "../Title";
import SimpleDetailsNewsCard from "./items/SimpleDetailsNewsCard";
import NewsCard from "./items/NewsCard";

const DetailsNewsCol = ({ news, category }) => {
  // ✅ Guard clause to prevent crashes
  if (!news || news.length === 0) {
    return (
      <div className="w-full px-4 py-8 text-gray-600 text-center">
        No news available for the category: <strong>{category}</strong>
      </div>
    );
  }

  console.log(news[0]?.category); // optional chaining for safety

  return (
    <div className="w-full flex flex-col gap-[14px] pl-2">
      <Title title={category} />
      <div className="grid grid-cols-1 gap-y-6">
        <SimpleDetailsNewsCard
          news={news[0]}
          type="details-news"
          height={300}
        />
      </div>
      <div className="grid grid-cols-1 gap-y-[14px] mt-4">
        {news.slice(0, 4).map((item, i) => (
          <NewsCard item={item} key={i} />
        ))}
      </div>
    </div>
  );
};

export default DetailsNewsCol;
