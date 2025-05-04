import HeadLines from "@/components/HeadLines";
import SimplePoetryCard from "@/components/news/items/SimplePoetryCard";
import Footer from "@/components/Footer";
import { base_api_url } from "@/config/Config";
import ScrollToTopButton from "@/components/scroll-top-to-bottom"; // Import the scroll-to-top button

const Home = async () => {
  const poetry_data = await fetch(`${base_api_url}/api/all/poetry`, {
    next: {
      revalidate: 5,
    },
  });

  let poetry = await poetry_data?.json();
  poetry = poetry.poetry;

  return (
    <div>
      <main>
        <HeadLines poetry={poetry} />
        <div className="bg-slate-100">
          <div className="px-4 md:px-8 py-8">
            <div className="flex flex-wrap">
              <div className="w-full mt-5">
                <div className="flex w-full flex-col gap-y-[14px] pl-0 lg:pl-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[8px]">
                    {Object.keys(poetry).map((category, i) =>
                      // Render each category's items
                      poetry[category].map((item, j) => {
                        if (j < 4) {
                          return (
                            <SimplePoetryCard item={item} key={`${i}-${j}`} />
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

      {/* Scroll to top button component */}
      <ScrollToTopButton />
    </div>
  );
};

export default Home;
