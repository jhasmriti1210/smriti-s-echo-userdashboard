"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Breadcrumb from "@/components/BreadCrumb";
import Footer from "@/components/Footer";
import parse from "html-react-parser";
import Image from "next/image";
import { base_api_url } from "@/config/Config";
import RatingSection from "@/components/news/Rating";
import CommentSection from "@/components/news/Comment";
import AudioSection from "@/components/audioSection";
import { toast } from "react-hot-toast";

const Details = () => {
  const { slug } = useParams();
  const router = useRouter();
  const [poetry, setPoetry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorited, setIsFavorited] = useState(false);
  const [confirmRemove, setConfirmRemove] = useState(false);
  const [error, setError] = useState(null);

  const fetchPoetryData = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`${base_api_url}/api/poetry/details/${slug}`);
      if (!res.ok) {
        if (res.status === 404) {
          router.push("/");
          return;
        }
        throw new Error("Failed to fetch poetry data");
      }
      const data = await res.json();
      if (!data.poetry) {
        throw new Error("Poetry not found");
      }
      setPoetry(data.poetry);
      setIsFavorited(Boolean(data.poetry?.isFavorited));
      setConfirmRemove(false);
    } catch (error) {
      console.error("Error fetching poetry details:", error);
      setError(error.message);
      toast.error("Failed to load poetry details.");
      if (error.message === "Poetry not found") {
        router.push("/");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (slug) fetchPoetryData();
  }, [slug]);

  const toggleFavorite = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      toast.error("Please login to manage favorites.");
      return;
    }

    if (!poetry?._id) {
      toast.error("Poetry data not loaded yet.");
      return;
    }

    if (loading) return;

    if (isFavorited && !confirmRemove) {
      setConfirmRemove(true);
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${base_api_url}/api/favorites/${poetry._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (typeof data.isFavorited === "boolean") {
        setIsFavorited(data.isFavorited);
        setConfirmRemove(false);
        toast.success(
          data.isFavorited
            ? `"${poetry.title}" added to favorites`
            : `"${poetry.title}" removed from favorites`
        );
        fetchPoetryData();
      } else {
        toast.error("Unexpected response from server.");
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
      toast.error("Error occurred while updating favorite.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="mt-32 text-center text-gray-600 font-medium">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-32 text-center text-red-600 font-medium">{error}</div>
    );
  }

  if (!poetry) {
    return null;
  }

  return (
    <div className="mt-20">
      {/* Breadcrumb */}
      <section className="bg-[#dfecde] py-4 shadow-sm">
        <div className="px-4 sm:px-6 lg:px-8">
          <Breadcrumb one={poetry.category} two={poetry.title} />
        </div>
      </section>

      {/* Main Content */}
      <main className="bg-[#dfecde] py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Main Section */}
            <article className="xl:col-span-2">
              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="flex flex-col items-center text-center gap-4">
                  <Image
                    src={poetry.image}
                    alt={poetry.title}
                    width={160}
                    height={160}
                    className="h-40 w-40 object-cover rounded-full border-4 border-[#4b2e2e]"
                    priority
                  />
                  <h3 className="text-sm text-[#4b2e2e] uppercase font-semibold tracking-widest">
                    {poetry.category}
                  </h3>
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                    {poetry.title}
                  </h1>
                  <p className="text-sm text-slate-500">
                    {poetry.date} &bull; {poetry.writerName}
                  </p>

                  {/* Favorite Button */}
                  <button
                    onClick={toggleFavorite}
                    disabled={loading}
                    className={`w-full sm:w-auto px-6 py-2 mt-4 rounded-md font-medium transition duration-200 ${
                      isFavorited
                        ? confirmRemove
                          ? "bg-red-600 text-white hover:bg-red-700"
                          : "bg-yellow-500 text-black hover:bg-yellow-600"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                  >
                    {loading
                      ? "Processing..."
                      : isFavorited
                      ? confirmRemove
                        ? "Confirm Remove?"
                        : "Remove from Favorites"
                      : "Add to Favorites"}
                  </button>
                </div>

                {/* Audio Player */}
                {poetry.audio && (
                  <div className="mt-6 flex justify-center">
                    <AudioSection audio={poetry.audio} />
                  </div>
                )}

                {/* Description */}
                <div className="mt-6 text-gray-700 text-base leading-relaxed whitespace-pre-line">
                  {typeof poetry.description === "string"
                    ? parse(poetry.description)
                    : null}
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <aside>
              <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] border border-white/20 ring-1 ring-white/10">
                <div className="absolute -inset-px rounded-2xl bg-white/20 blur-[1.5px] opacity-30 pointer-events-none"></div>

                <div className="relative z-10 space-y-6 text-gray-100">
                  {/* Logo */}
                  <div className="flex justify-center">
                    <Image
                      src="/namesmall.png"
                      alt="Logo"
                      width={56}
                      height={56}
                      className="h-14 w-auto drop-shadow-[0_2px_4px_rgba(0,0,0,0.25)]"
                    />
                  </div>

                  {/* Rating & Comments */}
                  <RatingSection
                    poetryId={poetry._id}
                    initialRating={poetry.averageRating || 0}
                  />
                  <CommentSection
                    poetryId={poetry._id}
                    initialComments={poetry.comments || []}
                  />
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Details;
