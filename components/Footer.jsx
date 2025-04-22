import React from "react";
import Image from "next/legacy/image";
import logo from "../assets/logo.png";
import Link from "next/link";
import Category from "./Category";
import { FaFacebookF } from "react-icons/fa";
import { AiFillYoutube, AiOutlineTwitter } from "react-icons/ai";

const Footer = () => {
  return (
    <div className="w-full">
      <div className="bg-green-900">
        <div className="px-4 md:px-8 py-5 flex flex-col md:flex-row gap-3 justify-between items-center">
          <div className="flex gap-y-2 text-white justify-start items-center">
            <span>Copyright © {new Date().getFullYear()}</span>
            <Link href={"#"} className="ml-3">
              Smriti Jha
            </Link>
          </div>
          <div className="flex gap-x-[4px]">
            <a
              className="w-[37px] h-[35px] text-white flex justify-center items-center bg-[#ffffff2b]"
              href="#"
            >
              <FaFacebookF />
            </a>
            <a
              className="w-[37px] text-white h-[35px] flex justify-center items-center bg-[#ffffff2b]"
              href="#"
            >
              <AiOutlineTwitter />
            </a>
            <a
              className="w-[37px] text-white h-[35px] flex justify-center items-center bg-[#ffffff2b]"
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
