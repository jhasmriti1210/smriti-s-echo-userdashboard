"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { base_api_url } from "@/config/Config";
import Footer from "@/components/Footer";
import Sidebar from "@/components/dashboardsidebar";

const FavoritePoems = () => {
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("authToken")
          : null;

      if (!token) {
        setError("Authorization token missing");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${base_api_url}/api/favorite-poetry`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || "Failed to fetch favorites");
        }

        const data = await res.json();
        setFavorites(data.favorites || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  // Delete favorite poem handler
  const handleDeleteFavorite = async (poetryId) => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("authToken") : null;

    if (!token) {
      setError("Authorization token missing");
      return;
    }

    setDeletingId(poetryId); // show loading state on this poem's delete button

    try {
      const res = await fetch(`${base_api_url}/api/favorites/${poetryId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to delete favorite");
      }

      const data = await res.json();

      // Update favorites list after deletion
      setFavorites(data.favorites || []);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <>
      <div className="flex min-h-screen bg-gray-100 mt-24">
        <aside className="w-full md:w-1/4 lg:w-1/5 h-full">
          <Sidebar />
        </aside>

        <div className="flex-1 p-6">
          {loading ? (
            <p className="text-black text-center mt-56">Loading...</p>
          ) : error ? (
            <p className="text-red-500 text-center mt-56">Error: {error}</p>
          ) : (
            <div className="px-4 max-w-4xl mx-auto">
              <h1 className="text-black text-3xl font-bold text-center mb-8">
                Your Favorite Poems
              </h1>

              {favorites.length === 0 ? (
                <p className="text-gray-700 text-center">No favorites found</p>
              ) : (
                <ul className="space-y-8">
                  {favorites.map((poem) => (
                    <li
                      key={poem._id}
                      className="border p-6 rounded-lg shadow-md bg-white text-center relative"
                    >
                      <Link href={`/poetry/${poem.slug}`}>
                        <img
                          src={poem?.image}
                          alt={poem?.title || "Poetry Image"}
                          className="h-44 w-44 mx-auto object-cover rounded-full border-4 border-[#4b2e2e] mb-4 hover:scale-105 transition-transform duration-300 cursor-pointer"
                        />
                      </Link>

                      <h3 className="text-[#4b2e2e] uppercase text-xs font-semibold tracking-widest">
                        {poem?.category}
                      </h3>

                      <Link
                        href={`/poetry/${poem.slug}`}
                        className="text-2xl font-bold text-gray-800 mt-2 block hover:text-[#4b2e2e] transition-colors duration-300"
                      >
                        {poem?.title}
                      </Link>

                      <div className="text-sm text-slate-500 mt-1">
                        {poem?.date} &bull; {poem?.writerName}
                      </div>

                      {/* Delete Favorite Button */}
                      <button
                        onClick={() => handleDeleteFavorite(poem._id)}
                        disabled={deletingId === poem._id}
                        className="absolute top-4 right-4 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold py-1 px-3 rounded transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label={`Remove ${poem.title} from favorites`}
                      >
                        {deletingId === poem._id ? "Removing..." : "Remove"}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FavoritePoems;
