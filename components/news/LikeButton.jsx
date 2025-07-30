import React, { useState, useEffect } from "react";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { base_api_url } from "@/config/Config";
import { toast } from "react-hot-toast";

const LikeButton = ({ poetryId, initialLikesCount, isInitiallyLiked }) => {
  const [likesCount, setLikesCount] = useState(initialLikesCount || 0);
  const [isLiked, setIsLiked] = useState(isInitiallyLiked || false);
  const [loading, setLoading] = useState(false);
  const [initialized, setInitialized] = useState(false);

  // Check like status from server on mount
  useEffect(() => {
    const checkLikeStatus = async () => {
      const token = localStorage.getItem("authToken");
      const userId = localStorage.getItem("userId");
      if (!token || !userId) {
        setIsLiked(false);
        setInitialized(true);
        return;
      }

      try {
        const res = await fetch(`${base_api_url}/api/check-like/${poetryId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.ok) {
          const data = await res.json();
          setIsLiked(data.isLiked);
          if (data.likesCount !== undefined) {
            setLikesCount(data.likesCount);
          }
        }
      } catch (error) {
        console.error("Error checking like status:", error);
        // Fallback to props if server check fails
        setIsLiked(isInitiallyLiked || false);
      } finally {
        setInitialized(true);
      }
    };

    checkLikeStatus();
  }, [poetryId, isInitiallyLiked]);

  const handleToggleLike = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      toast.error("Please login to like poems");
      return;
    }

    if (loading) return;
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
        if (res.status === 401) {
          localStorage.removeItem("authToken");
          localStorage.removeItem("user");
          toast.error("Please login again to continue");
          window.location.href = "/loginstuff/auth";
          return;
        }
        throw new Error("Failed to update like");
      }

      const data = await res.json();
      setIsLiked(data.isLiked);
      setLikesCount(data.likesCount);

      // Show success message
      toast.success(data.isLiked ? "Added to likes" : "Removed from likes");
    } catch (error) {
      console.error("Error toggling like:", error);
      toast.error("Failed to update like. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`flex items-center gap-2 ${
        !initialized || loading ? "opacity-50" : "cursor-pointer"
      }`}
      onClick={!initialized || loading ? undefined : handleToggleLike}
      title={
        !initialized
          ? "Loading..."
          : loading
          ? "Processing..."
          : isLiked
          ? "Unlike"
          : "Like this poem"
      }
    >
      <FontAwesomeIcon
        icon={isLiked ? solidHeart : regularHeart}
        className={`text-2xl transition-all duration-300 transform ${
          isLiked
            ? "text-red-500 scale-110"
            : "text-gray-500 hover:text-red-400 hover:scale-110"
        }`}
        style={{ opacity: initialized ? 1 : 0.5 }}
      />
      <span
        className={`font-medium ${isLiked ? "text-red-500" : "text-gray-800"}`}
      >
        {likesCount}
      </span>
    </div>
  );
};

export default LikeButton;
