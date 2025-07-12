"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Breadcrumb from "@/components/BreadCrumb";
import Footer from "@/components/Footer";
import parse from "html-react-parser";
import { base_api_url } from "@/config/Config";
import RatingSection from "@/components/news/Rating";
import CommentSection from "@/components/news/Comment";
import AudioSection from "@/components/audioSection";
import { toast } from "react-hot-toast";

const Details = () => {
  const { slug } = useParams();

  const [poetry, setPoetry] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [confirmRemove, setConfirmRemove] = useState(false);

  // Fetch poetry details from API
  const fetchPoetryData = async () => {
    try {
      const res = await fetch(`${base_api_url}/api/poetry/details/${slug}`);
      if (!res.ok) throw new Error("Failed to fetch poetry data");
      const data = await res.json();
      setPoetry(data.poetry);
      setIsFavorited(Boolean(data.poetry?.isFavorited));
      setConfirmRemove(false); // reset confirmation on new fetch
    } catch (error) {
      console.error("Error fetching poetry details:", error);
      toast.error("Failed to load poetry details.");
    }
  };

  useEffect(() => {
    if (slug) fetchPoetryData();
  }, [slug]);

  // Toggle favorite status with confirmation for removal
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

    if (loading) return; // Prevent multiple requests

    // If already favorited and removal not confirmed, show confirm prompt
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

      if (!res.ok) {
        const errorData = await res.json();
        toast.error(errorData.message || "Failed to update favorite status.");
        setLoading(false);
        return;
      }

      const data = await res.json();

      if (typeof data.isFavorited === "boolean") {
        setIsFavorited(data.isFavorited);
        setConfirmRemove(false);
        toast.success(
          data.isFavorited
            ? `"${poetry.title}" added to favorites`
            : `"${poetry.title}" removed from favorites`
        );
        // Refresh poetry details to keep data in sync
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

  if (!poetry)
    return (
      <div className="mt-32 text-center text-gray-600 font-medium">
        Loading...
      </div>
    );

  return (
    <div className="mt-32">
      <section className="bg-[#fefaf3] py-4 shadow-sm">
        <div className="px-4 md:px-8">
          <Breadcrumb one={poetry.category} two={poetry.title} />
        </div>
      </section>

      <main className="bg-slate-100 w-full py-8">
        <div className="px-4 md:px-8 max-w-7xl mx-auto">
          <div className="flex flex-wrap xl:flex-nowrap gap-8">
            {/* Main Article */}
            <article className="w-full xl:w-8/12">
              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="flex flex-col items-center gap-4">
                  <img
                    src={poetry.image}
                    alt={poetry.title || "Poetry Image"}
                    className="h-[180px] w-[180px] object-cover rounded-full border-4 border-[#4b2e2e]"
                  />
                  <h3 className="text-[#4b2e2e] uppercase text-sm font-semibold tracking-widest">
                    {poetry.category}
                  </h3>
                  <h1 className="text-3xl font-bold text-center text-gray-800">
                    {poetry.title}
                  </h1>
                  <div className="text-sm text-slate-500">
                    {poetry.date} &bull; {poetry.writerName}
                  </div>

                  {/* Favorite Button */}
                  <div className="relative mt-4">
                    <button
                      onClick={toggleFavorite}
                      disabled={loading}
                      className={`px-4 py-2 rounded-md font-semibold flex items-center justify-center gap-2 transition-colors duration-150 focus:outline-none ${
                        isFavorited
                          ? confirmRemove
                            ? "bg-red-600 text-white hover:bg-red-700"
                            : "bg-yellow-600 text-black hover:bg-yellow-700"
                          : "bg-blue-600 text-white hover:bg-blue-700"
                      }`}
                      aria-label={
                        isFavorited
                          ? confirmRemove
                            ? "Confirm remove from favorites"
                            : "Remove from favorites"
                          : "Add to favorites"
                      }
                      title={
                        isFavorited
                          ? confirmRemove
                            ? "Click to confirm remove from favorites"
                            : "Click to remove from favorites"
                          : "Add to favorites"
                      }
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
                </div>

                {/* Audio Section */}
                <div className="mt-6 flex justify-center items-center">
                  <AudioSection audio={poetry.audio} />
                </div>

                {/* Description */}
                <div className="mt-6 prose prose-green max-w-none text-justify">
                  {typeof poetry.description === "string"
                    ? parse(poetry.description)
                    : null}
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="w-full xl:w-4/12">
              <div className="bg-[#4b2e2e] rounded-xl p-6 shadow-md space-y-6">
                <div className="flex justify-center">
                  <img
                    src="/name.png"
                    alt="Website Logo"
                    className="h-16 w-auto"
                  />
                </div>
                <RatingSection
                  poetryId={poetry._id}
                  initialRating={poetry.averageRating || 0}
                />
                <CommentSection
                  poetryId={poetry._id}
                  initialComments={poetry.comments || []}
                />
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
