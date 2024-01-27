import React from "react";
import { Link } from "react-router-dom"; // Make sure to install 'react-router-dom' if not already installed

const FeatureCard = ({ title, description, link }) => {
  return (
    <div className="bg-white p-6 rounded-lg md:w-auto md:h-auto w-60 h-40 shadow-md">
      <h2 className="text-xl cursor-default font-semibold mb-2">{title}</h2>
      <p className="text-gray-600 cursor-default mb-2 md:mb-4">{description}</p>
      <Link
        to={link}
        className=" rounded-lg text-white md:border-none p-1 bg-red-700"
      >
        Get Started
      </Link>
    </div>
  );
};

const Home = () => {
  return (
    <div className="flex items-center  justify-center md:h-screen pb-4 h-full to-rose-500 from-sky-400 bg-gradient-to-r">
      <div className="max-w-3xl relative space-y-6 mt-12 md:mt-0">
        <h1 className="text-5xl font-bold text-center mb-8 cursor-default pb-5">
          <span className="text-gray-100 bg-rose-700 px-1 mr-2 rounded-lg ">
            YouTube Tools
          </span>
          <br />
          Creation made Easy{" "}
        </h1>
        <div className="madeby fixed bg-gray-500 w-screen text-center bottom-0 right-0">
          <h1 className="text-white font-bold">Made By Abhay</h1>
        </div>
        <div className="md:grid flex flex-col justify-center items-center  md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            title="Extract Tags"
            className="w-6 h-6"
            description="Extract tags from YouTube videos with ease."
            link="/yt-tags"
          />

          <FeatureCard
            title="Extract Thumbnail"
            className="w-6 h-6"
            description="Get the thumbnail of any YouTube video."
            link="/yt-thumbnail-get"
          />
          <FeatureCard
            title="Extract Description"
            className="w-6 h-6"
            description="Get the description of any YouTube video."
            link="/yt-description"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
