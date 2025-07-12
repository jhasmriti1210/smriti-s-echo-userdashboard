"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Footer from "@/components/Footer";
import Sidebar from "@/components/dashboardsidebar";

const Dashboard = () => {
  const router = useRouter();
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
      {/* Main Layout */}
      <div className="flex flex-1 ">
        {/* Sidebar */}
        <aside className="hidden md:block md:w-1/4 lg:w-1/5">
          <Sidebar />
        </aside>

        {/* Main Content */}
        <main className="w-full md:w-3/4 lg:w-4/5 p-6">
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
