// app/dashboard/page.jsx

"use client";

import { useState, useEffect } from "react";

export default function Dashboard() {
  useEffect(() => {
    async function fetchProfile() {
      const res = await fetch("/api/profile"); // Example endpoint
      const data = await res.json();
      setProfile(data);
    }

    fetchProfile();
  }, []);

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    bio: "",
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Connect this to your backend API to update user profile
    console.log("Updated Profile:", profile);
    alert("Profile Updated Successfully!");
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Update Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="name"
          value={profile.name}
          onChange={handleChange}
          placeholder="Name"
          className="border p-2 rounded"
        />
        <input
          type="email"
          name="email"
          value={profile.email}
          onChange={handleChange}
          placeholder="Email"
          className="border p-2 rounded"
        />
        <textarea
          name="bio"
          value={profile.bio}
          onChange={handleChange}
          placeholder="Bio"
          className="border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
