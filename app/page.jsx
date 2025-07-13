// pages/index.jsx
import Link from "next/link";
import Footer from "../components/Footer";
import Image from "next/image";
import FeaturedPoems from "../components/news/items/FeaturedPoems";
import RecentPoetry from "@/components/news/RecentPoetry";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#fefaf3] dark:bg-gray-900 text-gray-800 dark:text-white transition duration-300 ease-in-out">
      {/* Hero Section */}
      <section className="relative flex items-center justify-center text-center h-screen w-full bg-black">
        {/* Small screen image */}
        <div className="absolute inset-0 z-0 md:hidden">
          <Image
            src="/herosection.jpg"
            alt="Smriti writing poetry"
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            className="opacity-90"
            priority
          />
        </div>

        {/* Large screen image */}
        <div className="absolute inset-0 z-0 hidden md:block">
          <Image
            src="/home.jpg"
            alt="Smriti writing poetry"
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            className="opacity-90"
            priority
          />
        </div>

        {/* Darker Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/50 z-10" />

        {/* Text Content */}
        <div className="relative z-20 px-4">
          <h1 className="text-5xl md:text-6xl font-serif font-normal text-white mb-4 drop-shadow-lg">
            Smriti Jha
          </h1>
          <p className="text-base md:text-xl italic text-gray-100 max-w-3xl mx-auto drop-shadow hidden md:block">
            And one day the girl with the books became the woman writing them.
          </p>
          <Link href="/poetry/allpoetry" passHref>
            <button className="mt-8 px-6 py-3 bg-white text-black font-medium rounded-full hover:bg-gray-200 transition duration-300">
              Read My Poems
            </button>
          </Link>
        </div>
      </section>

      {/* YouTube Poem */}
      <section className="bg-[#dfecde] dark:bg-gray-900 py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="grid grid-cols-1 gap-8 items-center">
            <div className="w-full h-[500px] sm:h-[550px]">
              <iframe
                className="w-full h-full rounded-lg shadow-lg"
                src="https://www.youtube.com/embed/xBq1yyiwAwc"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Poem */}
      <section className="bg-[#dfecde] dark:bg-gray-900 py-10 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-semibold text-black dark:text-amber-200 mb-4 font-serif">
            Featured Poem
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-4xl mx-auto text-base sm:text-lg">
            Discover a handpicked poem that speaks to the heart.
          </p>
          <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 shadow-xl rounded-2xl p-6 sm:p-8 transition-transform duration-300 hover:scale-[1.01]">
            <div className="flex items-start gap-3 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 text-amber-700 dark:text-amber-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 13h6m2 6H7a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2z"
                />
              </svg>
              <div className="text-left w-full">
                <FeaturedPoems />
              </div>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4 text-sm text-gray-500 dark:text-gray-400 flex justify-between">
              <span>By Smriti Jha</span>
              <span>{new Date().toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Poetry */}
      <section className="bg-[#dfecde] dark:bg-gray-900 px-4 sm:px-6 pb-16">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-6 font-serif">
            Recent Poetry
          </h2>
          <RecentPoetry />
        </div>
      </section>

      <Footer />
    </main>
  );
}
