"use client";

import React, { useState, useEffect } from "react";
import { base_api_url } from "../../config/Config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { useRouter } from "next/navigation";

const RatingSection = ({ poetryId, initialRating, userRating }) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasRated, setHasRated] = useState(false);
  const router = useRouter();

  // Check if the user is authenticated
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("authToken");
      if (token) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }

      if (userRating) {
        setHasRated(true);
      }
    }
  }, [userRating]);

  // Handle rating submission
  const handleRatingSubmit = async () => {
    if (!isAuthenticated) {
      alert("Please log in to submit a rating.");
      return;
    }

    if (hasRated) {
      alert("You have already submitted a rating.");
      return;
    }

    if (rating === 0) {
      alert("Please select a rating before submitting.");
      return;
    }

    try {
      const res = await fetch(`${base_api_url}/api/add-rating/${poetryId}`, {
        method: "POST",
        body: JSON.stringify({ star: rating }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            typeof window !== "undefined"
              ? localStorage.getItem("authToken")
              : ""
          }`, // Safe access
        },
      });

      const data = await res.json();
      if (data.message === "Rating added successfully") {
        setHasRated(true); // Mark that the user has rated
        alert("Thank you for your rating!");
      } else {
        alert("There was an error while submitting your rating.");
      }
    } catch (error) {
      console.error("Error submitting rating:", error);
      alert("Something went wrong while submitting your rating.");
    }
  };

  return (
    <div className="w-full pb-8 mt-5">
      <div className="flex flex-col w-full gap-y-[14px]">
        <h2 className="text-xl font-bold text-gray-700">Rate this Poetry</h2>

        {/* Star rating display */}
        <div className="flex items-center space-x-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <div
              key={star}
              className={`cursor-pointer text-2xl transition-colors duration-200 ease-in-out ${
                star <= (hoveredRating > 0 ? hoveredRating : rating)
                  ? "text-yellow-500"
                  : "text-gray-300"
              }`}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoveredRating(star)}
              onMouseLeave={() => setHoveredRating(0)}
            >
              <FontAwesomeIcon
                icon={
                  star <= (hoveredRating > 0 ? hoveredRating : rating)
                    ? solidStar
                    : regularStar
                }
              />
            </div>
          ))}
        </div>

        <button
          onClick={handleRatingSubmit}
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md disabled:opacity-50"
          disabled={rating === 0 || hasRated} // Disable the button if already rated or no rating
        >
          {hasRated ? "Rating Submitted" : "Submit Rating"}
        </button>

        <div className="mt-2 text-sm text-gray-600">
          Average Rating: {initialRating || "N/A"}
        </div>
      </div>
    </div>
  );
};

export default RatingSection;
