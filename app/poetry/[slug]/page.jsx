import Breadcrumb from "@/components/BreadCrumb";
import Footer from "@/components/Footer";
import React from "react";
import parse from "html-react-parser";
import { base_api_url } from "@/config/Config";
import RatingSection from "@/components/news/Rating";
import CommentSection from "@/components/news/Comment";
import AudioSection from "@/components/audioSection";

const Details = async ({ params }) => {
  const { slug } = await params;
  const res = await fetch(`${base_api_url}/api/poetry/details/${slug}`, {
    next: {
      revalidate: 1,
    },
  });
  const { poetry, relatePoetry } = await res.json();

  return (
    <div>
      {/* Breadcrumb Section */}
      <div className="bg-green-100 shadow-sm py-4">
        <div className="px-4 md:px-8 w-full">
          <Breadcrumb one={poetry?.category} two={poetry?.title} />
        </div>
      </div>

      {/* Main Content Section */}
      <div className="bg-slate-200 w-full">
        <div className="px-4 md:px-8 w-full py-8">
          <div className="flex flex-wrap xl:flex-nowrap gap-6">
            {/* Main poetry Section */}
            <div className="w-full xl:w-8/12">
              <div className="w-full bg-white flex flex-col gap-y-5 justify-center items-center px-6 py-8 rounded shadow">
                <img
                  src={poetry?.image}
                  alt=""
                  className="h-[180px] w-[180px] object-cover rounded"
                />
                <h3 className="text-green-700 uppercase text-xl font-extrabold">
                  {poetry?.category}
                </h3>
                <h2 className="text-3xl text-gray-700 font-bold text-center">
                  {poetry?.title}
                </h2>
                <div className="flex gap-x-2 text-xs font-normal text-slate-600">
                  <span>{poetry?.date}/</span>
                  <span>{poetry?.writerName}</span>
                </div>
                {/* Audio Section */}
                <AudioSection audio={poetry?.audio} /> {/* Description */}
                <div className="text-gray-700 text-center  w-full mt-4">
                  {typeof poetry?.description === "string"
                    ? parse(poetry.description)
                    : null}
                </div>
              </div>
            </div>

            {/* Sidebar: Rating & Comments */}
            <div className="w-full xl:w-4/12">
              <div className="bg-white p-6 rounded shadow flex flex-col gap-6">
                {/* Logo above Rating */}
                <div className="flex justify-center">
                  <img
                    src="/assets/logo.png"
                    alt="Logo"
                    className="h-16 w-auto"
                  />
                </div>

                {/* Rating Section */}
                <RatingSection
                  poetryId={poetry?._id}
                  initialRating={poetry?.averageRating || 0}
                />

                {/* Comment Section */}
                <CommentSection
                  poetryId={poetry?._id}
                  initialComments={poetry?.comments || []}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Details;
