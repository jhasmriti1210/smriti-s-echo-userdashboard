"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { base_api_url } from "@/config/Config";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (isLogin) {
      try {
        const response = await fetch(`${base_api_url}/api/user-login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        if (data.success) {
          setSuccessMessage("Login successful!");
          // 👇 Save user info to localStorage
          const userData = {
            name: data.data?.user?.fullName || "User",
            email: data.data?.user?.email || email,
          };

          localStorage.setItem("user", JSON.stringify(userData));
          // 👇 ADD THIS LINE to save token
          localStorage.setItem("authToken", data.token);

          router.push("/");
        } else {
          setErrorMessage(data.message || "Login failed. Please try again.");
        }
      } catch (error) {
        setErrorMessage("Error logging in: " + error.message);
      }
    } else {
      if (password !== confirmPassword) {
        setErrorMessage("Passwords do not match.");
        return;
      }

      try {
        const checkResponse = await fetch(`${base_api_url}/api/check-user`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });

        const checkData = await checkResponse.json();

        if (checkData.exists) {
          setErrorMessage("User already exists! Please try logging in.");
          return;
        }

        const signupResponse = await fetch(`${base_api_url}/api/user-signup`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ fullName, email, password }),
        });

        const data = await signupResponse.json();
        if (data.success) {
          setSuccessMessage(
            "Account created successfully! Redirecting to login..."
          );
          setTimeout(() => {
            setIsLogin(true);
            setFullName("");
            setPassword("");
            setConfirmPassword("");
            setSuccessMessage("");
          }, 1500);
        } else {
          setErrorMessage(data.message || "Signup failed. Please try again.");
        }
      } catch (error) {
        setErrorMessage("Error signing up: " + error.message);
      }
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${base_api_url}/auth/google`;
  };

  {
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 to-green-600">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        {/* Logo added here */}
        <div className="flex justify-center mb-6">
          <img
            src="logo.png" // Replace with your logo's path
            alt="Smriti's Echoes Logo"
            className="h-32" // You can adjust the height of the logo here
          />
        </div>
        <h2 className="text-2xl font-bold mb-6 text-center text-green-800">
          {isLogin ? "Login to your Account" : "Create an Account"}
        </h2>

        {errorMessage && (
          <div className="text-red-500 text-center mb-4">{errorMessage}</div>
        )}
        {successMessage && (
          <div className="text-green-600 text-center mb-4">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          {/* Password Input */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 cursor-pointer text-green-900"
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>

          {/* Confirm Password for Signup */}
          {!isLogin && (
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <span
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-3 cursor-pointer text-green-900"
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </span>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-green-800 text-white py-2 rounded-md hover:bg-green-700 transition duration-300"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        {/* --- GOOGLE LOGIN BUTTON --- */}
        <div className="mt-6 flex flex-col items-center">
          <p className="text-gray-500 mb-2">or continue with</p>
          <button
            onClick={handleGoogleLogin}
            className="flex items-center justify-center gap-2 bg-blue-800  text-white px-4 py-2 rounded-md transition duration-300"
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 533.5 544.3"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M533.5 278.4c0-17.7-1.5-35-4.3-51.6H272v97.6h146.9c-6.4 34.5-25.5 63.7-54.5 83.2v68h88c51.5-47.5 80.6-117.5 80.6-197.2z"
                fill="#4285f4"
              />
              <path
                d="M272 544.3c73.7 0 135.6-24.5 180.8-66.7l-88-68c-24.5 16.5-55.7 26.1-92.7 26.1-71 0-131.2-47.9-152.7-112.3H29.5v70.6C74.2 475.5 165.6 544.3 272 544.3z"
                fill="#34a853"
              />
              <path
                d="M119.3 323.4c-10.1-29.5-10.1-61.2 0-90.7v-70.7H29.5c-41.8 82.7-41.8 179.3 0 262z"
                fill="#fbbc04"
              />
              <path
                d="M272 107.7c39.9 0 75.8 13.7 104.1 40.7l78.1-78.1C407.7 24.8 345.8 0 272 0 165.6 0 74.2 68.8 29.5 172.6l89.8 70.6C140.8 155.6 201 107.7 272 107.7z"
                fill="#ea4335"
              />
            </svg>
            Login with Google
          </button>
        </div>

        <p className="text-center mt-4 text-sm text-gray-600">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span
            className="text-blue-700 cursor-pointer hover:underline"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Sign up" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Auth;
