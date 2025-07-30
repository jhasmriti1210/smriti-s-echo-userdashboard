import React, { useState, useEffect } from "react";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { base_api_url } from "@/config/Config";
import { toast } from "react-hot-toast";

const LikeButton = ({ poetryId, initialLikesCount, isInitiallyLiked }) => {
  const [likesCount, setLikesCount] = useState(initialLikesCount || 0);
  const [isLiked, setIsLiked] = useState(isInitiallyLiked || false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setIsLiked(isInitiallyLiked || false);
    setLikesCount(initialLikesCount || 0);
  }, [isInitiallyLiked, initialLikesCount]);

  const handleTokenError = () => {
    // Clear invalid token
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    toast.error("Please login again to continue");
    // You can also redirect to login page if needed
    window.location.href = "/loginstuff/auth";
  };

  const handleToggleLike = async () => {
    if (loading) return;

    const token = localStorage.getItem("authToken");
    if (!token) {
      toast.error("Please login to like poems");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${base_api_url}/api/poetry/like/${poetryId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        // Handle unauthorized or token expired
        if (res.status === 401) {
          handleTokenError();
          return;
        }
        throw new Error("Failed to update like");
      }

      const data = await res.json();

      // Check if we have a valid response
      if (data && typeof data.isLiked === "boolean") {
        // Update state with new values
        setIsLiked(data.isLiked);
        setLikesCount(data.likesCount || 0);

        // Show success message
        toast.success(data.isLiked ? "Added to likes" : "Removed from likes");

        // Update other components/tabs
        localStorage.setItem("likesUpdated", Date.now().toString());
        window.dispatchEvent(
          new StorageEvent("storage", {
            key: "likesUpdated",
            newValue: Date.now().toString(),
          })
        );
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      // Only log actual errors
      if (
        error.message !== "Poetry liked" &&
        error.message !== "Poetry unliked"
      ) {
        console.error("Failed to update like:", error.message);
      }

      // Handle different error cases
      if (error.message === "Invalid or expired token") {
        handleTokenError();
      } else if (error.message === "Invalid response from server") {
        toast.error("Something went wrong. Please try again.");
      } else {
        // Don't show error toast for successful actions
        if (
          error.message !== "Poetry liked" &&
          error.message !== "Poetry unliked"
        ) {
          toast.error("Failed to update like. Please try again.");
        }
      }

      // Reset states only on actual errors
      if (
        error.message !== "Poetry liked" &&
        error.message !== "Poetry unliked"
      ) {
        setIsLiked(isInitiallyLiked);
        setLikesCount(initialLikesCount);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`flex items-center gap-2 ${
        loading ? "opacity-50" : "cursor-pointer"
      }`}
      onClick={loading ? undefined : handleToggleLike}
      title={
        loading ? "Processing..." : isLiked ? "Remove like" : "Like this poem"
      }
    >
      <FontAwesomeIcon
        icon={isLiked ? solidHeart : regularHeart}
        className={`text-xl transition-colors ${
          isLiked
            ? "text-red-500 animate-pulse"
            : "text-gray-500 hover:text-red-400"
        }`}
      />
      <span className="text-gray-700">{likesCount}</span>
    </div>
  );
};

export default LikeButton;
