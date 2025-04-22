"use client";

import React, { useState } from "react";
import { base_api_url } from "../../config/Config";

const CommentSection = ({ newsId, initialComments }) => {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(initialComments);
  const [showAllComments, setShowAllComments] = useState(false);

  // Handle comment submission
  const handleCommentSubmit = async () => {
    if (!name.trim() || !comment.trim()) {
      alert("Please enter both your name and comment.");
      return;
    }

    try {
      const res = await fetch(`${base_api_url}/api/add-comment/${newsId}`, {
        method: "POST",
        body: JSON.stringify({ name, comment }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data.message === "Comment added") {
        setComments((prevComments) => [
          ...prevComments,
          { name, text: comment },
        ]);
        setName(""); // Clear the name field
        setComment(""); // Clear the comment field
        alert("Comment added successfully!");
      } else {
        alert("There was an error adding your comment.");
      }
    } catch (error) {
      console.error("Error adding comment:", error);
      alert("Error adding comment. Please try again.");
    }
  };

  // Function to toggle the display of all comments
  const toggleShowAllComments = () => {
    setShowAllComments((prev) => !prev);
  };

  // Get the first 5 comments or all if showAllComments is true
  const displayedComments = showAllComments ? comments : comments.slice(0, 2);

  return (
    <div className="w-full pb-4 mt-5">
      <div className="flex flex-col w-full gap-y-3">
        <h2 className="text-lg font-semibold text-gray-700">Comments</h2>
        <div className="space-y-3">
          {displayedComments?.map((comment, index) => (
            <div key={index} className="bg-gray-100 p-3 rounded-md">
              <p className="font-bold text-sm">{comment.name}</p>
              <p className="text-sm">{comment.text}</p>
            </div>
          ))}
        </div>

        {comments.length > 3 && !showAllComments && (
          <button
            onClick={toggleShowAllComments}
            className="text-blue-600 text-sm mt-2"
          >
            Show more comments
          </button>
        )}

        {showAllComments && comments.length > 2 && (
          <button
            onClick={toggleShowAllComments}
            className="text-blue-600 text-sm mt-2"
          >
            Show fewer comments
          </button>
        )}

        <div className="mt-3">
          {/* Name input field */}
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="w-full p-1.5 border rounded-md mb-2 text-sm"
          />

          {/* Comment textarea */}
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment..."
            rows={3}
            className="w-full p-1.5 border rounded-md mb-2 text-sm"
          />

          {/* Submit button */}
          <button
            onClick={handleCommentSubmit}
            className="w-full py-2 bg-blue-600 text-white rounded-md text-sm"
          >
            Submit Comment
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
