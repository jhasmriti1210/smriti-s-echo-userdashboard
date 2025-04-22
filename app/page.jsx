import HeadLines from "@/components/HeadLines";
import SimpleNewsCard from "@/components/news/items/SimpleNewsCard";
import Footer from "@/components/Footer";
import { base_api_url } from "@/config/Config";

const Home = async () => {
  const news_data = await fetch(`${base_api_url}/api/all/news`, {
    next: {
      revalidate: 5,
    },
  });

  let news = await news_data?.json();
  news = news.news;

  return (
    <div>
      <main>
        <HeadLines news={news} />
        <div className="bg-slate-100">
          <div className="px-4 md:px-8 py-8">
            <div className="flex flex-wrap">
              <div className="w-full mt-5">
                <div className="flex w-full flex-col gap-y-[14px] pl-0 lg:pl-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[8px]">
                    {Object.keys(news).map((category, i) =>
                      // Render each category's items
                      news[category].map((item, j) => {
                        if (j < 4) {
                          return (
                            <SimpleNewsCard item={item} key={`${i}-${j}`} />
                          );
                        }
                        return null;
                      })
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </div>
  );
};

export default Home;
