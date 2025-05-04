"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import moment from "moment";
import { UserCircleIcon } from "@heroicons/react/solid";
import Image from "next/image";
import Header_Category from "./Header_Category";

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();
  const [dateTime, setDateTime] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      console.log("User loaded from localStorage:", user);
      setIsAuthenticated(true);
      setUserName(user.fullName || user.name || "User");
      setUserEmail(user.email);

      setProfilePicture(user.profilePicture || "");
      console.log(user.profilePicture);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setUserName("");
    setUserEmail("");
    setProfilePicture(""); // Clear profile picture
    setDropdownOpen(false);
  };

  const handleProtectedRoute = (path) => {
    if (isAuthenticated) {
      router.push(path);
    } else {
      router.push("/auth");
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    setDateTime(moment().format("LLLL"));
  }, []);

  return (
    <div>
      <div className="flex flex-col lg:flex-row justify-between items-center px-5 lg:px-8 bg-green-800 text-white">
        {dateTime && (
          <span className="text-[13px] font-medium">{dateTime}</span>
        )}

        <div>
          <button
            onClick={() => handleProtectedRoute("/submit-poetry")}
            className="text-white px-4 py-1.5 text-xs md:text-sm font-semibold rounded-full shadow hover:bg-green-700 hover:text-white transition"
          >
            Submit Your Poetry
          </button>

          <button
            onClick={() => handleProtectedRoute("/dictionary")}
            className="text-white px-4 py-1.5 text-xs md:text-sm font-semibold rounded-full shadow hover:bg-green-700 hover:text-white transition"
          >
            Dictionary
          </button>

          <button
            onClick={() => handleProtectedRoute("/smritis-muse")}
            className="text-white px-4 py-1.5 text-xs md:text-sm font-semibold rounded-full shadow hover:bg-green-700 hover:text-white transition"
          >
            Smriti's Muse
          </button>
        </div>

        <div className="flex gap-x-2 items-center">
          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="rounded-full p-1 focus:outline-none"
              >
                {profilePicture ? (
                  <Image
                    src={profilePicture}
                    alt="Profile"
                    width={40}
                    height={40}
                    className="rounded-full object-cover border-2 border-white"
                    priority
                  />
                ) : (
                  <UserCircleIcon className="w-10 h-10 text-white" />
                )}
              </button>

              {/* Dropdown */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg py-2 w-56 z-50">
                  <div className="px-4 py-2 text-sm font-semibold">
                    <span className="text-black font-bold">Name: </span>
                    <span className="text-gray-500">{userName}</span>
                  </div>
                  <div className="px-4 py-2 text-sm font-semibold">
                    <span className="text-black font-bold">Email: </span>
                    <span className="text-gray-500">{userEmail}</span>
                  </div>

                  <div className="flex justify-center mt-2">
                    <button
                      onClick={handleLogout}
                      className="w-52 text-sm text-white text-center bg-red-600 px-6 py-2 rounded-b-lg border border-transparent hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <a
              href="/auth"
              className="text-white px-4 py-1.5 text-xs md:text-sm font-semibold rounded-full shadow hover:bg-green-700 hover:text-white transition"
            >
              Login
            </a>
          )}
        </div>
      </div>

      {/* Header Background */}
      <div
        style={{
          backgroundImage: `url(/assets/headerbg.png)`,
          backgroundSize: "cover",
        }}
      >
        <div className="px-8 py-14">
          <div className="flex justify-center items-center flex-wrap">
            <div className="md:w-8/12 w-full hidden md:block">
              <div className="w-full flex justify-end mb-[6rem]"></div>
            </div>
          </div>
        </div>
      </div>

      <Header_Category />
    </div>
  );
};

export default Header;
