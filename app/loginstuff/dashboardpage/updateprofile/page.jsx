"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/dashboardsidebar";
import Footer from "@/components/Footer";

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    profilePicture: null,
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      if (typeof window === "undefined") return;

      const token = localStorage.getItem("authToken");

      if (!token) {
        setMessage("⚠️ No token found. Please log in again.");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch("http://localhost:5000/api/user-profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (data.success) {
          setUser(data.data);
          setFormData((prev) => ({
            ...prev,
            fullName: data.data?.fullName || "User",
            email: data.data?.email || "",
            profilePicture: data.data?.profilePicture || null,
          }));
        } else {
          setMessage("❌ Failed to load profile");
        }
      } catch (err) {
        console.error("Error loading profile:", err);
        setMessage("❌ Server error");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profilePicture") {
      setFormData({ ...formData, profilePicture: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Updating...");

    const token = localStorage.getItem("authToken");
    if (!token) {
      setMessage("❌ No token found. Please log in again.");
      return;
    }

    const form = new FormData();
    form.append("fullName", formData.fullName);
    form.append("email", formData.email);
    if (formData.password) form.append("password", formData.password);
    if (formData.profilePicture)
      form.append("profilePicture", formData.profilePicture);

    try {
      const res = await fetch("http://localhost:5000/api/update-profile", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: form,
      });

      const data = await res.json();
      if (data.success) {
        setMessage("✅ Profile updated successfully!");
        setUser(data.data);
        setFormData((prev) => ({ ...prev, password: "" }));
      } else {
        setMessage(`❌ ${data.message}`);
      }
    } catch (err) {
      console.error("Update error:", err);
      setMessage("❌ Error updating profile");
    }
  };

  if (loading) return <p className="p-8 text-center">Loading...</p>;

  return (
    <>
      <div className="flex min-h-screen mt-24 bg-gray-100">
        <aside className="w-full md:w-1/4 lg:w-1/5  h-full ">
          <Sidebar />
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 bg-gray-100">
          <h1 className="text-3xl font-bold text-center mb-8">Dashboard</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* LEFT: Profile Info */}
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-center mb-4 mt-6">
                {user?.profilePicture && (
                  <img
                    src={user.profilePicture}
                    alt="Profile"
                    className="w-32 h-32 rounded-full border-amber-950 object-cover shadow"
                  />
                )}
              </div>
              <p className="text-center text-lg">
                <strong>Name:</strong> {user?.fullName}
              </p>
              <p className="text-center text-lg">
                <strong>Email:</strong> {user?.email}
              </p>
            </div>

            {/* RIGHT: Update Form */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4 text-center">
                Update Profile
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="w-full border rounded px-4 py-2"
                />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="w-full border rounded px-4 py-2"
                />

                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="New Password (optional)"
                  className="w-full border rounded px-4 py-2"
                />

                <input
                  type="file"
                  name="profilePicture"
                  accept="image/*"
                  onChange={handleChange}
                  className="w-full"
                />

                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full"
                >
                  Update Profile
                </button>
              </form>

              {message && (
                <p className="text-center text-sm text-gray-700 mt-2">
                  {message}
                </p>
              )}
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
