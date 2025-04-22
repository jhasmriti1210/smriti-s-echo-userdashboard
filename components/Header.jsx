import React from "react";
import moment from "moment";
import { FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { AiFillYoutube } from "react-icons/ai";

import Header_Category from "./Header_Category";

const Header = () => {
  return (
    <div>
      <div className="px-5 lg:px-8 flex justify-between items-center bg-green-800 text-white">
        <span className="text-[13px] font-medium">
          {moment().format("LLLL")}
        </span>
        <div className="flex gap-x-[1px]">
          <a
            className="w-[37px] h-[35px] flex justify-center items-center bg-[#ffffff2b]"
            href="https://instagram.com/sjhapoetry"
          >
            <FaInstagram />
          </a>
          <a
            className="w-[37px] h-[35px] flex justify-center items-center bg-[#ffffff2b]"
            href="https://www.linkedin.com/in/smriti-jha-a1210s"
          >
            <FaLinkedinIn />
          </a>
          <a
            className="w-[37px] h-[35px] flex justify-center items-center bg-[#ffffff2b]"
            href="https://www.youtube.com/@sjhapoetry"
          >
            <AiFillYoutube />
          </a>
        </div>
      </div>
      <div
        style={{
          backgroundImage: `url(/assets/headerbg.png)`, // Path updated to reflect the 'public/assets' folder
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
