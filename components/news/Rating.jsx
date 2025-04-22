"use client";

import React, { useState } from "react";
import { base_api_url } from "../../config/Config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";

const RatingSection = ({ newsId, initialRating }) => {
  const [rating, setRating] = useState(0); // No rating selected initially
  const [hoveredRating, setHoveredRating] = useState(0); // For hover visual feedback

  // Handle rating submission
  const handleRatingSubmit = async () => {
    if (rating === 0) {
      alert("Please select a rating before submitting.");
      return;
    }

    try {
      const res = await fetch(`${base_api_url}/api/add-rating/${newsId}`, {
        method: "POST",
        body: JSON.stringify({ star: rating }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      if (data.message === "Rating added successfully") {
        alert("Thank you for your rating!");
      } else {
        alert("There was an error while submitting your rating.");
      }
    } catch (error) {
      console.error("Error submitting rating:", error);
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
          disabled={rating === 0}
        >
          Submit Rating
        </button>

        <div className="mt-2 text-sm text-gray-600">
          Average Rating: {initialRating || "N/A"}
        </div>
      </div>
    </div>
  );
};

export default RatingSection;
