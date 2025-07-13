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

  // Check if the user is authenticated and if they've already rated
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("authToken");
      const hasUserRated = localStorage.getItem(`hasRated-${poetryId}`);
      const savedRating = localStorage.getItem(`rating-${poetryId}`);

      if (token) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }

      // If the user is logged in and has already rated, display the rating
      if (hasUserRated === "true" && savedRating) {
        setHasRated(true); // User has rated, prevent further rating
        setRating(savedRating); // Retrieve and set the previously submitted rating
      } else {
        setHasRated(false); // Reset hasRated if not rated
        setRating(0); // Reset rating if not rated
      }

      if (userRating) {
        setRating(userRating); // Set the initial rating if it's provided
      }
    }
  }, [userRating, poetryId]);

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
          }`,
        },
      });

      const data = await res.json();
      if (data.message === "Rating added successfully") {
        localStorage.setItem(`hasRated-${poetryId}`, "true"); // Mark as rated in localStorage
        localStorage.setItem(`rating-${poetryId}`, rating); // Save the submitted rating
        setHasRated(true); // Update the state to reflect the rating has been submitted
        alert("Thank you for your rating!");
      } else {
        alert("There was an error while submitting your rating.");
      }
    } catch (error) {
      console.error("Error submitting rating:", error);
      alert("Something went wrong while submitting your rating.");
    }
  };

  // Clear rating information from localStorage on logout
  const clearRatingData = () => {
    localStorage.removeItem(`hasRated-${poetryId}`);
    localStorage.removeItem(`rating-${poetryId}`);
  };

  // Add a logout handler that will call `clearRatingData` to clear rating data
  const handleLogout = () => {
    // Clear rating data when the user logs out
    clearRatingData();
    // Perform other logout operations (e.g., removing auth token, redirecting)
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
    setHasRated(false); // Reset state to reflect that the user has not rated
    setRating(0); // Reset the rating state to 0
    router.push("/login"); // Redirect user to login page
  };

  return (
    <div className="w-full pb-8 mt-5">
      <div className="flex flex-col w-full gap-y-[14px]">
        {/* <h2 className="text-xl font-bold text-white">Rate this Poetry</h2> */}

        {/* Star rating display */}
        <div className="flex items-center space-x-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <div
              key={star}
              className={`cursor-pointer text-2xl transition-colors duration-200 ease-in-out ${
                star <= (hoveredRating > 0 ? hoveredRating : rating)
                  ? "text-yellow-500"
                  : "text-gray-600"
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

        {/* Submit Rating Button */}
        <button
          onClick={handleRatingSubmit}
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md disabled:opacity-50"
          disabled={rating === 0 || hasRated} // Disable the button if already rated or no rating
        >
          {hasRated ? "Rating Submitted" : "Submit Rating"}
        </button>

        {/* Display message if user already rated */}
        {hasRated && (
          <div className="mt-2 text-sm text-green-800">
            You have already submitted a rating of {rating} stars.
          </div>
        )}

        {/* Show login message if not authenticated */}
        {!isAuthenticated && !hasRated && (
          <div className="mt-2 text-sm text-red-500">
            You need to log in to submit a rating.
          </div>
        )}
      </div>
    </div>
  );
};

export default RatingSection;
