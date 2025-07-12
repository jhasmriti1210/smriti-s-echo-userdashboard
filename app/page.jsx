// pages/index.jsx
import Link from "next/link";
import Footer from "../components/Footer";
import Image from "next/image";
import FeaturedPoems from "../components/news/items/FeaturedPoems";
import RecentPoetry from "@/components/news/RecentPoetry";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#fefaf3] dark:bg-gray-900 text-gray-800 dark:text-white transition duration-300 ease-in-out">
      {/* Hero Section with Background Video */}
      <section className="relative flex items-center justify-center text-center py-0 px-0 h-screen w-full">
        <video
          autoPlay
          loop
          muted
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        >
          <source src="/herovideo.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="relative z-10">
          <h1 className="text-5xl font-serif font-bold mb-4 text-white">
            SMRITI JHA
          </h1>
          <p className="text-xl italic text-white max-w-xl">
            Where emotions find a voice, and stories find a soul.
          </p>
          <Link href="/poetry/allpoetry" passHref>
            <button className="mt-8 px-6 py-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition">
              Read My Poems
            </button>
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section className="relative bg-[#fefaf3] dark:bg-gray-900 py-16 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-10 relative z-10">
          <div className="w-full md:w-1/2">
            <Image
              src="/professional image.jpg"
              alt="About Me"
              width={350}
              height={300}
              className="rounded-lg shadow-lg mt-6"
            />
          </div>
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h2 className="text-4xl font-semibold mb-4">About Me</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6 text-base">
              I'm Smriti, a poet by soul and a Software developer by profession.
              Through poetry, I explore emotions, love, loss, and everything in
              between, giving voice to feelings often left unspoken.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-6 text-base">
              As a web developer, I craft meaningful, intuitive digital
              experiences, believing that every line of code can tell a story.
              Both poetry and development are about connection — between people,
              ideas, and technology.
            </p>
            <p className="text-gray-700 dark:text-gray-300 text-base">
              My journey has taught me to embrace contrasts: the precision of
              code and the fluidity of verse, structure and spontaneity. These
              paths are part of the same creative energy that drives me to
              explore, express, and create.
            </p>
            <Link href="/otherstuffs/about" passHref>
              <button className="mt-6 text-gray-100 bg-amber-950 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-600 rounded-lg py-4 px-6 transition duration-300 ease-in-out">
                Know More
              </button>
            </Link>
          </div>
        </div>
        <Image
          src="/smritibranch.webp"
          alt="Decorative Branch"
          width={400}
          height={400}
          className="hidden md:block absolute right-0 top-14 opacity-80 z-0"
        />
      </section>

      {/* YouTube Poem */}
      <section className="bg-[#fefaf3] dark:bg-gray-900 py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="grid grid-cols-1 gap-8 items-center">
            <div className="w-full h-[550px]">
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

      {/* Featured Poem (Styled) */}
      <section className="bg-[#fefaf3] dark:bg-gray-900 py-20 px-6 relative transition duration-300 ease-in-out">
        <div className="max-w-6xl mx-auto text-center relative z-10 animate-fade-in-up">
          <h2 className="text-4xl font-bold font-serif text-amber-900 dark:text-amber-200 mb-4">
            Featured Poem
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
            Discover a handpicked poem that speaks to the heart — carefully
            chosen for its depth, rhythm, and emotional resonance.
          </p>
          <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 shadow-xl rounded-2xl p-8 md:p-10 transition-transform duration-300 hover:scale-[1.02]">
            <div className="flex items-start gap-3 mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-amber-700 dark:text-amber-400"
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
              <div className="text-left">
                <FeaturedPoems />
              </div>
            </div>
            <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400 mt-4">
              <span>By Smriti Jha</span>
              <span>{new Date().toLocaleDateString()}</span>
            </div>
          </div>
        </div>
        <Image
          src="/smritibranch.webp"
          alt="Decorative Branch"
          width={300}
          height={300}
          className="hidden md:block absolute right-0 top-10 opacity-80 z-0"
        />
      </section>

      {/* Recent Poem */}
      <section className="bg-[#fefaf3] dark:bg-gray-900 px-6 pb-16">
        <div className="w-full mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-6">Recent Poem</h2>
          <div>
            <RecentPoetry />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
