"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";

import Footer from "@/components/Footer";
import Sidebar from "@/components/dashboardsidebar";

const Dashboard = () => {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState({
    name: "Your Name",
    email: "you@example.com",
    profilePicture: "",
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
  }, []);

  const handleNavigate = (path) => {
    router.push(path);
  };

  return (
    <div className="mt-28 min-h-screen flex flex-col">
      {/* Topbar for small screens */}
      <div className="md:hidden px-4 mb-4">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-2xl text-gray-800"
        >
          <FaBars />
        </button>
      </div>

      {/* Main Layout */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside
          className={`fixed top-0 left-0 h-full z-50 transition-transform transform md:relative md:translate-x-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:block w-64 bg-white shadow-lg md:shadow-none`}
        >
          <Sidebar closeSidebar={() => setSidebarOpen(false)} />
        </aside>

        {/* Overlay for small screen sidebar */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="w-full md:ml-64 p-6">
          <div className="bg-white shadow-md rounded-xl p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Welcome to Dashboard
            </h1>
            <p className="text-gray-600">
              This is your personalized dashboard. Use the sidebar to update
              your profile or view your favorite poems.
            </p>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="mt-auto">
        <Footer />
      </footer>
    </div>
  );
};

export default Dashboard;
