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
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Add space for top nav on small screens if needed */}
      <div className="h-16 md:h-0"></div>

      <div className="flex flex-col md:flex-row flex-1 w-full">
        {/* Sidebar */}
        <aside className="w-full md:w-1/4 lg:w-1/5">
          <Sidebar />
        </aside>

        {/* Main Content */}
        <main className="flex-1 px-4 sm:px-6 md:px-8 py-6 md:mt-28">
          <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 ">
            Your Profile
          </h1>

          <div className="grid grid-cols-1 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-center mb-4">
                {user?.profilePicture && (
                  <img
                    src={user.profilePicture}
                    alt="Profile"
                    className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border border-amber-950 object-cover shadow"
                  />
                )}
              </div>
              <p className="text-center text-base sm:text-lg">
                <strong>Name:</strong> {user?.name}
              </p>
              <p className="text-center text-base sm:text-lg">
                <strong>Email:</strong> {user?.email}
              </p>
            </div>
          </div>
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Dashboard;
