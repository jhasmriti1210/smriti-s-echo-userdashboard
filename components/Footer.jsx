"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { AiFillYoutube } from "react-icons/ai";
import { base_api_url } from "../config/Config";

const Footer = () => {
  const [status, setStatus] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState("");
  const [privacyError, setPrivacyError] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [privacyChecked, setPrivacyChecked] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const response = await fetch(`${base_api_url}/api/send-query`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("Your message has been sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus(`Error: ${data.message}`);
      }
    } catch (error) {
      setStatus("Error: Could not send the message.");
    }

    setTimeout(() => {
      setStatus("");
    }, 5000);
  };

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();

    if (!privacyChecked) {
      setPrivacyError(true);
      return;
    }

    setPrivacyError(false);
    setNewsletterStatus("Subscribing...");

    try {
      const response = await fetch(`${base_api_url}/api/subscribe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: newsletterEmail }),
      });

      const data = await response.json();

      if (response.ok) {
        setNewsletterStatus("Subscribed successfully!");
        setNewsletterEmail("");
        setPrivacyChecked(false);
      } else {
        setNewsletterStatus(`Error: ${data.message}`);
      }
    } catch (error) {
      setNewsletterStatus("Error: Could not subscribe.");
    }

    setTimeout(() => {
      setNewsletterStatus("");
    }, 5000);
  };

  return (
    <div className="w-full">
      {/* Newsletter Section */}
      <div className="bg-green-900">
        <div className="px-4 md:px-8 py-10 flex flex-col items-center text-center">
          <h2 className="text-white text-xl font-bold uppercase mb-2">
            Subscribe to Smriti's Newsletter
          </h2>
          <p className="text-gray-100 mb-4 max-w-2xl">
            Subscribe to Smriti's Newsletter to get all the latest updates!
          </p>
          <form
            onSubmit={handleNewsletterSubmit}
            className="w-full max-w-2xl flex flex-col sm:flex-row items-center gap-3"
          >
            <input
              type="email"
              placeholder="Your E-MAIL HERE"
              className="px-4 py-2 rounded-md outline-none w-full sm:flex-1 text-black bg-white"
              required
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
            />
            <button
              type="submit"
              className="bg-sky-500 hover:bg-sky-600 text-white font-semibold px-6 py-2 rounded-md"
            >
              SUBSCRIBE
            </button>
          </form>
          <div className="flex items-center mt-4">
            <input
              type="checkbox"
              id="privacy"
              className="mr-2"
              onChange={() => setPrivacyChecked(!privacyChecked)}
              checked={privacyChecked}
            />
            <label htmlFor="privacy" className="text-white text-sm">
              I have read and agree to the{" "}
              <Link
                href="/privacy-policy"
                className="text-sky-400 hover:underline"
              >
                Privacy Policy
              </Link>
            </label>
          </div>
          {privacyError && (
            <p className="text-red-500 text-sm mt-1">
              Please check the privacy policy agreement before subscribing.
            </p>
          )}
          {newsletterStatus && (
            <p className="mt-4 text-white">{newsletterStatus}</p>
          )}
        </div>
      </div>

      {/* Notification */}
      {status && (
        <div className="fixed top-0 left-0 right-0 bg-green-500 text-white py-3 px-4 text-center shadow-lg z-50">
          <p>{status}</p>
        </div>
      )}

      {/* Content Section */}
      <div className="bg-green-100 flex justify-center py-10">
        <div className="px-4 md:px-8 w-full max-w-screen-lg flex flex-col md:flex-row justify-between gap-12">
          {/* Quick Links */}
          <div className="w-full">
            <div className="flex mb-4">
              <img
                src="/assets/logo.png" // Replace with the actual path to your logo
                alt="Logo"
                className="h-28" // Adjust the height as needed
              />
            </div>
            <h2 className="text-black font-bold font-serif text-lg">
              Quick Links
            </h2>
            <ul className="text-black mt-2 space-y-2">
              <li>
                <Link href="/submit-poetry" className="hover:underline">
                  Submit Poetry
                </Link>
              </li>
              <li>
                <Link href="/dictionary" className="hover:underline">
                  Dictionary
                </Link>
              </li>
              <li>
                <Link href="/submit-poetry" className="hover:underline">
                  Smriti's Muse
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Socials */}
          <div className="w-full">
            <h2 className="text-black font-bold font-serif text-lg">
              Contact Us
            </h2>
            <p className="text-black mt-2">
              For inquiries, reach out via form or email:{" "}
              <a
                href="mailto:smritipoetry@gmail.com"
                className="text-blue-600 hover:underline"
              >
                smritipoetry@gmail.com
              </a>
            </p>
            <h3 className="text-black font-bold font-serif text-lg mt-6">
              Follow Us
            </h3>
            <div className="flex gap-2 mt-2">
              <a
                className="w-[37px] h-[35px] text-white flex justify-center items-center bg-black"
                href="https://instagram.com/sjhapoetry"
              >
                <FaInstagram />
              </a>
              <a
                className="w-[37px] h-[35px] text-white flex justify-center items-center bg-black"
                href="https://www.linkedin.com/in/smriti-jha-a1210s"
              >
                <FaLinkedinIn />
              </a>
              <a
                className="w-[37px] h-[35px] text-white flex justify-center items-center bg-black"
                href="https://www.youtube.com/@sjhapoetry"
              >
                <AiFillYoutube />
              </a>
            </div>
          </div>

          {/* Query Form */}
          <div className="w-full">
            <h2 className="text-black font-bold font-serif text-lg">
              Send Us a Query
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4 mt-2">
              <div className="flex gap-4">
                <div className="w-1/2">
                  <label htmlFor="name" className="block text-black">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="w-1/2">
                  <label htmlFor="email" className="block text-black">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-black">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  placeholder="Enter your query"
                  rows="4"
                  value={formData.message}
                  onChange={handleInputChange}
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="bg-green-900">
        <div className="px-4 md:px-8 py-5 flex flex-col md:flex-row gap-3 justify-between items-center">
          <div className="text-white text-sm">
            &copy; {new Date().getFullYear()} <Link href="#">Smriti Jha</Link>
          </div>
          <div className="flex gap-x-[4px]">
            <a
              className=" text-white flex justify-center items-center "
              href="/privacy-policy"
            >
              Privacy Policy
            </a>
          </div>
          <div className="flex gap-x-[4px]">
            <a
              className="w-[37px] h-[35px] text-white flex justify-center items-center bg-[#ffffff2b]"
              href="https://instagram.com/sjhapoetry"
            >
              <FaInstagram />
            </a>
            <a
              className="w-[37px] h-[35px] text-white flex justify-center items-center bg-[#ffffff2b]"
              href="https://www.linkedin.com/in/smriti-jha-a1210s"
            >
              <FaLinkedinIn />
            </a>
            <a
              className="w-[37px] h-[35px] text-white flex justify-center items-center bg-[#ffffff2b]"
              href="https://www.youtube.com/@sjhapoetry"
            >
              <AiFillYoutube />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
