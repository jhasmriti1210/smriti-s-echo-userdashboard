import React from "react";
import Title from "../Title";
import SimpleDetailsNewsCard from "@/components/news/items/SimpleDetailsNewsCard";

const DetailsNews = ({ category, news }) => {
  // Check if news is defined and has at least two items
  if (!news || news.length < 2) {
    return (
      <div className="w-full px-4 py-8 text-gray-600 text-center">
        No sufficient news available for the category:{" "}
        <strong>{category}</strong>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-[14px] pr-2 py-8">
      <Title title={category} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 lg:gap-x-3">
        <SimpleDetailsNewsCard
          news={news[0]}
          type="details-news"
          height={300}
        />
        <SimpleDetailsNewsCard
          news={news[1]}
          type="details-news"
          height={300}
        />
      </div>
    </div>
  );
};

export default DetailsNews;
