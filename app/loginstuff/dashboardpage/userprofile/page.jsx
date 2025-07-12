"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Footer from "@/components/Footer";
import Sidebar from "@/components/dashboardsidebar"; // Add your sidebar here

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
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex flex-1 mt-24">
        <aside className="w-full md:w-1/4 lg:w-1/5 h-full">
          <Sidebar />
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 bg-gray-100">
          <h1 className="text-3xl font-bold text-center mb-8">Dashboard</h1>

          <div className="grid grid-cols-1 gap-8">
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
                <strong>Name:</strong> {user?.name}
              </p>
              <p className="text-center text-lg">
                <strong>Email:</strong> {user?.email}
              </p>
            </div>
          </div>
        </main>
      </div>

      {/* Footer sticks at bottom */}
      <Footer />
    </div>
  );
};

export default Dashboard;
