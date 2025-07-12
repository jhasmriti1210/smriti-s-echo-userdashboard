"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { UserCircleIcon } from "@heroicons/react/solid";
import Image from "next/image";
import { base_api_url } from "../config/Config";
import Link from "next/link";
import { useAuth } from "../context/authContext";

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [scrolled, setScrolled] = useState(false);

  const isAuthenticated = !!user;

  // Scroll effect for homepage
  useEffect(() => {
    if (pathname === "/") {
      const handleScroll = () => setScrolled(window.scrollY > 50);
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [pathname]);

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${base_api_url}/api/category/all`);
        const data = await res.json();
        if (res.ok) setCategories(data.categories);
        else console.error("Failed to load categories:", data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleProtectedRoute = (path) => {
    isAuthenticated ? router.push(path) : router.push("/loginstuff/auth");
  };

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    router.push("/");
  };

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);
  const toggleCategoryDropdown = () => setCategoryDropdownOpen((prev) => !prev);

  const isHome = pathname === "/";
  const headerBg = isHome
    ? scrolled
      ? "bg-[#8C4F38]"
      : "bg-transparent"
    : "bg-[#8C4F38]";

  return (
    <div
      className={`${headerBg} fixed top-0 w-full z-50 transition-colors duration-300`}
    >
      <div className="flex flex-col lg:flex-row justify-between items-center px-5 lg:px-8 text-white py-6">
        {/* Logo */}
        <div className="text-xs lg:text-sm font-medium lg:mb-0 ml-10">
          <a href="/">
            <img src="/name.png" className="w-32 h-auto" alt="Smriti Jha" />
          </a>
        </div>

        {/* Navigation */}
        <div className="flex gap-2 flex-wrap justify-center relative">
          <button className="px-4 text-sm md:text-base font-medium hover:underline transition">
            <Link href="/poetry/allpoetry">My Poetry</Link>
          </button>

          <button
            onClick={() => handleProtectedRoute("/submit-poetry")}
            className="px-4 text-sm md:text-base font-medium hover:underline transition"
          >
            Submit Your Poetry
          </button>

          <button
            onClick={() => handleProtectedRoute("/otherstuffs/dictionary")}
            className="px-4 py-1.5 text-sm md:text-base font-medium hover:underline transition"
          >
            Dictionary
          </button>

          {/* Category Dropdown */}
          <div className="relative">
            <button
              onClick={toggleCategoryDropdown}
              className="px-4 py-1.5 text-sm md:text-base font-medium hover:underline transition"
            >
              Categories
            </button>
            {categoryDropdownOpen && (
              <div className="absolute top-12 left-0 bg-white text-black z-50 min-w-[200px] max-h-[300px] overflow-y-auto">
                {categories.length === 0 ? (
                  <p className="p-3 text-sm">No categories found.</p>
                ) : (
                  categories.map((cat, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        router.push(`/poetry/category/${cat.category}`);
                        setCategoryDropdownOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      {cat.category} ({cat.count})
                    </button>
                  ))
                )}
              </div>
            )}
          </div>

          <button
            onClick={() => handleProtectedRoute("/smritis-muse")}
            className="px-4 text-sm md:text-base font-medium hover:underline transition"
          >
            Smriti's Muse
          </button>

          <button className="px-4 text-sm md:text-base font-medium hover:underline transition">
            <Link href="/otherstuffs/about">About Me</Link>
          </button>
        </div>

        {/* Profile / Login */}
        <div className="relative flex items-center">
          {isAuthenticated ? (
            <button
              onClick={toggleDropdown}
              className="rounded-full p-1 focus:outline-none ml-3"
            >
              {user?.profilePicture ? (
                <Image
                  src={user.profilePicture}
                  alt="Profile"
                  width={40}
                  height={40}
                  className="rounded-full border-2 border-white object-cover"
                />
              ) : (
                <UserCircleIcon className="w-10 h-10 text-white" />
              )}
            </button>
          ) : (
            <button
              onClick={() => router.push("/loginstuff/auth")}
              className="ml-3 px-4 py-1.5 text-xs md:text-sm font-semibold rounded-full shadow hover:bg-green-700 transition"
            >
              Login
            </button>
          )}

          {/* Profile Dropdown */}
          {dropdownOpen && (
            <div className="absolute right-0 top-12 bg-white text-black shadow-lg rounded-lg py-3 w-48 z-50">
              <div className="px-4 py-2 text-center">
                <button
                  onClick={() => {
                    router.push("/loginstuff/dashboardpage");
                    setDropdownOpen(false);
                  }}
                  className="w-full text-sm text-white bg-green-700 px-4 py-2 rounded hover:bg-green-800 transition"
                >
                  Go to Dashboard
                </button>
              </div>

              <div className="px-4 py-2 text-center">
                <button
                  onClick={handleLogout}
                  className="w-full text-sm text-white bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
