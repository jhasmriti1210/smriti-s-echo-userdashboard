import Breadcrumb from "@/components/Breadcrumb";
import SimpleDetailsNewsCard from "@/components/news/items/SimpleDetailsNewsCard";
import React from "react";
import { base_api_url } from "../../../../config/Config";
import Footer from "@/components/Footer";

const CategoryNews = async ({ params }) => {
  const { category } = await params;

  const res = await fetch(`${base_api_url}/api/category/news/${category}`, {
    next: {
      revalidate: 1,
    },
  });
  const { news } = await res.json();

  return (
    <div>
      <div className="bg-white shadow-sm py-4">
        <div className="px-4 md:px-8 w-full">
          <Breadcrumb one="category" two={category} />
        </div>
      </div>
      <div className="bg-slate-200 w-full">
        <div className="px-4 md:px-8 w-full py-8">
          <div className="flex flex-wrap">
            <div className="w-full xl:w-8/12">
              <div className="w-full pr-0 xl:pr-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-[14px] width={200}">
                  {news &&
                    news.length > 0 &&
                    news.map((item, i) => (
                      <SimpleDetailsNewsCard
                        key={item.id || i}
                        news={item}
                        type="details-news"
                        height={200}
                      />
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CategoryNews;
